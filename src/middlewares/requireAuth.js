const { APIStrategy } = require('ibmcloud-appid');
const passport = require('passport');

passport.use(
  new APIStrategy({
    oauthServerUrl: `https://us-south.appid.cloud.ibm.com/oauth/v4/${process.env.APPID_TENANTID}`,
  })
);

const requireAuth = (req, res, next) => {
  passport.authenticate(APIStrategy.STRATEGY_NAME, (err, user) => {
    if (err) {
      next(err);
      return;
    }

    if (!user) {
      res.status(401).send({
        hasError: true,
        errors: [{ msg: req.t('errors.userUnauthenticated') }],
      });

      return;
    }

    req.user = user;
    next();
  });
};

module.exports = requireAuth;
