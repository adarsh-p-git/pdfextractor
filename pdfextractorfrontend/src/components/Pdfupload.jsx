import React, { useEffect, useState } from 'react';
import { createPDFAPI, uploadPDFAPI } from '../Services/allAPI';
import { PDFDocument } from 'pdf-lib';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';
import { baseURL } from '../Services/baseURL';

function Pdfupload() {
    const [selectedPDF, setSelectedPDF] = useState(null);
    const [errorMsg, setErrorMsg] = useState("");
    const [selectedPages, setSelectedPages] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const [uploadFileName, setUploadedFilename] = useState("");
    const [newPdfLink, setNewPdfLink] = useState(null);
    const [loading, setLoading] = useState(false);
    const [createPDFError, setCreatePDFError] = useState("");

    const handlePDFUpload = async (e) => {
        const file = e.target.files[0];
        if (file && file.type === 'application/pdf') {
            setSelectedPDF(file);
            const reqBody = new FormData();
            reqBody.append('pdfFile', file);
            try {
                const result = await uploadPDFAPI(reqBody);
                if (result.status === 200) {
                    console.log(result.data);
                    setUploadedFilename(result.data.filename); // Set the filename state
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

    useEffect(() => {
        const loadPDF = async () => {
            if (selectedPDF) {
                try {
                    const pdfBytes = await selectedPDF.arrayBuffer();
                    const pdfDoc = await PDFDocument.load(pdfBytes);
                    setTotalPages(pdfDoc.getPageCount());
                } catch (error) {
                    console.error("Error loading PDF:", error);
                    setErrorMsg("Error loading PDF. Please try again.");
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
                console.log(result.data.downloadLink);
                setNewPdfLink(result.data.downloadLink); 
                setCreatePDFError(result.data.errorMessage); 
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
        } finally {
            setLoading(false);
        }
    }

    return (
        <Container>
            <Row className="mt-3">
                <Col>
                    <Form>
                        <Form.Group controlId="formFile" className="mb-3">
                            <Form.Label>Select PDF:</Form.Label>
                            <Form.Control type="file" onChange={handlePDFUpload} />
                            {errorMsg && <Alert variant="danger" className="mt-2">{errorMsg}</Alert>}
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Select Pages:</Form.Label>
                            {Array.from({ length: totalPages }, (_, index) => index + 1).map(pageNumber => (
                                <Form.Check
                                    key={pageNumber}
                                    type="checkbox"
                                    id={`page-${pageNumber}`}
                                    label={`Page ${pageNumber}`}
                                    checked={selectedPages.includes(pageNumber)}
                                    onChange={() => handlePageSelect(pageNumber)}
                                />
                            ))}
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
                        <Alert variant="success">
                            <a href={`${baseURL}${newPdfLink}`} download>Download New PDF</a>
                        </Alert>
                    </Col>
                </Row>
            )}
            {createPDFError && (
                <Row className="mt-3">
                    <Col>
                        <Alert variant="danger">{createPDFError}</Alert>
                    </Col>
                </Row>
            )}
        </Container>
    );
}

export default Pdfupload;
