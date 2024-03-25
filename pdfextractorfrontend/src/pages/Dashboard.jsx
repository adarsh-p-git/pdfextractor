import React from 'react';
import { Container, Row, Col, Button, Card, ListGroup } from 'react-bootstrap';
import { BsFillCloudUploadFill, BsShieldLockFill, BsSpeedometer2 } from 'react-icons/bs'; // Icons for enhanced UI
// Assuming 'bootstrap/dist/css/bootstrap.min.css' is imported globally or in index.js
import Pdfupload from '../components/Pdfupload'; // Your custom PDF upload component

import { Badge } from 'react-bootstrap'; // Import Badge from react-bootstrap
import { BsUpload, BsFillFileEarmarkDiffFill, BsDownload } from 'react-icons/bs'; // Import icons from react-icons
const Dashboard = () => {
  return (
    <Container fluid className="py-5" style={{ backgroundColor: '#f8f9fa' }}> {/* Enhanced background color for better contrast */}
      <Row className="mb-4">
        <Col>
          <h1 className="page-heading text-center mb-3" style={{ fontWeight: '600'}}>Effortlessly Extract PDF Pages</h1>
          <p id = 'home'className="text-center" style={{ fontSize: '1.1rem' }}>
            Select and extract the pages you need from large PDF files online, free and easily. 
          </p>
        </Col>
      </Row>
      <section id=''>
      <Pdfupload/> 
      </section>
      

      <Row className="gy-4 m-5 rounded mt-5 bg-light-subtle p-5">
        <Col md={4}>
          <Card className=" bg-primary h-100 shadow-sm hover-animate"> {/* Enhanced UI with hover effect */}
            <Card.Body>
              <Card.Title className='text-light'>Free & Accessible <BsFillCloudUploadFill className="ms-2"/> {/* Decorative icon */}</Card.Title>
              <Card.Text className='text-light'>
                Straightforward and accessible for everyone, our tool operates without any hidden fees
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4}>
          <Card className="h-100 shadow-sm hover-animate bg-success"> {/* Enhanced UI with hover effect */}
            <Card.Body>
              <Card.Title className='text-light'>Privacy <BsShieldLockFill className="ms-2"/> {/* Decorative icon */}</Card.Title>
              <Card.Text className='text-light'>
              Your documents are processed securely, ensuring the confidentiality and integrity of your files.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4}>
          <Card className=" bg-secondary h-100 shadow-sm hover-animate"> {/* Enhanced UI with hover effect */}
            <Card.Body >
              <Card.Title className='text-light'>Efficient & Fast <BsSpeedometer2 className="ms-2"/> {/* Decorative icon */}</Card.Title>
              <Card.Text className='text-light'>
                Optimized for quick processing, our tool allows you to extract necessary PDF pages effortlessly, maximizing your productivity.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="mt-5  ">
        <Col md={12}>
          <Card className="text-center shadow-sm" style={{ borderRadius: '15px' }}>
            <Card.Body>
              <Card.Title  className='fs-5 fw-4 text-dark'>How to Extract Pages</Card.Title>
              <Card.Text>
              
     
      
      <ListGroup  variant="flush" className='bg-info rounded'>
        <ListGroup.Item>
          <Badge pill bg="secondary" className="me-2">
            1
          </Badge>
          <strong>Select your PDF:</strong> 
          <Button variant="outline-primary" size="sm" className="ms-2">
            <BsUpload /> Choose File
          </Button>
        </ListGroup.Item>
        <ListGroup.Item>
          <Badge pill bg="secondary" className="me-2">
            2
          </Badge>
          <strong>Choose Pages:</strong> After uploading, select the page numbers you'd like to extract.
        </ListGroup.Item>
        <ListGroup.Item>
          <Badge pill bg="secondary" className="me-2">
            3
          </Badge>
          <strong>Create PDF:</strong>
          <Button variant="outline-success" size="sm" className="ms-2">
            <BsFillFileEarmarkDiffFill /> Create New PDF
          </Button>
        </ListGroup.Item>
        <ListGroup.Item>
          <Badge pill bg="secondary" className="me-2">
            4
          </Badge>
          <strong>Download:</strong> Once ready, download your new PDF.
          <Button variant="outline-info" size="sm" className="ms-2">
            <BsDownload /> Download
          </Button>
        </ListGroup.Item>
      </ListGroup>
      <Card.Footer className="text-muted text-center">
        Extract your pages with ease.
      </Card.Footer>
    
              </Card.Text>
              <a href="#home"><Button variant="success" className="shadow-sm">Try Now</Button></a>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;
