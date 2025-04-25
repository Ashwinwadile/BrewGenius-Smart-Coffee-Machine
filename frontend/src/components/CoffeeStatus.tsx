import React from 'react';
import { Card, Button, ProgressBar } from 'react-bootstrap';
import {  Coffee,   Check,  AlertCircle } from 'lucide-react';
import { useCoffee } from '../context/CoffeeContext';

const CoffeeStatus: React.FC = () => {
  const { status, startCoffee, preference, loading } = useCoffee();

  const renderStatusIcon = () => {
    switch (status?.status) {
      case 'Preparing':
        return <Coffee size={48} className="mb-3" color="#6f4e37" />;
      case 'Ready':
        return <Check size={48} className="mb-3" color="#28a745" />;
      case 'Error':
        return <AlertCircle size={48} className="mb-3" color="#dc3545" />;
      default:
        return <Coffee size={48} className="mb-3" color="#6f4e37" />;
    }
  };

  return (
    <Card className="coffee-card">
      <Card.Header className="bg-transparent border-0 pt-4">
        <h4 className="text-center mb-0">Coffee Status</h4>
      </Card.Header>
      <Card.Body className="text-center">
        {renderStatusIcon()}
        
        <h5 className="mb-3">
          {status?.status === 'Idle' ? 'Ready to Brew' : status?.message}
        </h5>
        
        {status?.status === 'Preparing' && (
          <ProgressBar 
            now={status.progress} 
            label={`${status.progress}%`} 
            className="mb-3" 
            animated
          />
        )}
        
        {status?.status !== 'Preparing' && (
          <Button 
            variant="coffee" 
            className="btn-coffee mt-3"
            onClick={startCoffee}
            disabled={loading || !preference}
          >
            {preference ? 'Brew Coffee' : 'Select a coffee type first'}
          </Button>
        )}
        
        {preference && (
          <p className="mt-3 mb-0">
            Selected type: 
            <span className="coffee-type-badge">
              {preference.coffeeType}
            </span>
          </p>
        )}
      </Card.Body>
    </Card>
  );
};

export default CoffeeStatus;