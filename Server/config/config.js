const dotenv = require('dotenv');
dotenv.config();

const config = {
  dialect: process.env.DB_DIALECT || "mysql",
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
};

console.log(config);

module.exports = {
  url: process.env.DB_CONNECTION_URL,
  development: { ...config, database: process.env.DB_DEVELOPMENT_NAME },
  test: { ...config, database: process.env.DB_TEST_NAME },
  production: { ...config, database: process.env.DB_PROD_NAME },
};
