import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Container, Col, Row, Form, Button, Card } from 'react-bootstrap';
import { BrowserRouter as Router, Route } from 'react-router-dom';
// import { Link } from 'react-router-dom';
import axios from 'axios';
import './login-view.scss';

export function LoginView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  //Declare hook for each input error message
  const [usernameErr, setUsernameErr] = useState('');
  const [passwordErr, setPasswordErr] = useState('');

  // Validate user inputs
  const validate = () => {
    let isReq = true;
    if (!username) {
      setUsernameErr('Username is required.');
      isReq = false;
    } else if (username.length < 3) {
      setUsernameErr('Username must be at least 3 characters long.');
      isReq = false;
    }
    if (!password) {
      setPasswordErr('Password is required.');
      isReq = false;
    } else if (password.length < 6) {
      setPasswordErr('Password must be at least 6 characters long.');
      isReq = false;
    }
    return isReq;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isReq = validate();
    if (isReq) {
      //Send a request to the server for authentication
      axios
        .post('https://cjhart34.herokuapp.com/login', {
          Username: username,
          Password: password
        })
        .then(response => {
          const data = response.data;
          props.onLoggedIn(data);
        })
        .catch(e => {
          console.log('no such user')
        });
    }
  };

  return (
    <Router>
      <Container className='py-5 login-container'>
        <Row>
          <Col>
            <Card>
              <Card.Body>
                <Card.Title className='text-center'>Welcome back to MyFlix!</Card.Title>
                <br></br>

                <Form>
                  <Form.Group className='form-group'>
                    <Form.Label>Username:</Form.Label><br></br>
                    <Form.Control
                      type='text'
                      onChange={e => setUsername(e.target.value)}
                      placeholder='Enter Username'
                      required minLength='3' />
                    {usernameErr && (<p>{usernameErr}</p>)}
                  </Form.Group>

                  <Form.Group className='form-group'>
                    <Form.Label>Password:</Form.Label><br></br>
                    <Form.Control
                      type='password'
                      onChange={e => setPassword(e.target.value)}
                      placeholder='Enter password'
                      required minLength='5' />
                    {passwordErr && (<p>{passwordErr}</p>)}
                  </Form.Group><br></br>

                  <Button className='ml-3' variant='primary' type='submit' onClick={handleSubmit}>
                    Sign in
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </Router>
  );
}

LoginView.propTypes = {
  onLoggedIn: PropTypes.func.isRequired
};