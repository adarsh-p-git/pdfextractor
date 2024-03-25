import React, { useEffect, useState } from 'react';
import { createPDFAPI, uploadPDFAPI } from '../Services/allAPI';
import { PDFDocument } from 'pdf-lib';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { baseURL } from '../Services/baseURL';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function PdfUpload() {
    const [selectedPDF, setSelectedPDF] = useState(null);
    const [selectedPages, setSelectedPages] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const [uploadFileName, setUploadedFilename] = useState("");
    const [newPdfLink, setNewPdfLink] = useState(null);
    const [loading, setLoading] = useState(false);

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

    const handlePageSelect = (pageNumber) => {
        setSelectedPages(prevPages => {
            if (prevPages.includes(pageNumber)) {
                return prevPages.filter(page => page !== pageNumber);
            } else {
                return [...prevPages, pageNumber];
            }
        });
    };

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

    return (
        <Container>
            <ToastContainer />
            <Row className="mt-3">
                <Col>
                    <Form>
                        <Form.Group controlId="formFile" className="mb-3">
                            <Form.Label>Select PDF:</Form.Label>
                            <Form.Control type="file"className='' onChange={handlePDFUpload} />
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
                                            onChange={() => handlePageSelect(pageNumber)}
                                        />
                                    </div>
                                ))}
                            </div>
                        </Form.Group>

                        <Button variant="primary" onClick={handleCreateNewPDF} disabled={!selectedPDF || loading}>
                            {loading ? 'Creating...' : 'Create New PDF'}
                        </Button>
                        {loading && <p className="mt-2">Loading...</p>}
                    </Form>
                </Col>
            </Row>
            {newPdfLink && (
                <Row className="mt-3">
                    <Col>
                        <a href={`${baseURL}${newPdfLink}`} download target="_blank" className="btn btn-success">Download New PDF</a>
                    </Col>
                </Row>
            )}
        </Container>
    );
}

export default PdfUpload;
