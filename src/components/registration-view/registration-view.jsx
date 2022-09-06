import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './registration-view.scss';
import { Form, Button, Card, CardGroup, Container, Col, Row } from 'react-bootstrap';
import axios from 'axios';

export function RegistrationView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [birthday, setBirthday] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // axios.post('https://cjhart34.herokuapp.com/users', {
    //   Username: username,
    //   Password: password,
    //   Email: email,
    //   Birthday: birthday
    // })
    //   .then(response => {
    //     const data = response.data;
    //     console.log(data);
    //     window.open('/', '_self');
    //     //The argument '_self' is necessary so that the page will open in the current tab
    //   })
    //   .catch(e => {
    //     console.log('error registering the user');
    //     alert('Something wasn\'t entered correctly');
    //   });
    console.log(username, password, email, birthday);
    props.onRegistration(username);
  };

  return (
    <Container fluid className='registerContainer text-center my-3 mx-12'>
      <Row>
        <Col>
          <CardGroup>
            <Card>
              <Card.Body>
                <Card.Title className='text-center'>Please Register</Card.Title>
                <Form>
                  <Form.Group className='mb-3 mx-auto mt-4' controlId='formUsername'>
                    <Form.Label>Username:</Form.Label>
                    <Form.Control
                      type='text'
                      value={username}
                      onChange={e => setUsername(e.target.value)}
                      required
                      placeholder='Enter a username'
                    />
                  </Form.Group>

                  <Form.Group className='my-3'>
                    <Form.Label>Password:</Form.Label>
                    <Form.Control
                      type='password'
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      required
                      minLength='8'
                      placeholder='Your password must 8 or more characters'
                    />
                  </Form.Group>

                  <Form.Group className='mb-3 mx-auto mt-4'>
                    <Form.Label>Email:</Form.Label>
                    <Form.Control
                      type='email'
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      required
                      placeholder='Enter your email address'
                    />
                  </Form.Group>

                  <Form.Group className='mb-3 mx-auto mt-4'>
                    <Form.Label>Birthday:</Form.Label>
                    <Form.Control
                      type='date'
                      value={birthday}
                      onChange={e => setBirthday(e.target.value)}
                      required
                    />
                  </Form.Group>
                  <Button className='mt-4' variant='primary' type='submit' onClick={handleSubmit}>Register</Button>
                </Form>
              </Card.Body>
            </Card>
          </CardGroup>
        </Col>
      </Row>
    </Container>

  );
}

RegistrationView.propTypes = {
  onRegistration: PropTypes.func.isRequired,
};