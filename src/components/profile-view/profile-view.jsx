import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Form, Button, Card, Container, Col, Row } from 'react-bootstrap';
import './profile-view.scss';

export class ProfileView extends React.Component {
  constructor() {
    super();

    this.state = {
      Username: this.state,
      Password: this.state,
      Email: this.state,
      Birthday: this.state,
      FavoriteMovies: [],
    };
  }

  componentDidMount() {
    const accessToken = localStorage.getItem('token');
    this.getUser(accessToken);
  }

  onLoggedOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.setState({
      user: null,
    });
    window.open('/', '_self');
  }

  formatDate(date) {
    if (date) date = date.substring(0, 10);
    return date;
  }

  getUser = (token) => {
    const Username = localStorage.getItem('user');
    axios
      .get(`https://cjhart34.herokuapp.com/users/${Username}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        this.setState({
          Username: response.data.Username,
          Password: response.data.Password,
          Email: response.data.Email,
          Birthday: this.formatDate(response.data.Birthday),
          FavoriteMovies: response.data.FavoriteMovies,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  updateUser = (e) => {
    e.preventDefault();
    const Username = localStorage.getItem('user');
    const token = localStorage.getItem('token');

    axios
      .put(
        `https://cjhart34.herokuapp.com/users/${Username}`,
        {
          Username: this.state.Username,
          Password: this.state.Password,
          Email: this.state.Email,
          Birthday: this.state.Birthday
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((response) => {
        this.setState({
          Username: response.data.Username,
          Password: response.data.Password,
          Email: response.data.Email,
          Birthday: response.data.Birthday
        });

        localStorage.setItem('user', this.state.Username);
        const data = response.data;
        console.log(data);
        console.log(this.state.Username);
        alert('Profile is updated!');
        window.open(`/users/${Username}`, '_self');
      });
  };

  removeFavorite(movie) {
    const Username = localStorage.getItem('user');
    console.log(Username);
    let token = localStorage.getItem('token');
    console.log(this.props);
    axios
      .delete(
        `https://cjhart34.herokuapp.com/users/${Username}/movies/${movie._id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((response) => {
        console.log(response);
        alert('Movie was removed from favorites.');
        this.componentDidMount();
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  // Deregister user
  deleteUser() {
    if (!confirm('Are you sure you want to delete your account?')) return;
    const Username = localStorage.getItem('user');
    const token = localStorage.getItem('token');

    axios
      .delete(`https://cjhart34.herokuapp.com/users/${Username}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        console.log(response);
        alert('Profile has been deleted!');
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        window.open(`/`, '_self');
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  // Set user values
  setUsername(value) {
    this.setState({
      Username: value,
    });
    // this.Username = value;
  }

  setPassword(value) {
    this.setState({
      Password: value,
    });
    // this.Password = value;
  }

  setEmail(value) {
    this.setState({
      Email: value,
    });
    // this.Email = value;
  }

  setBirthday(value) {
    this.setState({
      Birthday: value,
    });
    // this.Birthday = value;
  }

  render() {
    const { movies, onBackClick } = this.props;
    const { Username, Email, Birthday, Password } = this.state;

    const FavoriteMovies = movies.filter((movie) => {
      return this.state.FavoriteMovies.includes(movie._id);
    });

    return (
      <Container className='profile-view'>
        <Row>
          <Col>
            <Card className='update-profile'>
              <Card.Body>
                <Card.Title>My Profile</Card.Title><br></br>
                <Form className='update-form' onSubmit={(e) =>
                  this.updateUser(
                    e,
                    this.Username,
                    this.Password,
                    this.Email,
                    this.Birthday
                  )}>

                  <Form.Group>
                    <Form.Label>Username</Form.Label><br></br>
                    <Form.Control
                      type='text'
                      name='Username'
                      placeholder='New Username'
                      value={Username}
                      onChange={(e) => this.setUsername(e.target.value)}
                      required
                    />
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>Password</Form.Label><br></br>
                    <Form.Control
                      type='password'
                      name='password'
                      placeholder='New password'
                      value={Password}
                      onChange={(e) => this.setPassword(e.target.value)}
                      required
                    />
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>Email</Form.Label><br></br>
                    <Form.Control
                      type='email'
                      name='email'
                      placeholder='Enter email'
                      value={Email}
                      onChange={(e) => this.setEmail(e.target.value)}
                      required
                    />
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>Birthday (yyyy/mm/dd)</Form.Label><br></br>
                    <Form.Control
                      type='full-date'
                      name='birthday'
                      value={Birthday}
                      onChange={(e) => this.setBirthday(e.target.value)}
                    />
                  </Form.Group>
                  <div className='mt-3'><br></br>
                    <Button className='ml-3' variant='success' type='submit' onClick={this.updateUser}>Update User</Button><br></br><br></br>
                    <Button className='ml-3' variant='danger' onClick={() => this.deleteUser()}>Delete User</Button>
                  </div>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Card className='my-3'>
          <Card.Body>

            <Row>
              <Col>
                <h4 id='fm_text_color'>My Favorite Movies</h4>
              </Col>
            </Row>
            <br></br>

            <Row className='movies-center'>
              {FavoriteMovies.map((movie) => {
                return (
                  <div key={movie._id}>
                    <Card style={{ width: '10rem' }}>
                      <Link to={`/movies/${movie._id}`}>
                        <Card.Img
                          className='movie-card-link'
                          variant='top'
                          crossOrigin=''
                          src={movie.ImagePath} />
                      </Link>

                      <Button
                        className='ml-3'
                        variant='danger'
                        size='sm'
                        onClick={() => this.removeFavorite(movie)}>
                        Remove
                      </Button><br></br><br></br>
                    </Card>
                  </div>
                );
              })}
            </Row>
          </Card.Body>
        </Card>

        <div>
          <Button className='ml-3' variant='primary' onClick={() => { onBackClick(null); }}>Back</Button>
        </div>
      </Container>
    );
  }
}

ProfileView.propTypes = {
  movies: PropTypes.arrayOf(PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired
  })).isRequired,
  onBackClick: PropTypes.func.isRequired
};