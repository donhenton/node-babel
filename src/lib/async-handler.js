
//https://itnext.io/using-async-await-to-write-cleaner-route-handlers-7fc1d91b220b

const asyncHandler = (fn) => {
   return (req,res,next) => {
    Promise.resolve(fn(req,res,next)).catch( (e) => {next(e)})
   }




}





export default asyncHandler;