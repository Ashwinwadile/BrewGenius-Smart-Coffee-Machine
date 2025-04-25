import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import {   Coffee,   Cpu,   Wifi,   Database } from 'lucide-react';

const About: React.FC = () => {
  return (
    <div className="about-page">
      <Container>
        <h1 className="text-center mb-5">About IoT Coffee Machine</h1>
        
        <Row className="align-items-center mb-5">
          <Col lg={6} className="mb-4 mb-lg-0">
            <h2>What is an IoT Coffee Machine?</h2>
            <p className="lead">
              Our IoT Coffee Machine combines the latest in smart technology with the art of brewing perfect coffee.
            </p>
            <p>
              The Internet of Things (IoT) refers to the network of physical objects embedded with sensors, software, and other technologies for the purpose of connecting and exchanging data with other devices and systems over the internet.
            </p>
            <p>
              Our coffee machine leverages IoT technology to allow users to control their coffee preferences remotely, monitor brewing status in real-time, and enjoy a perfectly brewed cup of coffee exactly when they want it.
            </p>
          </Col>
          <Col lg={6}>
            <img 
              src="https://images.unsplash.com/photo-1544411047-c491e34a24e0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80" 
              alt="IoT Coffee Machine Concept" 
              className="img-fluid rounded-3 shadow about-image"
            />
          </Col>
        </Row>
        
        <h2 className="text-center mb-4">How It Works</h2>
        <Row className="mb-5">
          <Col md={3} className="mb-4">
            <Card className="h-100 coffee-card text-center">
              <Card.Body>
                <Cpu size={48} className="mb-3" color="#6f4e37" />
                <h5>ESP32 Microcontroller</h5>
                <p className="text-muted">The brain of our coffee machine, controlling all operations</p>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3} className="mb-4">
            <Card className="h-100 coffee-card text-center">
              <Card.Body>
                <Wifi size={48} className="mb-3" color="#6f4e37" />
                <h5>WiFi Connectivity</h5>
                <p className="text-muted">Connects to your home network for remote access</p>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3} className="mb-4">
            <Card className="h-100 coffee-card text-center">
              <Card.Body>
                <Database size={48} className="mb-3" color="#6f4e37" />
                <h5>Cloud Database</h5>
                <p className="text-muted">Stores your preferences and brewing history</p>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3} className="mb-4">
            <Card className="h-100 coffee-card text-center">
              <Card.Body>
                <Coffee size={48} className="mb-3" color="#6f4e37" />
                <h5>Precision Brewing</h5>
                <p className="text-muted">Ensures consistent quality with every cup</p>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        
        <Row className="mb-5">
          <Col>
            <Card className="coffee-card">
              <Card.Body>
                <h3 className="mb-3">Technical Specifications</h3>
                <ul>
                  <li>ESP32 microcontroller with WiFi and Bluetooth capabilities</li>
                  <li>Temperature sensors for optimal brewing temperature</li>
                  <li>Water level sensors to prevent dry brewing</li>
                  <li>Precision pump for consistent water flow</li>
                  <li>REST API for communication with the web application</li>
                  <li>MongoDB database for storing user preferences</li>
                  <li>React.js frontend for a responsive user interface</li>
                  <li>Node.js backend for handling API requests</li>
                </ul>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        
        <Row>
          <Col>
            <Card className="coffee-card">
              <Card.Body>
                <h3 className="mb-3">Future Enhancements</h3>
                <p>We're constantly working to improve our IoT Coffee Machine. Here are some features we're planning to add:</p>
                <ul>
                  <li>More coffee types and customization options</li>
                  <li>Scheduled brewing based on your daily routine</li>
                  <li>Integration with smart home systems like Alexa and Google Home</li>
                  <li>Machine learning to predict your coffee preferences based on time of day</li>
                  <li>Mobile app for iOS and Android</li>
                </ul>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default About;