import axios from "axios";
import { baseURL } from "./baseURL";



export const uploadPDFAPI = async (reqBody) => {
    try {
        const result = await axios.post(`${baseURL}/upload-pdf`, reqBody);
        return result;
    } catch (error) {
        throw error;
    }
};

export const createPDFAPI = async (reqBody) => {
    try {
        const result = await axios.post(`${baseURL}/create-pdf`, reqBody);
        return result;
    } catch (error) {
        throw error;
    }
};

