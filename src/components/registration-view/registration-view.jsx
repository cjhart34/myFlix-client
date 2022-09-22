import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './registration-view.scss';
import { Form, Button, Card, CardGroup, Container, Col, Row } from 'react-bootstrap';
import axios from 'axios';
// import { Link } from 'react-router-dom';

export function RegistrationView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [birthday, setBirthday] = useState('');
  //Declare hook for each input error message when invalid
  const [values, setValues] = useState({
    usernameErr: '',
    passwordErr: '',
    emailErr: ''
  });

  const validate = () => {
    let isReq = true;
    if (!username) {
      //setValues redefines the values through a callback that receives the previous state of values and must return values updated
      setValues({ ...values, usernameErr: 'Username is required.' });
      isReq = false;
    } else if (username.length < 6) {
      setValues({ ...values, usernameErr: 'Username must be at least 6 characters long.' });
      isReq = false;
    }
    if (!password) {
      setValues({ ...values, passwordErr: 'Password is required.' });
      isReq = false;
    } else if (password.length < 6) {
      setValues({ ...values, passwordErr: 'Password must be at least 6 characters long.' });
      isReq = false;
    }
    if (!email) {
      setValues({ ...values, emailErr: 'Email is required.' });
      isReq = false;
    } else if (email.indexOf('@') === -1) {
      setValues((prevValues) => {
        return { ...prevValues, emailErr: 'Enter a valid email address.' };
      });
      isReq = false;
    }

    return isReq;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const isReq = validate();
    if (isReq) {
      axios
        .post('https://cjhart34.herokuapp.com/users', {
          Username: username,
          Password: password,
          Email: email,
          Birthday: birthday
        })
        .then(response => {
          const data = response.data;
          console.log(data);
          alert('Thank you for registering, please login!');
          window.open('/', '_self');
          //The argument '_self' is necessary so that the page will open in the current tab
        })
        .catch(e => {
          console.log('Unable to register user');
        }
        );
      // console.log(username, password, email, birthday);
      // props.onRegistration(username);

    };

    return (
      <Container fluid className='my-3 registration-container'>
        <Row>
          <Col>
            <CardGroup>
              <Card className='registration-card'>

                <Card.Title className='text-center'>Sign up for myFlix</Card.Title>

                <Form>

                  <Form.Group controlId='form-username' className='form-group'>
                    <Form.Label>Username:</Form.Label>
                    <Form.Control
                      type='text'
                      value={username}
                      onChange={e => setUsername(e.target.value)}
                      placeholder='Enter a username'
                      required />
                    {values.usernameErr && <p>{values.usernameErr}</p>}
                  </Form.Group>

                  <Form.Group controlId='form-password' className='form-group'>
                    <Form.Label>Password:</Form.Label>
                    <Form.Control
                      type='password'
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      placeholder='Password must be at least 6 characters'
                      minLength='6'
                      required />
                    {values.passwordErr && <p>{values.passwordErr}</p>}
                  </Form.Group>

                  <Form.Group controlId='form-email' className='form-group'>
                    <Form.Label>Email:</Form.Label>
                    <Form.Control
                      type='email'
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      required />
                    {values.emailErr && <p>{values.emailErr}</p>}
                  </Form.Group>

                  <Form.Group controlId='form-bday' className='form-group'>
                    <Form.Label>Date of Birth {'(mm/dd/yyyy)'}:</Form.Label>
                    <Form.Control
                      type='birthday'
                      value={birthday}
                      placeholder='optional'
                      onChange={e => setBirthday(e.target.value)}
                    />
                  </Form.Group>

                  <Button varient='danger' type='submit' onClick={handleSubmit}>Submit</Button>

                </Form>
              </Card>
            </CardGroup>
          </Col>
        </Row>
      </Container>
    );
  }
}
RegistrationView.propTypes = {
  register: PropTypes.shape({
    Username: PropTypes.string.isRequired,
    Password: PropTypes.string.isRequired,
    Email: PropTypes.string.isRequired,
  }),
};