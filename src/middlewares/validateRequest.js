const { validationResult } = require('express-validator');
const { logger } = require('../utils');

const validateRequest = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    logger.error({ msg: 'invalid request', error: errors.array() });

    res.status(400).send({
      hasError: true,
      errors: errors.array({ onlyFirstError: true }),
    });
    return;
  }

  next();
};

module.exports = validateRequest;
