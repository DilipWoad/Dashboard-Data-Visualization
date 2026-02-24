//its a higher order function
//this takes a function and returns a function
const asyncRequestHandler=(requestHandlerFunction)=>{

    //as it is express ,it need req,res and next to be defined
    return (req,res,next)=>{
        //so we can write promise here ,so we don't need to write try/catch in the controllers.
        //so Promise, resolve the received function and if any error happens passed it to the 
        // next middleware, which will be the global error handler
        Promise.resolve(requestHandlerFunction(req,res,next)).catch((error)=>next(error))
    }
}
export default asyncRequestHandler;