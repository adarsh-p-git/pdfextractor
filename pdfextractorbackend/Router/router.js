const express = require('express');
const router = express.Router();
const pdfController = require('../Controller/pdfController');
const multerConfig = require('../Middlewares/multerMiddleware');

router.post('/upload-pdf', multerConfig.single('pdfFile'), pdfController.upload);

module.exports = router;
