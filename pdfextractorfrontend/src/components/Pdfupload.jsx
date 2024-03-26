import React, { useEffect, useState } from 'react';
import { createPDFAPI, uploadPDFAPI } from '../Services/allAPI'; // Import functions to interact with APIs
import { PDFDocument } from 'pdf-lib'; // Import PDFDocument for handling PDF operations
import { Container, Row, Col, Form, Button } from 'react-bootstrap'; // Import Bootstrap components for UI layout and design
import { baseURL } from '../Services/baseURL'; // Base URL for constructing download links
import { toast, ToastContainer } from 'react-toastify'; // Import toast for displaying notifications
import 'react-toastify/dist/ReactToastify.css'; // Import CSS for toast notifications

// Component for uploading and customizing PDFs
function PdfUpload() {
    const [selectedPDF, setSelectedPDF] = useState(null); // State for the selected PDF file
    const [selectedPages, setSelectedPages] = useState([]); // State for pages selected by the user
    const [totalPages, setTotalPages] = useState(0); // State for the total number of pages in the PDF
    const [uploadFileName, setUploadedFilename] = useState(""); // State for the name of the uploaded file
    const [newPdfLink, setNewPdfLink] = useState(null); // State for the link to the newly created PDF
    const [loading, setLoading] = useState(false); // State to indicate loading process

    // Function to handle PDF file upload
    const handlePDFUpload = async (e) => {
        const file = e.target.files[0];
        if (file && file.type === 'application/pdf') {
            setSelectedPDF(file);
            const reqBody = new FormData();
            reqBody.append('pdfFile', file);
            try {
                const result = await uploadPDFAPI(reqBody);
                if (result.status === 200) {
                    setUploadedFilename(result.data.filename); 
                    toast('PDF uploaded successfully! 🦄');
                } else {
                    console.error("Unexpected error occurred:", result);
                }
            } catch (error) {
                toast.error("API request failed: " + error.message);
            }
        } else {
            setSelectedPDF(null);
            toast.error("The selected file is not a valid PDF. 🚫");
        }
    };

    // Effect to load PDF and determine total pages once a file is selected
    useEffect(() => {
        const loadPDF = async () => {
            if (selectedPDF) {
                try {
                    const pdfBytes = await selectedPDF.arrayBuffer();
                    const pdfDoc = await PDFDocument.load(pdfBytes);
                    setTotalPages(pdfDoc.getPageCount());
                } catch (error) {
                    toast.error("Error loading PDF. Please try again. 🚫");
                }
            }
        };
        loadPDF();
    }, [selectedPDF]);

    // Function to handle selection and deselection of pages
    const handlePageSelect = (pageNumber) => {
        setSelectedPages(prevPages => {
            if (prevPages.includes(pageNumber)) {
                return prevPages.filter(page => page !== pageNumber);
            } else {
                return [...prevPages, pageNumber];
            }
        });
    };

    // Function to create a new PDF from selected pages
    const handleCreateNewPDF = async () => {
        const reqBody = {
            selectedPages: selectedPages,
            uploadFileName: uploadFileName
        };
        
        try {
            setLoading(true);
            const result = await createPDFAPI(reqBody);
            if (result.status === 200) {
                setNewPdfLink(result.data.downloadLink); 
                toast('New PDF created successfully! 🎉');
            } else {
                console.error("Unexpected error occurred:", result);
            }
        } catch (error) {
            toast.error("Failed to create new PDF. 🚫");
        } finally {
            setLoading(false);
        }
    };

    // Render method for the component UI
    return (
        <Container>
            <ToastContainer />
            <Row className="mt-3">
                <Col>
                    <Form>
                        <Form.Group controlId="formFile" className="mb-3">
                            <Form.Label>Select PDF:</Form.Label>
                            <Form.Control type="file" onChange={handlePDFUpload} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Select Pages:</Form.Label>
                            <div className="row">
                                {Array.from({ length: totalPages }, (_, index) => index + 1).map(pageNumber => (
                                    <div className="col-6 col-sm-4 col-md-3 col-lg-2" key={pageNumber}>
                                        <Form.Check
                                            type="checkbox"
                                            id={`page-${pageNumber}`}
                                            label={`Page ${pageNumber}`}
                                            checked={selectedPages.includes(pageNumber)}
                                            onChange={() =>handlePageSelect(pageNumber)}
                                            />
                                            </div>
                                            ))}
                                            </div>
                                            </Form.Group>
                                            <Button variant="primary" onClick={handleCreateNewPDF} disabled={!selectedPDF || loading}>
                        {loading ? 'Creating...' : 'Create New PDF'}
                    </Button>
                    {loading &&<p className="mt-2">Loading...</p>}
                    </Form>
                </Col>
            </Row>
            {newPdfLink && (
                <Row className="mt-3">
                    <Col>
                        <a href={`${baseURL}${newPdfLink}`} download target="_blank" rel="noopener noreferrer" className="btn btn-success">Download New PDF</a>
                    </Col>
                </Row>
            )}
        </Container>
    );
}

export default PdfUpload;

