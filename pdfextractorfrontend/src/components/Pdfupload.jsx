import React, { useState } from 'react';
import { uploadPDFAPI } from '../Services/allAPI';

function Pdfupload() {
    const [selectedPDF, setSelectedPDF] = useState(null);
    const [errorMsg, setErrorMsg] = useState("");

    const handlePDFUpload = async (e) => {
        const file = e.target.files[0];
        if (file && file.type === 'application/pdf') {
            setSelectedPDF(file);
            const reqBody = new FormData();
            reqBody.append('pdfFile', file); // Corrected: Changed 'file' to 'pdfFile'
            try {
                const result = await uploadPDFAPI(reqBody);
                if (result.status === 200) {
                    console.log(result.data);
                    alert('PDF uploaded');
                } else {
                    console.error(result);
                    if (result.response && result.response.data) {
                        console.log(result.response.data);
                    } else {
                        console.error("Unexpected error occurred:", result);
                    }
                }
            } catch (error) {
                console.error("API request failed:", error);
            }
        } else {
            setSelectedPDF(null);
            setErrorMsg("The selected file is not a valid PDF.");
        }
    };

    return (
        <>
            <input type="file" onChange={handlePDFUpload} />
            {errorMsg && <p style={{ color: 'red' }}>{errorMsg}</p>}
        </>
    );
}

export default Pdfupload;
