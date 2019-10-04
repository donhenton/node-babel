import logger from './logger';

// eslint-disable-next-line no-unused-vars
const apiErrHandler = (infoMessage ,func) => {
  //logger.error('[api errHandler] Error object: ', err);
  Promise.resolve(func()).catch(error => {
    if (error) {
      logger.error('[api errHandler] Error object: %o', error);

      const apiError = new Error(error);

      throw apiError;
    }

  });
   
};

export default apiErrHandler;
