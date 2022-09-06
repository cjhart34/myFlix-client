import React, { useState } from 'react';
import propTypes from 'prop-types';
import { Form, Button, Card, CardGroup, Container, Col, Row } from 'react-bootstrap';
import axios from 'axios';
import './login-view.scss';

export function LoginView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, password);
    /* Send a request to the server for authentication */
    /* then call props.onLoggedIn(username) */
    props.onLoggedIn(username);
  };

  return (
    <Container fluid className='loginContainer my-3 mx-12'>
      <Row>
        <Col>
          <CardGroup>
            <Card>
              <Card.Body className='mt-3'>
                <Card.Title>Please Login</Card.Title>
                <Form>
                  <Form.Group controlId='formUsername'>
                    <Form.Label>Username:</Form.Label>
                    <Form.Control
                      type='text'
                      onChange={(e) => setUsername(e.target.value)}
                      required
                      placeholder='Enter username'
                    />
                  </Form.Group>

                  <Form.Group controlId='formPassword'>
                    <Form.Label>Password:</Form.Label>
                    <Form.Control type='password'
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      placeholder='Enter password'
                    />
                  </Form.Group>
                  <Button className='mt-3' variant='primary' type='submit' onClick={handleSubmit}>
                    Submit
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </CardGroup>
        </Col>
      </Row>
    </Container>

  );
}

LoginView.propTypes = {
  user: propTypes.shape({
    username: propTypes.string.isRequired,
    password: propTypes.string.isRequired
  }),
  onLoggedIn: propTypes.func.isRequired
};