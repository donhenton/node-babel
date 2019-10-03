import winston from 'winston';

const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'warning',
  exitOnError: false,

  format: winston.format.combine(
    winston.format.padLevels(),
    winston.format.prettyPrint(),
    winston.format.splat(),
    winston.format.timestamp(),
    winston.format.printf(info => `${info.timestamp} [${info.level}]: ${info.message}`)
  ),
  transports: [new winston.transports.Console()],
});

module.exports = logger;
