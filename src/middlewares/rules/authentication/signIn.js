const { body } = require('express-validator');

const signIn = () => {
  return [
    body('email')
      .notEmpty()
      .withMessage((value, { req, location, path }) => {
        return req.t('errors.missingEmail', { value, location, path });
      })
      .isEmail()
      .withMessage((value, { req, location, path }) => {
        return req.t('errors.invalidEmailFormat', { value, location, path });
      }),

    body('password')
      .notEmpty()
      .withMessage((value, { req, location, path }) => {
        return req.t('errors.missingPassword', {
          value,
          location,
          path,
        });
      })
      .isString()
      .withMessage((value, { req, location, path }) => {
        return req.t('errors.invalidPasswordType', { value, location, path });
      })
      .isLength({ min: 8 })
      .withMessage((value, { req, location, path }) => {
        return req.t('errors.invalidPasswordLength', {
          value,
          location,
          path,
        });
      }),
  ];
};

module.exports = signIn;
