
const express=require('express')
const router=new express.Router();
const pdfController=require('../Controller/pdfController')


//upload pdf upload

router.post('/upload-pdf',pdfController.upload)


module.exports=router;