const cors = require('cors');
const path = require('path');
const helmet = require('helmet');
const express = require('express');
const i18next = require('i18next');
const i18nextBackend = require('i18next-fs-backend');
const i18nextMiddleware = require('i18next-http-middleware');
const { featureFlag } = require('./utils');

const routes = require('./routes');

i18next
  .use(i18nextBackend)
  .use(i18nextMiddleware.LanguageDetector)
  .init({
    debug: process.env.LOG_LEVEL === 'debug',
    fallbackLng: 'en',
    backend: {
      loadPath: path.join(__dirname, '..', '/locales/{{lng}}/translation.json'),
    },
  });

const app = express();

app.use(
  i18nextMiddleware.handle(i18next, { ignoreRoutes: ['/ready', '/live'] })
);
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(featureFlag);
app.use(
  express.urlencoded({
    extended: true,
  })
);

// Application Routes
app.use('/', routes.authentication);

// Health Checks Endpoints
app.get('/ready', (req, res) => res.status(200).send({ status: 'ok' }));
app.get('/live', (req, res) => res.status(200).send({ status: 'ok' }));

module.exports = app;
