import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import CoffeeSelection from '../components/CoffeeSelection';
import CoffeeStatus from '../components/CoffeeStatus';
import CoffeeHistory from '../components/CoffeeHistory';
import { useAuth } from '../context/AuthContext';

const Dashboard: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="dashboard-page">
      <Container>
        <h1 className="mb-4">Welcome, {user?.username}!</h1>
        
        <Row>
          <Col lg={8}>
            <CoffeeSelection />
            <CoffeeStatus />
          </Col>
          
          <Col lg={4}>
            <Card className="coffee-card mb-4">
              <Card.Header className="bg-transparent border-0 pt-4">
                <h4 className="text-center mb-0">Your Profile</h4>
              </Card.Header>
              <Card.Body>
                <p><strong>Username:</strong> {user?.username}</p>
                <p><strong>Email:</strong> {user?.email}</p>
              </Card.Body>
            </Card>
            
            <CoffeeHistory />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Dashboard;