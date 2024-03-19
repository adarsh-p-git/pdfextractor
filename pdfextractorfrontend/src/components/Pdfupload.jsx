import React, { useState } from 'react'
import { uploadPDFAPI } from '../Services/allAPI';

function Pdfupload() {
    const [selectedPDF,setSelectedPDF]=useState(null);
    const [errorMsg,setErrorMsg]=useState("")

    const handlePDFUpload=async(e)=>
    {
        const file=e.target.files[0];
        if(file && file.type==='application/pdf')
        {
            setSelectedPDF(file);
            const reqBody=new formData()
            formData.append('file',selectedPDF)
            const reqHeader={
                "Content-Type":"multipart/form-data"
            }
         const result=await uploadPDFAPI(reqBody,reqHeader)
         if(result.status===200){
            console.log(result.data)
            
            alert('PDF uploaded')
          }
          else{
            console.log(result)
            console.log(result.response.data)
          }
       
            
        }
        else
        {
            setSelectedPDF(null);
            setErrorMsg("The Selected File is not a Valid PDF")
        }
    }
  return (
    <>
    <input type="file" onChange={handlePDFUpload} />
    {
        errorMsg && <p style={{color:'red'}}>{errorMsg}</p>
    }
    </>
  )
}

export default Pdfupload