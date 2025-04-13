import React from 'react';
import dayjs from 'dayjs';
import { Card, Badge, Button, Row, Col } from 'react-bootstrap';
import { Bag } from './ViewBags';

// Componente per una singola card Bag
function BagCard({ bag }: { bag: Bag }) {
  // Formattazione delle date
  const formattedStartTime = bag.startTime.format('DD/MM/YYYY HH:mm');
  const formattedEndTime = bag.endTime.format('DD/MM/YYYY HH:mm');
  
  // Determina il colore dello status
  const statusVariant = bag.status.toLowerCase() === 'disponibile' 
    ? 'success' 
    : 'danger';

  return (
    <Card className="mb-3 shadow-sm" style={{ borderRadius: '0.75rem', overflow: 'hidden' }}>
      <Card.Body className="p-4">
        <div className="d-flex justify-content-between align-items-start mb-3">
          <Card.Title as="h5" className="mb-0 fw-bold">{bag.type}</Card.Title>
          <Badge bg={statusVariant} className="px-3 py-2 rounded-pill">
            {bag.status.charAt(0).toUpperCase() + bag.status.slice(1)}
          </Badge>
        </div>
        
        <Card.Subtitle className="mb-3 text-muted">ID: {bag.bagID}</Card.Subtitle>
        
        <Row className="mb-3">
          <Col xs={6}>
            <Card.Text className="mb-1 text-sm fw-medium">Inizio:</Card.Text>
            <Card.Text className="text-sm">{formattedStartTime}</Card.Text>
          </Col>
          <Col xs={6}>
            <Card.Text className="mb-1 text-sm fw-medium">Fine:</Card.Text>
            <Card.Text className="text-sm">{formattedEndTime}</Card.Text>
          </Col>
        </Row>
        
        <Row className="mb-4">
          <Col xs={6}>
            <Card.Text className="mb-1 text-sm fw-medium">Prezzo:</Card.Text>
            <Card.Text className="text-sm">€{bag.price.toFixed(2)}</Card.Text>
          </Col>
          <Col xs={6}>
            <Card.Text className="mb-1 text-sm fw-medium">ID Stabilimento:</Card.Text>
            <Card.Text className="text-sm">{bag.establishmentId}</Card.Text>
          </Col>
        </Row>
        
        <div className="d-grid gap-2 d-md-flex justify-content-md-end">
          <Button variant="outline-primary" size="sm">
            Dettagli
          </Button>
          {bag.status.toLowerCase() === 'disponibile' && (
            <Button variant="primary" size="sm">
              Prenota
            </Button>
          )}
        </div>
      </Card.Body>
    </Card>
  );
};

export default BagCard;
