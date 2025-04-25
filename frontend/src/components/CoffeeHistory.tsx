import React from 'react';
import { Card, Table, Badge } from 'react-bootstrap';
import { useCoffee } from '../context/CoffeeContext';

const CoffeeHistory: React.FC = () => {
  const { history } = useCoffee();

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  return (
    <Card className="coffee-card mt-4">
      <Card.Header className="bg-transparent border-0 pt-4">
        <h4 className="text-center mb-0">Coffee History</h4>
      </Card.Header>
      <Card.Body>
        {history.length === 0 ? (
          <p className="text-center text-muted">No coffee history yet</p>
        ) : (
          <Table responsive hover>
            <thead>
              <tr>
                <th>Date</th>
                <th>Type</th>
              </tr>
            </thead>
            <tbody>
              {history.map((item) => (
                <tr key={item._id}>
                  <td>{formatDate(item.createdAt)}</td>
                  <td>
                    <Badge 
                      bg={item.coffeeType === 'Mild' ? 'info' : 'dark'}
                    >
                      {item.coffeeType}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Card.Body>
    </Card>
  );
};

export default CoffeeHistory;