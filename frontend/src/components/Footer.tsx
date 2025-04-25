import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import {   Coffee,  Github,   Twitter,   Linkedin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="footer mt-auto py-3">
      <Container>
        <Row className="align-items-center">
          <Col md={4} className="text-center text-md-start mb-3 mb-md-0">
            <div className="d-flex align-items-center justify-content-center justify-content-md-start">
              <Coffee size={24} className="me-2" />
              <span className="fs-5">IoT Coffee Machine</span>
            </div>
            <p className="small mt-2 mb-0">© {new Date().getFullYear()} All Rights Reserved</p>
          </Col>
          
          <Col md={4} className="text-center mb-3 mb-md-0">
            <p className="mb-0">Smart Coffee for Smart People</p>
          </Col>
          
          <Col md={4} className="text-center text-md-end">
            <div className="d-flex justify-content-center justify-content-md-end">
              <a href="#" className="text-white me-3">
                <Github size={20} />
              </a>
              <a href="#" className="text-white me-3">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-white">
                <Linkedin size={20} />
              </a>
            </div>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;