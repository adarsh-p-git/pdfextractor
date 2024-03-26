const express = require('express');
const router = express.Router();
const pdfController = require('../Controller/pdfController');
const multerConfig = require('../Middlewares/multerMiddleware');


//pdf upload router

router.post('/upload-pdf', multerConfig.single('pdfFile'), pdfController.upload);


//create new pdf router

router.post('/create-pdf',pdfController.createNewPDF);

module.exports = router;
