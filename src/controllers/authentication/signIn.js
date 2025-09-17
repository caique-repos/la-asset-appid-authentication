/* eslint-disable camelcase */
const { appIdOauthApi } = require('../../config');
const { logger } = require('../../utils');

const signIn = async (req, res) => {
  logger.debug('[authController] signIn function was called');

  const { email, password } = req.body;

  await appIdOauthApi
    .post('/token', { username: email, password, grant_type: 'password' })
    .then((response) => {
      const { access_token, expires_in } = response.data;

      logger.info({
        msg: `User ${email} successfully logged in`,
        data: response.data,
      });

      res.status(200).send({
        hasError: false,
        token: access_token,
        expires_in,
        msg: req.t('signInSuccess', { email }),
      });
    })
    .catch((err) => {
      const { data, status } = err.response;
      const { error, error_description } = data;

      logger.error({
        msg: 'Failed to logged in',
        error: err.response.data,
      });

      if (error === 'invalid_grant') {
        res.status(status).send({
          hasError: true,
          errors: [{ msg: req.t('errors.invalidEmailOrPasswordMatch') }],
        });

        return;
      }

      res.status(status).send({
        hasError: true,
        errors: [{ msg: error_description }],
      });
    });
};

module.exports = signIn;
