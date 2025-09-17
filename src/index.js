require('dotenv').config();
const app = require('./server');
const { logger } = require('./utils');

const port = process.env.PORT || 8080;

app.listen(port, async () => {
  logger.info(`Server Listening on ${port}`);
});
