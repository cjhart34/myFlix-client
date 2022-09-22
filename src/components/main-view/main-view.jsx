import React from 'react';
import axios from 'axios';
import './main-view.scss';
// import PropTypes from 'prop-types';
import { Col, Row, Container } from 'react-bootstrap';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';

import { LoginView } from '../login-view/login-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { RegistrationView } from '../registration-view/registration-view';
import { NavBar } from '../navbar/navbar';
import { DirectorView } from '../director-view/director-view'
import { GenreView } from '../genre-view/genre-view';
import { ProfileView } from '../profile-view/profile-view';


export class MainView extends React.Component {

  constructor() {
    super();
    //Initial state is set to null
    this.state = {
      movies: [],
      user: null
    };
  }

  componentDidMount() {
    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem('user')
      });
      this.getMovies(accessToken);
    }
  }

  onLoggedIn(authData) {
    console.log(authData);
    this.setState({
      user: authData.user.Username
    });

    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.Username);
    this.getMovies(authData.token);
  }

  getMovies(token) {
    axios.get('https://cjhart34.herokuapp.com/movies', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        //Assign the result to the state
        this.setState({
          movies: response.data
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  onLoggedOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.setState({
      user: null
    });
    window.open('/', '_self');
  }

  render() {
    const { movies, user, director, genre } = this.state;

    return (

      <Router>
        <NavBar user={user} />

        <Container>
          <Row className='main-view justify-content-md-center'>
            <Route exact path='/' render={() => {
              if (!user) return <Col md={10}>
                <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
              </Col>

              if (movies.length === 0) return <div className='main-view' />;

              return movies.map(m => (
                <Col md={3} key={m._id}>
                  <MovieCard
                    movie={m} />
                </Col>
              ))
            }} />

            <Route path='/register' render={() => {
              if (user) return <Redirect to='/' />
              return <Col md={10}>
                <RegistrationView />
              </Col>
            }} />

            <Route path='/movies/:movieId' render={({ match, history }) => {
              return <Col md={6}>
                <MovieView
                  movie={movies.find(m => m._id === match.params.movieId)}
                  onBackClick={() => history.goBack()} />
              </Col>
            }} />

            <Route path={`/users/${user}`} render={({ match, history }) => {
              if (!user) return <Redirect to='/' />
              return <Col md={10}>
                <ProfileView movies={movies} user={user} onBackClick={() => history.goBack()} />
              </Col>
            }} />

            <Route path='/directors/:Name' render={({ match, history }) => {
              return <Col md={8}>
                <DirectorView
                  director={movies.find(m => m.director.Name === match.params.name)}
                  onBackClick={() => history.goBack()} />
              </Col>
            }} />

            <Route path='/genres/:Name' render={({ match, history }) => {
              return <Col md={8}>
                <GenreView
                  genre={movies.find(m => m.Genre.name === match.params.name)}
                  onBackClick={() => history.goBack()} />
              </Col>
            }} />
          </Row>

        </Container>
      </Router>
    );
  }
}

export default MainView;