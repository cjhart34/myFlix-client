import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Container, Col, Row, Form, Button, Card, CardGroup } from 'react-bootstrap';
import './registration-view.scss';
import axios from 'axios';
import { BrowserRouter as Router } from 'react-router-dom';
import { MainView } from '../main-view/main-view'


export function RegistrationView(props) {
  const [Username, setUsername] = useState('');
  const [Password, setPassword] = useState('');
  const [Email, setEmail] = useState('');
  const [Birthday, setBirthday] = useState('');

  //useState hook
  const [values, setValues] = useState({
    usernameErr: '',
    passwordErr: '',
    emailErr: ''
  });

  //validate function
  const validate = () => {
    let isReq = true;
    if (!Username) {
      setValues({ ...values, usernameErr: 'Username required' });
      isReq = false;
    } else if (Username.length < 3) {
      setValues({ ...values, usernameErr: 'Username must be at least 3 characters long' });
      isReq = false;
    } if (!Password) {
      setValues({ ...values, paswordErr: 'Password required' });
      isReq = false;
    } else if (Password.length < 5) {
      setValues({ ...values, passwordErr: 'Password must be at least 5 characters long' });
      isReq = false;
    }
    if (!Email) {
      setValues({ ...values, emailErr: 'Email required' });
      isReq = false;
    } else if (Email.indexOf('@') === -1) {
      setValues({ ...values, emailErr: 'Email is invalid' });
      isReq = false;
    }

    return isReq;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(Username, Password, Email, Birthday);
    //assign variable isReq to validate function
    const isReq = validate();
    if (isReq) {
      axios.post('https://cjhart34.herokuapp.com/users', {
        Username: Username,
        Password: Password,
        Email: Email,
        Birthday: Birthday
      }, {
        // headers: { Authorization: `Bearer ${token}` }
      })
        .then(response => {
          const data = response.data;
          console.log(data);
          alert('Registration successful');
          window.open('/', '_self');
        })
        .catch((response) => {
          console.error(response.data);
          alert('unable to register user')
        });
    }
  };

  return (
    <Router>
      <Container className="my-3 registration-container">
        <Row>
          <Col>
            <CardGroup>
              <Card className="registration-card">

                <Card.Title className="text-center">Sign up here to gain access to myFlix!</Card.Title><br></br>

                <Form>
                  <Form.Group controlId="form-username" className="form-group">
                    <Form.Label>Username:</Form.Label><br></br>
                    <Form.Control
                      type="text"
                      value={Username}
                      onChange={e => setUsername(e.target.value)}
                      placeholder="Enter a username"
                      className='text-box'
                      required />
                    {values.usernameErr && <p>{values.usernameErr}</p>}
                  </Form.Group>

                  <Form.Group controlId="form-password" className="form-group">
                    <Form.Label>Password:</Form.Label><br></br>
                    <Form.Control
                      type="password"
                      value={Password}
                      onChange={e => setPassword(e.target.value)}
                      placeholder="At least 5 characters"
                      minLength="5"
                      className='text-box'
                      required />
                    {values.passwordErr && <p>{values.passwordErr}</p>}
                  </Form.Group>

                  <Form.Group controlId="form-email" className="form-group">
                    <Form.Label>Email:</Form.Label><br></br>
                    <Form.Control
                      type="email"
                      value={Email}
                      className='text-box'
                      placeholder='Enter your email'
                      onChange={e => setEmail(e.target.value)}
                      required />
                    {values.emailErr && <p>{values.emailErr}</p>}
                  </Form.Group>

                  <Form.Group controlId="form-bday" className="form-group">
                    <Form.Label>Date of Birth {"(mm/dd/yyyy)"}:</Form.Label><br></br>
                    <Form.Control
                      type="birthday"
                      value={Birthday}
                      className='text-box'
                      placeholder="optional"
                      onChange={e => setBirthday(e.target.value)}
                    />
                  </Form.Group><br></br>

                  <Button varient="danger" type="submit" onClick={handleSubmit}>Submit</Button>

                </Form>
              </Card>
            </CardGroup>
          </Col>
        </Row>
      </Container>
    </Router>
  );
}

RegistrationView.propTypes = {
  register: PropTypes.shape({
    Username: PropTypes.string.isRequired,
    Password: PropTypes.string.isRequired,
    Email: PropTypes.string.isRequired
  })
};