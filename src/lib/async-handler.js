
//https://itnext.io/using-async-await-to-write-cleaner-route-handlers-7fc1d91b220b

const asyncHandler = (fn) => {
   return (req,res,next) => {
    Promise.resolve(fn(req,res,next)).catch( (e) => {
       

      if(e.notFoundError === true ) {
         res.status(404).json( {error: "Item not found"})
      } else {
         res.status(500).json( JSON.parse(JSON.stringify(e, Object.getOwnPropertyNames(e))))
      }
      
      //use this to punt to html/express err middleware
      //next(e)
   
   
   })
   }




}





export default asyncHandler;