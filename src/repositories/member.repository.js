const { Member } = require('models');

const getMember = id => {
  return Member.findByPk(id);
};

const createMember = memberBody => {
  return Member.create(memberBody);
};

module.exports = {
  getMember,
  createMember,
};
