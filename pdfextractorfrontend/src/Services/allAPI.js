//upload pdf API CALL

import { baseURL } from "./baseURL"
import { commonAPI } from "./commonAPI"

export const uploadPDFAPI=async(reqBody,reqHeader)=>
{
    return await commonAPI("POST",`${baseURL}/pdfupload`,reqBody,reqHeader)
}