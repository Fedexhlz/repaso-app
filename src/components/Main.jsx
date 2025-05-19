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
    try {
      const resultado = await axios.get(BASE_URL);
      const resp = resultado.data.results;
      setPersonajes(resp);
    } catch (error) {
      console.log('error');
    }
  };

  const [buscarNombre, setBuscarNombre] = useState({ name: '' });

  const getBusqueda = async (e) => {
    e.preventDefault();
    try {
      const resultado = await axios.get(BUSCAR_NOMBRE + buscarNombre);
      const buscado = resultado.data.results;
      setPersonajes(buscado);
    } catch (error) {
      console.log('error');
    }
  };

  useEffect(() => {
    getPersonajes();
  }, []);

  useEffect(() => {
    getBusqueda();
  }, []);

  return (
    <div className='px-auto'>
      <Row>
        <Col>
          {}
          <form action=''>
            <input
              type='text'
              onChange={(e) => {
                setBuscarNombre(e.target.value);
              }}
            />
            <br />
            <br />
            <button onClick={getBusqueda}>apretar</button>
          </form>
          <br />
          <br />
          <br />
        </Col>
      </Row>
      <Row>
        {personajes.map((personaje) => (
          <Col className='my-2' xs={3} key={personaje.id}>
            <Card
              className='mx-auto'
              style={{ width: '22rem', minHeight: '100%' }}
            >
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
