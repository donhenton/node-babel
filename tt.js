import axios from 'axios';
import logger from './src/lib/logger'
 
import errorHandler from './src/lib/api-error-handler'

class BirtService {


    static async getHandledOffices(officeCode) {
        const baseURL = 'http://donhenton-spring-boot.herokuapp.com/birt';
          return errorHandler('getOffices', async () => {
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
              logger.debug(response.data)
              return response;
            } catch (error) {
              let errorResponseCode;
              const errorResponse = error.response;
              const dummy =  {data: {status: {code: errorResponseCode}}} ;
              if (errorResponseCode === 404) {
                return {data: errorResponseCode};
              }
              throw error;
            }
          });
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
            logger.debug(response.data)
            return response;
        } catch (error) {
            logger.error(error)
            let errorResponseCode;
            const errorResponse = error.response;
            const dummy = {
                data: {
                    status: {
                        code: errorResponseCode
                    }
                }
            };
            if (errorResponseCode === 404) {
                return {
                    data: errorResponseCode
                };
            }
            throw error;
        }
    }
}
(() => {
   // BirtService.getOffices(4).then((z) => console.log(z.data))
   const z = BirtService.getHandledOffices(4) ;
   console.log(z.data)

})()