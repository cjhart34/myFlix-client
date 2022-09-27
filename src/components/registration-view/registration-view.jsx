// import React, { useState } from 'react';
// import PropTypes from 'prop-types';
// import './registration-view.scss';
// import { Form, Button, Card, CardGroup, Container, Col, Row } from 'react-bootstrap';
// import axios from 'axios';
// // import { Link } from 'react-router-dom';

// export class RegistrationView extends React.Component {
//   constructor() {
//     super();

//     this.state = {
//       Username: null,
//       Password: null,
//       Email: null,
//       Birthday: null,
//       FavoriteMovies: [],
//     };
//   }

//   componentDidMount() {
//     console.log('registration');
//   }
//   RegistrationView(props) {
//     const [username, setUsername] = useState('');
//     const [password, setPassword] = useState('');
//     const [email, setEmail] = useState('');
//     const [birthday, setBirthday] = useState('');
//     //Declare hook for each input error message when invalid
//     const [values, setValues] = useState({
//       usernameErr: '',
//       passwordErr: '',
//       emailErr: ''
//     });
//   }

//   validate = () => {
//     let isReq = true;
//     if (!username) {
//       //setValues redefines the values through a callback that receives the previous state of values and must return values updated
//       setValues({ ...values, usernameErr: 'Username is required.' });
//       isReq = false;
//     } else if (username.length < 6) {
//       setValues({ ...values, usernameErr: 'Username must be at least 6 characters long.' });
//       isReq = false;
//     }
//     if (!password) {
//       setValues({ ...values, passwordErr: 'Password is required.' });
//       isReq = false;
//     } else if (password.length < 6) {
//       setValues({ ...values, passwordErr: 'Password must be at least 6 characters long.' });
//       isReq = false;
//     }
//     if (!email) {
//       setValues({ ...values, emailErr: 'Email is required.' });
//       isReq = false;
//     } else if (email.indexOf('@') === -1) {
//       setValues((prevValues) => {
//         return { ...prevValues, emailErr: 'Enter a valid email address.' };
//       });
//       isReq = false;
//     }

//     return isReq;
//   }

//   handleSubmit = (e) => {
//     e.preventDefault();
//     const isReq = validate();
//     if (isReq) {
//       axios
//         .post('https://cjhart34.herokuapp.com/users', {
//           Username: username,
//           Password: password,
//           Email: email,
//           Birthday: birthday
//         })
//         .then(response => {
//           const data = response.data;
//           console.log(data);
//           alert('Thank you for registering, please login!');
//           window.open('/', '_self');
//           //The argument '_self' is necessary so that the page will open in the current tab
//         })
//         .catch(e => {
//           console.log('Unable to register user');
//         }
//         );
//       // console.log(username, password, email, birthday);
//       // props.onRegistration(username);

//     };
//   }

//   render() {
//     const { Username, Password, Email, Birthday } = this.props;
//     // const { Username, Email, Birthday, Password } = this.state;

//     return (
//       <Container fluid className='my-3 registration-container'>
//         <Row>
//           <Col>
//             <CardGroup>
//               <Card className='registration-card'>

//                 <Card.Title className='text-center'>Sign up for myFlix</Card.Title>

//                 <Form>

//                   <Form.Group controlId='form-username' className='form-group'>
//                     <Form.Label>Username:</Form.Label>
//                     <Form.Control
//                       type='text'
//                       value={Username}
//                       onChange={e => setUsername(e.target.value)}
//                       placeholder='Enter a username'
//                       required />
//                     {/* {values.usernameErr && <p>{values.usernameErr}</p>} */}
//                   </Form.Group>

//                   <Form.Group controlId='form-password' className='form-group'>
//                     <Form.Label>Password:</Form.Label>
//                     <Form.Control
//                       type='password'
//                       value={Password}
//                       onChange={e => setPassword(e.target.value)}
//                       placeholder='Password must be at least 6 characters'
//                       minLength='6'
//                       required />
//                     {/* {values.passwordErr && <p>{values.passwordErr}</p>} */}
//                   </Form.Group>

//                   <Form.Group controlId='form-email' className='form-group'>
//                     <Form.Label>Email:</Form.Label>
//                     <Form.Control
//                       type='email'
//                       value={Email}
//                       onChange={e => setEmail(e.target.value)}
//                       required />
//                     {/* {values.emailErr && <p>{values.emailErr}</p>} */}
//                   </Form.Group>

//                   <Form.Group controlId='form-bday' className='form-group'>
//                     <Form.Label>Date of Birth {'(mm/dd/yyyy)'}:</Form.Label>
//                     <Form.Control
//                       type='birthday'
//                       value={Birthday}
//                       placeholder='optional'
//                       onChange={e => setBirthday(e.target.value)}
//                     />
//                   </Form.Group>

//                   <Button varient='danger' type='submit' onClick={this.handleSubmit}>Submit</Button>

//                 </Form>
//               </Card>
//             </CardGroup>
//           </Col>
//         </Row>
//       </Container>
//     );
//   }
// }


// RegistrationView.propTypes = {
//   register: PropTypes.shape({
//     Username: PropTypes.string.isRequired,
//     Password: PropTypes.string.isRequired,
//     Email: PropTypes.string.isRequired,
//   }),
// };

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

                <Card.Title className="text-center">Sign up here to gain access to myFlix!</Card.Title>

                <Form>
                  <Form.Group controlId="form-username" className="form-group">
                    <Form.Label>Username:</Form.Label>
                    <Form.Control
                      type="text"
                      value={Username}
                      onChange={e => setUsername(e.target.value)}
                      placeholder="Enter a username"
                      required />
                    {values.usernameErr && <p>{values.usernameErr}</p>}
                  </Form.Group>

                  <Form.Group controlId="form-password" className="form-group">
                    <Form.Label>Password:</Form.Label>
                    <Form.Control
                      type="password"
                      value={Password}
                      onChange={e => setPassword(e.target.value)}
                      placeholder="Password must be at least 5 characters"
                      minLength="5"
                      required />
                    {values.passwordErr && <p>{values.passwordErr}</p>}
                  </Form.Group>

                  <Form.Group controlId="form-email" className="form-group">
                    <Form.Label>Email:</Form.Label>
                    <Form.Control
                      type="email"
                      value={Email}
                      onChange={e => setEmail(e.target.value)}
                      required />
                    {values.emailErr && <p>{values.emailErr}</p>}
                  </Form.Group>

                  <Form.Group controlId="form-bday" className="form-group">
                    <Form.Label>Date of Birth {"(mm/dd/yyyy)"}:</Form.Label>
                    <Form.Control
                      type="birthday"
                      value={Birthday}
                      placeholder="optional"
                      onChange={e => setBirthday(e.target.value)}
                    />
                  </Form.Group>

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