import logger from './logger';

// eslint-disable-next-line no-unused-vars
const generalErrorHandler = (err, req, res, next) => {
  logger.error('[generalError] Error object: %o', err);

  const statusCode = err.statusCode || 500;
  let messages;
  let reason;
  let transactionId;
  let maxMessageLevel;
  if (err.messages) {
    messages = err.messages;
  }
  if (err.reason) {
    reason = err.reason;
  }
  if (err.transactionId) {
    transactionId = err.transactionId;
  }
  if (err.maxMessageLevel) {
    maxMessageLevel = err.maxMessageLevel;
  }
  const status = {maxMessageLevel, code: statusCode, reason, messages, transactionId};

  res.status(statusCode).json({status});
  next();
};

export default generalErrorHandler;
