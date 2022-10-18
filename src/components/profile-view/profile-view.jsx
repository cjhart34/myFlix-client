import React from 'react';
import axios from 'axios';
import './profile-view.scss';
import { MovieCard } from '../movie-card/movie-card';
import { Form, Button, Card, Container, Row, Col } from 'react-bootstrap';
import { setUser, updateUser } from '../../actions/actions';
import { connect } from 'react-redux';

export class ProfileView extends React.Component {
  constructor() {
    super();

    this.state = {
      Username: null,
      Password: null,
      Email: null,
      Birthday: null,
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

  getUser(token) {
    const username = localStorage.getItem('user');
    axios
      .get(`https://cjhart34.herokuapp.com/users/${username}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        this.setState({
          Username: response.data.Username,
          Password: response.data.Password,
          Email: response.data.Email,
          Birthday: response.data.Birthday,
          FavoriteMovies: response.data.FavoriteMovies,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  editUser(e) {
    e.preventDefault();
    const username = localStorage.getItem('user');
    const token = localStorage.getItem('token');

    axios
      .put(
        `https://cjhart34.herokuapp.com/users/${username}`,
        {
          Username: this.state.Username,
          Password: this.state.Password,
          Email: this.state.Email,
          Birthday: this.state.Birthday,
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
          Birthday: response.data.Birthday,
        });
        localStorage.setItem('user', this.state.Username);
        const data = response.data;
        console.log(data);
        console.log(this.state.Username);
        alert('Your profile has been updated');
      })
      .catch(function (error) {
        console.log(error);
      });
  }
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
  // Delete A User
  onDeleteUser() {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('user');
    axios
      .delete(`https://cjhart34.herokuapp.com/users/${username}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        console.log(response);
        alert('The account was successfully deleted.');
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        window.open('/', '_self');
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  setUsername(value) {
    this.state.Username = value;
  }

  setPassword(value) {
    this.state.Password = value;
  }

  setEmail(value) {
    this.state.Email = value;
  }

  setBirthday(value) {
    this.state.Birthday = value;
  }

  render() {
    const { onBackClick, movies } = this.props;
    // const { user, username } = this.state;

    const FavoriteMovies = movies.filter((m) => {
      return this.state.FavoriteMovies.includes(m._id);
    });

    return (
      <Container className='profile-view registration-container' style={{ justifyContent: 'center', textAlign: 'center', width: '850px' }}>
        <div>
          <Button
            style={{ justifyContent: 'center', textAlign: 'center', marginBottom: '50px' }}
            onClick={() => {
              onBackClick();
            }}
          >
            Back
          </Button>
        </div>

        <Row>
          <Col md={12}>
            <Card className='your-profile'>
              <Card.Body>
                <Card.Title>
                  <span className='card-title'>{this.state.Username}'s account</span>
                </Card.Title>
                <Card.Text>
                  <div>
                    <span className='username'>Username: </span>
                    <span className='value'>{this.state.Username}</span>
                  </div>
                </Card.Text>
                <Card.Text>
                  <div>
                    <span className='email'>Email: </span>
                    <span className='value'>{this.state.Email}</span>
                  </div>
                </Card.Text>
                <Card.Text>
                  <div>
                    <span className='birthday'>Birthday: </span>
                    <span className='value'>{this.state.Birthday}</span>
                  </div>
                </Card.Text>
                <div className='delete-profile-button'>
                  <Button onClick={() => this.onDeleteUser()}>
                    Delete your account
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Row>
          <Col md={12} style={{ justifyContent: 'center' }}>
            <Card className='your-profile'>
              <Card.Body>
                <Card.Title className='text-center'>
                  {' '}
                  <span className='update-title'>
                    Update Your Account
                  </span>{' '}
                </Card.Title>
                <Form
                  className='formDisplay'
                  onSubmit={(e) => this.editUser(e)}
                >
                  <Form.Group>
                    <Form.Label>Username:</Form.Label>
                    <Form.Control
                      type='text'
                      name='Username:'
                      placeholder='New Username must be at least 3 characters long'
                      onChange={(e) => this.setUsername(e.target.value)}
                      required
                    />
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>Password:</Form.Label>
                    <Form.Control
                      type='password'
                      name='Password:'
                      placeholder='New Password must be at least 6 characters'
                      onChange={(e) => this.setPassword(e.target.value)}
                      required
                    />
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>Email:</Form.Label>
                    <Form.Control
                      type='email'
                      name='Email:'
                      placeholder='New Email'
                      onChange={(e) => this.setEmail(e.target.value)}
                      required
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Birthday:</Form.Label>
                    <Form.Control
                      type='date'
                      name='Birthday:'
                      onChange={(e) => this.setBirthday(e.target.value)}
                    />
                  </Form.Group><br></br>

                  <div className='update-profile-button'>
                    <Button type='submit'>
                      Update
                    </Button>
                  </div>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row><br></br>

        <div>
          <h3 className='favorite-Movies-title'>My ❤️ Movies:</h3>
        </div>

        <Row className='favoriteMovie-col' style={{ justifyContent: 'center', padding: '10px' }}>
          {FavoriteMovies.map((movie) => (
            <Col sm={4} md={4} lg={4} key={movie._id}>
              <div className='favoriteMoviediv'>
                <MovieCard movie={movie} />

                <Button
                  onClick={() => this.removeFavorite(movie)}
                >
                  Remove from Favorites
                </Button>
              </div>
            </Col>
          ))}
        </Row>
      </Container >
    );
  }
}

let mapStateToProps = (state) => {
  return {
    user: state.user,
    movies: state.movies,
  };
};

export default connect(mapStateToProps, { setUser, updateUser })(ProfileView);