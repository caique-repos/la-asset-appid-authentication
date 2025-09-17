const axios = require('axios');

const appIdMgmtApi = axios.create({
  baseURL: `https://us-south.appid.cloud.ibm.com/management/v4/${process.env.APPID_TENANTID}`,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

module.exports = appIdMgmtApi;
