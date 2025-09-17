const { appIdMgmtApi } = require('../../config');
const { logger, getIamToken } = require('../../utils');

const signUp = async (req, res) => {
  logger.debug('[authController] signUp function was called');

  const { displayName, nickName, email, password } = req.body;

  const iamToken = await getIamToken();

  if (!iamToken) {
    return;
  }

  await appIdMgmtApi
    .post(
      '/cloud_directory/sign_up',
      {
        shouldCreateProfile: true,
        displayName,
        nickName,
        userName: email,
        password,
        emails: [
          {
            value: email,
            primary: true,
          },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${iamToken}`,
        },
      }
    )
    .then((user) => {
      logger.info({
        msg: `User ${email} created successfully`,
        data: user.data,
      });

      res.status(200).send({
        hasError: false,
        msg: req.t('signUpSuccess', { email }),
        userId: user.id,
      });
    })
    .catch((err) => {
      const { status, scimType, detail } = err.response.data;

      logger.error({
        msg: 'Error to create a new user',
        data: { displayName, nickName, email, password },
        error: err.response.data,
      });

      if (scimType === 'uniqueness') {
        res.status(parseInt(status, 10)).send({
          hasError: true,
          errors: [{ msg: req.t('errors.emailAlreadyTaken') }],
        });

        return;
      }

      res.status(parseInt(status, 10)).send({
        hasError: true,
        errors: [{ msg: detail }],
      });
    });
};

module.exports = signUp;
