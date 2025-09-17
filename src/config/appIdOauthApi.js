const axios = require('axios');

const appIdOauthApi = axios.create({
  baseURL: `https://us-south.appid.cloud.ibm.com/oauth/v4/${process.env.APPID_TENANTID}`,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  auth: {
    username: process.env.APPID_CLIENTID,
    password: process.env.APPID_SECRET,
  },
});

module.exports = appIdOauthApi;
