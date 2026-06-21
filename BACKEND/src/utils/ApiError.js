 
 const ApiError = (statusCode, message )=>{
    return {
        status : statusCode,
        message : message
    }
 }
 
 export default ApiError