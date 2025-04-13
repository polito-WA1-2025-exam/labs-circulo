import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { Alert, Col, Container, Row } from "react-bootstrap";
import BagCard from "./BagCard";

export type Bag = {
  bagID: number;
  endTime: dayjs.Dayjs;
  establishmentId: number;
  price: number;
  startTime: dayjs.Dayjs;
  status: string;
  type: string;
};


function ViewBags() {

  const [bags, setBags] = useState<Bag[]>([]); // Initialize state to hold bag data

  //Make a api call to get the bag data
  useEffect(() => {
    const fetchBags = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/bag", { method: "GET", }); // Replace with your API endpoint

        const data: Bag[] = await response.json();
        console.log(data); // Handle the bag data as needed

        setBags(() => data.map(b => {
          return {
            ...b,
            startTime: dayjs(b.startTime),
            endTime: dayjs(b.endTime)
          }
        })); 
      } catch (error) {
        console.error("Error fetching bags:", error);
      }
    };

    fetchBags();
  }, [])


  // Render the bag data here
  
  return (
    <Container className="">
      <Row className="mb-4">
        <Col>
          <h1 className="display-5 fw-bold text-center">Gestione Bag</h1>
          <p className="text-center text-muted">Visualizza e gestisci i bag disponibili</p>
        </Col>
      </Row>
      
      {bags.length === 0 ? (
        <Row>
          <Col>
            <Alert variant="info" className="text-center">
              Nessun bag trovato. Prova ad aggiungere un nuovo bag.
            </Alert>
          </Col>
        </Row>
      ) : (
        <Row xs={1} md={2} lg={3} className="g-4">
          {bags.map((bag) => (
            <Col key={bag.bagID}>
              <BagCard bag={bag} />
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
}

export default ViewBags;