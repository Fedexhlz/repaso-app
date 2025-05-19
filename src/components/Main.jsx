import React, { useEffect, useState } from 'react';
import { BASE_URL, BUSCAR_NOMBRE } from '../constants/rickMorty';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import axios from 'axios';

const Main = () => {
  const [personajes, setPersonajes] = useState([]);

  const getPersonajes = async () => {
    const resultado = await axios.get(BASE_URL);
    const resp = resultado.data.results;
    setPersonajes(resp);
  };

  const [buscarNombre, setBuscarNombre] = useState('');

  const handleBuscado = async () => {
    const resultado = await axios.get(BUSCAR_NOMBRE + buscarNombre);
    const buscado = resultado.data.results;
    setPersonajes(buscado);
  };

  useEffect(() => {
    getPersonajes();
  }, []);

  useEffect(() => {
    handleBuscado();
  }, []);

  return (
    <div>
      <Row>
        <Col>
          <input
            type='text'
            onChange={(e) => {
              setBuscarNombre(e.target.value);
            }}
          />
          <br />
          <br />
          <button onClick={handleBuscado}>apretar</button>
          <br />
          <br />
          <br />
        </Col>
      </Row>
      <Row>
        {personajes.map((personaje) => (
          <Col key={personaje.id}>
            <Card style={{ width: '18rem' }}>
              <Card.Img variant='top' src={personaje.image} />
              <Card.Body>
                <Card.Title>{personaje.name}</Card.Title>
                <Card.Text>Especie: {personaje.species}</Card.Text>
                <Card.Text>Estado: {personaje.status}</Card.Text>
                <Card.Text>Origen: {personaje.origin.name}</Card.Text>
                {/* <Button variant='primary'>Go somewhere</Button> */}
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Main;
