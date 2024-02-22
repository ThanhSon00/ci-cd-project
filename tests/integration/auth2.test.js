const request = require('supertest');
const { faker } = require('@faker-js/faker');
const httpStatus = require('http-status');
const moment = require('moment');
const { tokenTypes } = require('../../src/config/tokens');
const { User2, Token2 } = require('../../src/models');
const setupTestDB = require('../utils/setupTestDB');
const app = require('../../src/app');
const { userOne, insertUsers } = require('../fixtures/user2.fixture');
const config = require('../../src/config/config');
const { token2Service } = require('../../src/services');

setupTestDB();

describe('Auth routes', () => {
  describe('POST /v2/auth/register', () => {
    let newUser;
    beforeEach(() => {
      const password = faker.internet.password();
      newUser = {
        name: faker.person.fullName(),
        email: faker.internet.email().toLowerCase(),
        password,
        repeatPassword: password,
      };
    });

    test('should return 201 and successfully register user if request data is ok', async () => {
      const res = await request(app).post('/v2/auth/register').send(newUser).expect(httpStatus.CREATED);

      expect(res.body.user).not.toHaveProperty('password');
      expect(res.body.user).toEqual({
        id: expect.anything(),
        name: newUser.name,
        email: newUser.email,
        avatar: '/non-avatar.jpg',
      });

      const dbUser = await User2.findByPk(res.body.user.id);
      expect(dbUser).toBeDefined();
      expect(dbUser.password).not.toBe(newUser.password);
      expect(dbUser).toMatchObject({ name: newUser.name, email: newUser.email });

      expect(res.body.tokens).toEqual({
        access: { token: expect.anything(), expires: expect.anything() },
        refresh: { token: expect.anything(), expires: expect.anything() },
      });
    });

    test('should return 400 error if email is invalid', async () => {
      newUser.email = 'invalidEmail';

      await request(app).post('/v2/auth/register').send(newUser).expect(httpStatus.BAD_REQUEST);
    });

    test('should return 400 error if email is already used', async () => {
      await insertUsers([userOne]);
      newUser.email = userOne.email;

      await request(app).post('/v2/auth/register').send(newUser).expect(httpStatus.BAD_REQUEST);
    });

    test('should return 400 error if password length is less than 8 characters', async () => {
      newUser.password = 'passwo1';

      await request(app).post('/v2/auth/register').send(newUser).expect(httpStatus.BAD_REQUEST);
    });

    test('should return 400 error if password does not contain both letters and numbers', async () => {
      newUser.password = 'password';

      await request(app).post('/v2/auth/register').send(newUser).expect(httpStatus.BAD_REQUEST);

      newUser.password = '11111111';

      await request(app).post('/v2/auth/register').send(newUser).expect(httpStatus.BAD_REQUEST);
    });

    test('should return 400 error if any field is blank', async () => {
      delete newUser.repeatPassword;
      await request(app).post('/v2/auth/register').send(newUser).expect(httpStatus.BAD_REQUEST);

      delete newUser.password;
      await request(app).post('/v2/auth/register').send(newUser).expect(httpStatus.BAD_REQUEST);

      delete newUser.name;
      await request(app).post('/v2/auth/register').send(newUser).expect(httpStatus.BAD_REQUEST);

      delete newUser.email;
      await request(app).post('/v2/auth/register').send(newUser).expect(httpStatus.BAD_REQUEST);
    });

    test('should return 400 error if password and repeat password are not matched', async () => {
      newUser.repeatPassword = `${newUser.password}randomCharacters`;
      await request(app).post('/v2/auth/register').send(newUser).expect(httpStatus.BAD_REQUEST);
    });
  });

  describe('POST /v2/auth/login', () => {
    test('should return 200 and login user if email and password match', async () => {
      await insertUsers([userOne]);
      const loginCredentials = {
        email: userOne.email,
        password: userOne.password,
      };

      const res = await request(app).post('/v2/auth/login').send(loginCredentials).expect(httpStatus.OK);

      expect(res.body.user).toEqual({
        id: expect.anything(),
        name: userOne.name,
        email: userOne.email,
        avatar: expect.anything(),
      });

      expect(res.body.tokens).toEqual({
        access: { token: expect.anything(), expires: expect.anything() },
        refresh: { token: expect.anything(), expires: expect.anything() },
      });
    });

    test('should return 401 error if there are no users with that email', async () => {
      const loginCredentials = {
        email: userOne.email,
        password: 'wrongPassword1',
      };

      const res = await request(app).post('/v2/auth/login').send(loginCredentials).expect(httpStatus.UNAUTHORIZED);

      expect(res.body).toEqual({ code: httpStatus.UNAUTHORIZED, message: 'Incorrect email or password' });
    });

    test('should return 400 error if email or password field is blank', async () => {
      const loginCredentials = {
        email: userOne.email,
        password: userOne.password,
      };

      delete loginCredentials.password;
      await request(app).post('/v2/auth/login').send(loginCredentials).expect(httpStatus.BAD_REQUEST);

      delete loginCredentials.email;
      await request(app).post('/v2/auth/login').send(loginCredentials).expect(httpStatus.BAD_REQUEST);
    });
  });

  describe('POST /v2/auth/logout', () => {
    test('should return 204 if refresh token is valid', async () => {
      const user = await insertUsers([userOne]);
      const expires = moment().add(config.jwt.refreshExpirationDays, 'days');
      const refreshToken = token2Service.generateToken(user[0].id, expires, tokenTypes.REFRESH);
      await token2Service.saveToken(refreshToken, user[0].id, expires, tokenTypes.REFRESH);

      await request(app).post('/v2/auth/logout').send({ refreshToken }).expect(httpStatus.NO_CONTENT);

      const dbRefreshToken = await Token2.findOne({ where: { token: refreshToken } });
      expect(dbRefreshToken).toBe(null);
    });
  });
});
