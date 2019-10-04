import express from 'express';
import logger from './lib/logger';
import BirtService from './services/birt-service';
import asyncHandler from './lib/async-handler'

//import expressAsyncHandler from '../lib/express-async-handler';


const methodNotAllowedResponse = (req, res) => {
  logger.debug('[methodNotAllowedResponse]');
  return res.status(405).json({
    statusCode: 405,
    message: 'Method Not Allowed'
  });
};

const router = new express.Router();

// Block base route since we have no functionality here
router.route('/').all(methodNotAllowedResponse);


/**
 * @description: Ping Operation
 * @params
 */
router
  .route('/ping')
  .head((req, res) => res.sendStatus(200))
  .get((req, res) => res.status(200).json({
    message: 'old Cary Grant fine, how you?'
  }))
  .all(methodNotAllowedResponse);


router
  .route('/offices/:officeId')
  .get(

    asyncHandler(async (req, res,next) => {
      const appName = req.header('alpha');
      const userId = req.header('beta');
      let officeId = req.params.officeId;
      const response = await BirtService.getOffices(officeId);
      logger.info(response.data)
      return res.status(200).json(response.data);

    })
    

  )
  .all(methodNotAllowedResponse);




export default router;