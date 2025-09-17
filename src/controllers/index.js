const signIn = require('./authentication/signIn');
const signUp = require('./authentication/signUp');

module.exports = {
  authController: {
    signIn,
    signUp,
  },
};
