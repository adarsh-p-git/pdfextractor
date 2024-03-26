import axios from "axios"
 
//common api
export const  commonAPI=async(reqMethod,url,reqBody,reqHeaders)=>
{
    const reqConfig={
        method:reqMethod,
        url,
        data:reqBody,
        headers:reqHeaders?reqHeaders:{"Content-Type":"application/json"}
    }

    return await axios(reqConfig)
    .then
    (
        (result)=>
        {
            return result
        }
    ).catch((error)=>
        {
            return error

        })
    
}