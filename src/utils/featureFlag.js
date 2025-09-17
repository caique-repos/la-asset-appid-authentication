const fs = require('fs');

const config = JSON.parse(
  fs.readFileSync(
    process.env.NODE_ENV === 'test' ? 'config.test.json' : 'config.json'
  )
);

const featureFlag = (req, res, next) => {
  req.featureFlag = config;
  next();
};

module.exports = featureFlag;
