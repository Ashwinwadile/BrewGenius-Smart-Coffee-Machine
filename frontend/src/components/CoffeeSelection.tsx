import React from 'react';
import { Card, Button, Row, Col } from 'react-bootstrap';
import {   Coffee } from 'lucide-react';
import { useCoffee } from '../context/CoffeeContext';

const CoffeeSelection: React.FC = () => {
  const { selectCoffee, preference, loading } = useCoffee();

  const handleSelect = (type: 'Mild' | 'Strong') => {
    selectCoffee(type);
  };

  return (
    <Card className="coffee-card mb-4">
      <Card.Header className="bg-transparent border-0 pt-4">
        <h4 className="text-center mb-0">Select Your Coffee</h4>
      </Card.Header>
      <Card.Body>
        <Row>
          <Col md={6} className="mb-3 mb-md-0">
            <Card 
              className={`h-100 coffee-card ${preference?.coffeeType === 'Mild' ? 'border-primary' : ''}`}
              onClick={() => handleSelect('Mild')}
              style={{ cursor: 'pointer' }}
            >
              <Card.Body className="text-center p-4">
                <Coffee size={48} className="mb-3" color="#a67c52" />
                <h5>Mild</h5>
                <p className="text-muted">Smooth and gentle flavor</p>
                <Button 
                  variant={preference?.coffeeType === 'Mild' ? 'primary' : 'outline-primary'}
                  className="mt-2"
                  onClick={() => handleSelect('Mild')}
                  disabled={loading}
                >
                  {preference?.coffeeType === 'Mild' ? 'Selected' : 'Select'}
                </Button>
              </Card.Body>
            </Card>
          </Col>
          
          <Col md={6}>
            <Card 
              className={`h-100 coffee-card ${preference?.coffeeType === 'Strong' ? 'border-primary' : ''}`}
              onClick={() => handleSelect('Strong')}
              style={{ cursor: 'pointer' }}
            >
              <Card.Body className="text-center p-4">
                <Coffee size={48} className="mb-3" color="#6f4e37" />
                <h5>Strong</h5>
                <p className="text-muted">Bold and intense flavor</p>
                <Button 
                  variant={preference?.coffeeType === 'Strong' ? 'primary' : 'outline-primary'}
                  className="mt-2"
                  onClick={() => handleSelect('Strong')}
                  disabled={loading}
                >
                  {preference?.coffeeType === 'Strong' ? 'Selected' : 'Select'}
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default CoffeeSelection;