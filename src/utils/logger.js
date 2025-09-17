const pino = require('pino')({
  level: process.env.LOG_LEVEL || 'info',
  redact: [
    'data.access_token',
    'data.id_token',
    'data.password',
    'data.ims_user_id',
  ],
  transport:
    process.env.LOG_LEVEL === 'debug'
      ? {
          target: 'pino-pretty',
          options: {
            levelFirst: true,
            colorize: true,
          },
        }
      : false,
});

module.exports = pino;
