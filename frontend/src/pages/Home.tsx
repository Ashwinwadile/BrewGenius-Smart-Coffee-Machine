import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Coffee, Wifi, Clock, Settings } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Home: React.FC = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section py-5">
        <Container>
          <Row className="align-items-center">
            <Col lg={6} className="mb-4 mb-lg-0">
              <h1 className="display-4 fw-bold mb-3">Smart Coffee at Your Fingertips</h1>
              <p className="lead mb-4">
                Control your IoT Coffee Machine from anywhere. Select your perfect brew and have it ready when you need it.
              </p>
              {isAuthenticated ? (
                <Link to="/dashboard" className="btn btn-coffee btn-lg">
                  Go to Dashboard
                </Link>
              ) : (
                <div className="d-flex gap-3">
                  <Link to="/login" className="btn btn-coffee btn-lg">
                    Login
                  </Link>
                  <Link to="/register" className="btn btn-lg btn-outline-primary">
                    Register
                  </Link>
                </div>
              )}
            </Col>
            <Col lg={6}>
              <img
                src="https://images.unsplash.com/photo-1517701604599-bb29b565090c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80"
                alt="IoT Coffee Machine"
                className="img-fluid rounded-3 shadow"
              />
            </Col>
          </Row>
        </Container>
      </section>

      {/* Features Section */}
      <section className="features-section py-5 bg-light">
        <Container>
          <h2 className="text-center mb-5">Smart Features</h2>
          <Row>
            <Col md={3} className="mb-4">
              <Card className="h-100 coffee-card text-center">
                <Card.Body>
                  <Wifi size={48} className="mb-3" color="#6f4e37" />
                  <h5>IoT Connected</h5>
                  <p className="text-muted">Control your coffee machine from anywhere with internet access</p>
                </Card.Body>
              </Card>
            </Col>
            <Col md={3} className="mb-4">
              <Card className="h-100 coffee-card text-center">
                <Card.Body>
                  <Coffee size={48} className="mb-3" color="#6f4e37" />
                  <h5>Perfect Brew</h5>
                  <p className="text-muted">Choose between mild and strong coffee based on your preference</p>
                </Card.Body>
              </Card>
            </Col>
            <Col md={3} className="mb-4">
              <Card className="h-100 coffee-card text-center">
                <Card.Body>
                  <Clock size={48} className="mb-3" color="#6f4e37" />
                  <h5>Real-time Updates</h5>
                  <p className="text-muted">Get live status updates on your coffee preparation</p>
                </Card.Body>
              </Card>
            </Col>
            <Col md={3} className="mb-4">
              <Card className="h-100 coffee-card text-center">
                <Card.Body>
                  <Settings size={48} className="mb-3" color="#6f4e37" />
                  <h5>User Preferences</h5>
                  <p className="text-muted">Save your preferences for quick access next time</p>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="cta-section py-5">
        <Container className="text-center">
          <h2 className="mb-4">Ready to Experience Smart Coffee?</h2>
          <p className="lead mb-4">Join our community of smart coffee enthusiasts today.</p>
          {!isAuthenticated && (
            <Link to="/register" className="btn btn-coffee btn-lg">
              Get Started
            </Link>
          )}
        </Container>
      </section>
    </div>
  );
};

export default Home;
