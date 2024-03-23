const fs = require('fs'); 
const { PDFDocument } = require('pdf-lib');

exports.upload = async (req, res) => {
  console.log("Inside upload PDF function");
  //const pdfFile = req.file.filename;

  try {
    res
      .status(200)
      .json({ message: "Upload PDF successfully", filename: req.file.filename }); // Sending JSON object as response which inlcudes uploaded file name also
    console.log(req.file.filename);
  } catch (error) {
    res.status(401).json({ error: `Request failed ${error}` }); // Sending JSON object as response
  }
};





const path = require('path');

exports.createNewPDF = async (req, res) => {
    console.log("Inside create New PDF function");
    console.log('rbody', req.body);
    const selectedPages = req.body.selectedPages;
    const uploadFileName = req.body.uploadFileName;
    console.log('back selPages upload name', selectedPages, uploadFileName);
    let response = {};

    if (uploadFileName && selectedPages.length > 0) {
        try {
            const pdfBytes = fs.readFileSync(`uploads/${uploadFileName}`);
            const pdfDoc = await PDFDocument.load(pdfBytes);
            const newPdf = await PDFDocument.create();
            for (const pageNumber of selectedPages) {
                const [copiedPage] = await newPdf.copyPages(pdfDoc, [pageNumber - 1]);
                newPdf.addPage(copiedPage);
            }
            const newPdfBytes = await newPdf.save();

            // Generate a unique filename
            const newFilename = `new-${Date.now()}.pdf`;
            const newFilePath = path.join(__dirname, '..', 'uploads', newFilename);

            // Write the new PDF to the uploads folder
            fs.writeFileSync(newFilePath, newPdfBytes);

            // Construct the download link
            const downloadLink = `/uploads/${newFilename}`;

            // Send the download link in the response
            res.status(200).json({
                downloadLink: downloadLink,
                errorMessage: null,
                loading: false
            });
        } catch (error) {
            console.error("Error creating new PDF:", error);
            response.errorMessage = "Error creating new PDF. Please try again.";
            response.loading = false;
            res.status(500).json(response);
        }
    } else {
        response.errorMessage = "Please select a PDF file and at least one page.";
        response.loading = false;
        res.status(400).json(response);
    }
};
