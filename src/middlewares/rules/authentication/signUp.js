const { body } = require('express-validator');

const signUp = () => {
  return [
    body('displayName')
      .optional()
      .isString()
      .withMessage((value, { req, location, path }) => {
        return req.t('errors.invalidDisplaynameType', {
          value,
          location,
          path,
        });
      }),

    body('nickName')
      .optional()
      .isString()
      .withMessage((value, { req, location, path }) => {
        return req.t('errors.invalidNicknameType', {
          value,
          location,
          path,
        });
      }),

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

    body('passwordConfirmation')
      .notEmpty()
      .withMessage((value, { req, location, path }) => {
        return req.t('errors.missingPasswordConfirmation', {
          value,
          location,
          path,
        });
      })
      .custom((value, { req }) => {
        if (value !== req.body.password) {
          throw new Error(req.t('errors.invalidPasswordConfirmationMatch'));
        }

        return true;
      }),
  ];
};

module.exports = signUp;
