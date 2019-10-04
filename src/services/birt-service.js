import logger from './../lib/logger';
import axios from 'axios';

class BirtService {

    constructor() {

    }

   
    static async getOffices(officeCode) {
      const baseURL = 'http://donhenton-spring-boot.herokuapp.com/birt';
      try {


          const endPointUrl = `${baseURL}/offices/${officeCode}`;
          logger.info(endPointUrl);

          const axiosConfig = {
              headers: {
                  'alpha': 100,
                  'beta': 200,
              },
          };

          const response = await axios.get(endPointUrl, axiosConfig);
          return response;
      } catch (error) {
          logger.error(error);
          let newError = error;
          newError.notFoundError = false;
          const {response: {status: stCode}} = error;
          if (stCode && stCode === 404) {
            newError = new Error("resource not found");
            newError.notFoundError = true;
          }
        
          throw newError;
      }
  }
 

   



}


export default BirtService