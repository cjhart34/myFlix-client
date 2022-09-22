import React from 'react';
import PropTypes from 'prop-types';
import { Button, Card, Container } from 'react-bootstrap';
import './movie-view.scss';
import { Link } from 'react-router-dom';
import axios from 'axios';

export class MovieView extends React.Component {

  constructor() {
    super();
    this.state = {};
  }

  addFavorite(movie) {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('user');

    axios
      .post(`https://cjhart34.herokuapp.com/users/${username}/movies/${movie._id}`, '', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        console.log(response);
        window.open('/', '_self');
        alert('Successfully added to favorites list!');
      });
  }

  render() {
    const { movie, onBackClick } = this.props;

    return (
      <Container className='my-3 movie-view'>
        <Card>
          <Card.Img
            crossOrigin=''
            src={movie.ImagePath} />

          <Card.Body>
            <Card.Title>{movie.Title}</Card.Title>
            <Card.Text>
              <div className='movie-description'>
                <span className='label'>Description: </span><br />
                <span className='value'>{movie.Description}</span>
              </div>
            </Card.Text>
            <Card.Text>

              <div className='movie-genre'>
                <span className='label'>Genre: </span>
                <Link to={`/genres/${movie.Genre.Name}`}>{movie.Genre.Name}</Link>
              </div>

              <div className='movie-director'>
                <span className='label'>Director: </span>
                <Link to={`/directors/${movie.Director.Name}`}>{movie.Director.Name}</Link>
              </div>

              <Button
                variant='dark'
                className='fav-button'
                size='md'
                onClick={() => this.addFavorite(movie)}
              >
                Add to Favorites
              </Button>
            </Card.Text>

            <button onClick={() => { onBackClick(null); }}>Back</button>
          </Card.Body>
        </Card>
      </Container>
    );
  }
}

MovieView.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    Genre: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Description: PropTypes.string.isRequired
    }),
    Director: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Bio: PropTypes.string.isRequired
    }),
    ImagePath: PropTypes.string.isRequired,
  }).isRequired
};