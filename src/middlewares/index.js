const rules = require('./rules');
const requireAuth = require('./requireAuth');
const validateRequest = require('./validateRequest');
const validadeFlag = require('./validateFlag');

module.exports = { ...rules, requireAuth, validateRequest, validadeFlag };
