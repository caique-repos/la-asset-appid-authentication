const axios = require('axios');

const iamApi = axios.create({
  baseURL: 'https://iam.cloud.ibm.com/',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    Accept: 'application/json',
  },
});

module.exports = iamApi;
