import React from 'react'

import {
    MDBFooter,
    MDBContainer,
    MDBCol,
    MDBRow,
    MDBIcon,
    MDBBtn
  } from 'mdb-react-ui-kit';
import { Button, Card } from 'react-bootstrap';
function Footer() {
  return (
    <div><MDBFooter className='bg-light text-center text-white'>
    <Card id='contact' className="mt-3 shadow" style={{ borderColor: '#007bff' }}>
      <Card.Body>
        <Card.Title style={{ color: '#007bff' }}>Got Questions or Feedback?</Card.Title>
        <Card.Text>
          We're here to help! If you have any enquiries or feedback, don't hesitate to reach out. Feel free to email us directly:
        </Card.Text>
        <Button variant="outline-primary" href="mailto:contact@extractoxpdf.com">
          contact@extractoxpdf.com
        </Button>
      </Card.Body>
    </Card>
    <div className='text-center  text-light bg-dark p-3' >
      © 2024 Copyright:
      <a className='text-white' href='#home'>
        PDF Extractox
      </a>
    </div>
  </MDBFooter></div>
  )
}

export default Footer