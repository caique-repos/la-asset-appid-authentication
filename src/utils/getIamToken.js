const { iamApi } = require('../config');
const logger = require('./logger');

const getIamToken = () => {
  logger.debug('getIamToken function was called');

  return iamApi
    .post('/identity/token', {
      grant_type: 'urn:ibm:params:oauth:grant-type:apikey',
      apikey: process.env.IAM_APIKEY,
    })
    .then((res) => {
      logger.debug({
        msg: 'IAM Token successfully generated',
        data: res.data,
      });

      return res.data.access_token;
    })
    .catch((err) => {
      logger.error({
        msg: 'Failed to generate IAM Token',
        error: err,
      });
    });
};

module.exports = getIamToken;
