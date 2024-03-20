import axios from "axios";

const baseURL = "http://localhost:4000"; // Corrected: Added protocol 'http://'

export const uploadPDFAPI = async (reqBody) => {
    try {
        const result = await axios.post(`${baseURL}/upload-pdf`, reqBody);
        return result;
    } catch (error) {
        throw error;
    }
};
