
import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import logger from './lib/logger';
import router from './router';
import errHandler from './lib/error-handler';
//import AuthBasicService from '../lib/auth-basic-service';

const app = express();

 

// Add CORS support
const corsOptions = {
  origin: [  /localhost$/, '*'],
  methods: ['GET', 'HEAD', 'PUT', 'POST', 'DELETE'],
  allowedHeaders: ['Authorization', 'Content-Type' ],
  // credentials: true,
  maxAge: 76400,
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.options('*', cors(corsOptions));
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

// Other middleware
app.use(bodyParser.json());
app.use(helmet());
app.use(
  morgan('combined', {
    skip(req) {
      const ua = req.headers['user-agent'];
      return ua.match(/^HealthCheck/i);
    },
  })
);

// Default headers added to responses
app.use((req, res, next) => {
  res.set({
    'x-application-name': process.env.APP_NAME,
    'x-application-version': process.env.APP_VERSION,
    'x-application-environment': process.env.APP_ENV,
  });
  next();
});

// Default request logger
app.use((req, res, next) => {
  logger.info('Recieved %s request for %s', req.method, req.path);
  logger.debug('Request headers: %j', req.headers);
  logger.debug('Request body: %j', req.body);
  next();
});

// Default response logger
app.use((req, res, next) => {
  res.on('finish', () => {
    logger.debug('Responded to %s request for %s with %s', req.method, req.path, res.statusCode);
  });
  next();
});
/*
app.use((req, res, next) => {
  try {
    AuthBasicService.authenticate(req);
  } catch (err) {
    next(err);
  }
  next();
});
*/
app.use(errHandler);

app.use('/api', router);


module.exports = app;
