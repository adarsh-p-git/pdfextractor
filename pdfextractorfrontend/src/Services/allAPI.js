import axios from "axios";
import { baseURL } from "./baseURL";


//upload pdf api
export const uploadPDFAPI = async (reqBody) => {
    try {
        const result = await axios.post(`${baseURL}/upload-pdf`, reqBody);
        return result;
    } catch (error) {
        throw error;
    }
};


//extract pages and create new pdf api
export const createPDFAPI = async (reqBody) => {
    try {
        const result = await axios.post(`${baseURL}/create-pdf`, reqBody);
        return result;
    } catch (error) {
        throw error;
    }
};

