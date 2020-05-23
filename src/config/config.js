const dotenv = require('dotenv');
const path = require('path');
const Joi = require('@hapi/joi');

dotenv.config({ path: path.join(__dirname, '../../.env') });

const envVarsSchema = Joi.object()
  .keys({
    // PORT=3000,
// MONGODB_URL='mongodb://127.0.0.1:27017/node-boilerplate',
// JWT_SECRET='thisisasamplesecret',
// JWT_ACCESS_EXPIRATION_MINUTES=30,
// JWT_REFRESH_EXPIRATION_DAYS=30,
// SMTP_HOST='email-server',
// SMTP_PORT=587,
// SMTP_USERNAME='email-server-username',
// SMTP_PASSWORD='email-server-password',
// EMAIL_FROM='support@yourapp.com',
    NODE_ENV: Joi.string().valid('production', 'development', 'test').required(),
    PORT: Joi.number().default(5000),
    MONGODB_URL: `mongodb://127.0.0.1:27017/node-boilerplate`,
    JWT_SECRET: 'thisisasamplesecret',
    JWT_ACCESS_EXPIRATION_MINUTES: Joi.number().default(30).description('minutes after which access tokens expire'),
    JWT_REFRESH_EXPIRATION_DAYS: Joi.number().default(30).description('days after which refresh tokens expire'),
    SMTP_HOST: Joi.string().default('email-server').description('server that will send the emails'),
    SMTP_PORT: Joi.number().default(587).description('port to connect to the email server'),
    SMTP_USERNAME: 'email-server-username',
    SMTP_PASSWORD: 'email-server-password',
    EMAIL_FROM: 'support@yourapp.com',
  })
  .unknown();

const { value: envVars, error } = envVarsSchema.prefs({ errors: { label: 'key' } }).validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

module.exports = {
  env: envVars.NODE_ENV,
  port: 5000,
  mongoose: {
    url: `mongodb://127.0.0.1:27017/node-boilerplate` + (envVars.NODE_ENV === 'test' ? '-test' : ''),
    options: {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
  },
  jwt: {
    secret:'thisisasamplesecret',
    accessExpirationMinutes: envVars.JWT_ACCESS_EXPIRATION_MINUTES,
    refreshExpirationDays: envVars.JWT_REFRESH_EXPIRATION_DAYS,
    resetPasswordExpirationMinutes: 10,
  },
  email: {
    smtp: {
      host: 'email-server',
      port: envVars.SMTP_PORT,
      auth: {
        user: 'email-server-username',
        pass:'email-server-password',
      },
    },
    from:'support@yourapp.com',
  },
};
