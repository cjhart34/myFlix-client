import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Container, Col, Row, Form, Button, Card } from 'react-bootstrap';
import { connect } from 'react-redux';
// import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';
// import './login-view.scss';

export function LoginView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  //Declare hook for each input error message
  const [
    // usernameErr, 
    setUsernameErr] = useState('');
  const [
    // passwordErr, 
    setPasswordErr] = useState('');

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
        .then((response) => {
          const data = response.data;
          props.onLoggedIn(data);
        })
        .catch((e) => {
          console.log('no such user')
        });
    }
  };

  return (
    <Card>
      <Form>
        <h2 className='mb-3 mx-auto mt-5'>Welcome to MyFlix!</h2>
        <Form.Group className='mb-3 mx-auto mt-4' controlId='formUsername'>
          <Form.Label>Username:</Form.Label>
          <Form.Control
            type='text'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            placeholder='Enter a username'
          />
        </Form.Group>

        <Form.Group className='mb-3 mx-auto mt-4'>
          <Form.Label>Password:</Form.Label>
          <Form.Control
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength='6'
            placeholder='Enter a password'
          />
        </Form.Group>

        <Button style={{ justifyContent: 'center', textAlign: 'center' }} variant='danger' type='submit' onClick={handleSubmit}>
          Submit
        </Button>
      </Form>
      <Link to='/register'>
        <Button className='ma-0 col-10 offset-1' variant='link'>
          Not Registered? Sign Up
        </Button>
      </Link>
    </Card>
  );
};

const mapDispatchToProps = (dispatch) => ({
  handleSubmit: (username, password) =>
    dispatch(handleSubmit(username, password))
});

export default connect(null, mapDispatchToProps)(LoginView);