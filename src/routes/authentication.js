const express = require('express');
const { authController } = require('../controllers');
const { authRules, validateRequest, validadeFlag } = require('../middlewares');

const router = express.Router();

router.post(
  '/signin',
  validadeFlag('signin'),
  authRules.signIn(),
  validateRequest,
  authController.signIn
);

router.post(
  '/signup',
  validadeFlag('signup'),
  authRules.signUp(),
  validateRequest,
  authController.signUp
);

module.exports = router;
