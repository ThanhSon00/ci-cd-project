
const express = require('express');
const validate = require('../../middlewares/validate');
const { auth2Validation } = require('../../validations');
const { auth2Controller } = require('../../controllers');
// const auth = require('../../middlewares/auth');

const router = express.Router();

router.post('/login', validate(auth2Validation.login), auth2Controller.login);
router.post('/register', validate(auth2Validation.register), auth2Controller.register);
router.post('/logout', validate(auth2Validation.logout), auth2Controller.logout);
// router.post('/refresh-tokens', validate(authValidation.refreshTokens), authController.refreshTokens);
// router.post('/forgot-password', validate(authValidation.forgotPassword), authController.forgotPassword);
// router.post('/reset-password', validate(authValidation.resetPassword), authController.resetPassword);
// router.post('/send-verification-email', auth(), authController.sendVerificationEmail);
// router.post('/verify-email', validate(authValidation.verifyEmail), authController.verifyEmail);

module.exports = router;
