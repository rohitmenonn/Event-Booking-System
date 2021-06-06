import React from 'react'
import { Row, Col } from 'react-bootstrap'

const Footer = () => {
  return (
    <footer>
      {/* <Container className="footer">
        <h2 className="footer-heading">Wanna post your events on our platform?</h2>
        <Row>
          <Col className='text-center py-3'>Contact us at <u>requests@eventscape.com</u></Col>
        </Row>
      </Container> */}
      <div className="footer">
        <h2 className="footer-heading">Wanna post your events on our platform?</h2>
        <Row>
          <Col className='text-center py-3'>Contact us at <u><a href={`mailto:requests@eventscape.com`} className="footer-email">requests@eventscape.com</a></u></Col>
        </Row>
        <Row>
          <Col className='text-center py-3'><a href="#" className="footer-actions"><i className="fab fa-instagram"></i></a><a href="#" className="footer-actions"><i className="fab fa-facebook-square"></i></a></Col>
        </Row>
      </div>
    </footer>
  )
}

export default Footer
