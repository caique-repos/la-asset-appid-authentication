const validateFlag = (flag) => {
  return (req, res, next) => {
    if (req.featureFlag[flag]) {
      next();
      return;
    }

    res.status(503).send({
      hasError: true,
      errors: [{ msg: req.t('featureUnavailable', { feature: flag }) }],
    });
  };
};

module.exports = validateFlag;
