import logger from './../lib/logger';

class BirtService {



    static async searchGateway(partyType, searchRequest) {
        return agentContactApiErrorHandler('[AgentContactSearchAPIGateway.searchGateway]', async () => {
          try {
            const queryParam = await SearchAPIRequestParamHelper.createPartyRequestParam(partyType, searchRequest);
    
            const endPointUrl = `https://intssg.amfam.com/partysearchedge/v1/parties?${queryParam}`;
            logger.info(endPointUrl);
            logger.info(util.format('[AgentContactSearchAPIGateway.searchGateway] Search URI :%s', endPointUrl));
            const axiosConfig = {
              headers: {
                'AFI-AppName': appName,
                'AFI-UserId': userId,
              },
            };
    
            const response = await axios.get(endPointUrl, axiosConfig);
            return response.data;
          } catch (error) {
            const errorResponse = error.response;
            const errorResposeCode = _get(errorResponse, 'data.status.code');
            if (errorResposeCode === 404) {
              return {data: errorResposeCode};
            }
            throw error;
          }
        });
      }





}


export default BirtService