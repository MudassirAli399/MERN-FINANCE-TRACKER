
const ApiResponse = (statuscode,message,data)=>{
    return {
        status : statuscode,
        message : message || "Something went wrong",
        RequiredData : data || "Sorry You cannot receive data OR it will be internal error"
    }
}

export default ApiResponse