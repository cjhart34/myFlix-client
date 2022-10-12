import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Button, Row, Col } from 'react-bootstrap';
import axios from 'axios';
// import './movie-view.scss';

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
    const { movie, onBackClick, isFavorite, handleFavorite } = this.props;

    if (!movie) return <div></div>;
    return (
      <Col style={{ textAlign: 'center', justifyContent: 'center' }}
        className='p-3'
        md={12}
        lg={12}
        xl={12}
      >
        <Row
          className='justify-content-start'
        >
          <Col sm={12}>
            <img
              crossOrigin='anonymous'
              className='img'
              src={movie.ImagePath}
              alt=' Movie Image'
            />
          </Col>
          <Col sm={12}>
            <div className='mt-2'>
              <div className='title'>{movie.Title} </div>

              <div className='mt-3'>
                <span className='fw-bold'>Genre: </span>
                <Link to={`/genres/${movie.Genre.Name}`}>
                  <Button variant='outline-dark'>{movie.Genre.Name} </Button>
                </Link>
              </div>

              <div className='mt-2'>
                <span className='fw-bold'>Director: </span>
                <Link to={`/directors/${movie.Director.Name}`}>
                  <Button variant='outline-dark'>{movie.Director.Name}</Button>
                </Link>
              </div>

              <div className='mt-2'>
                <span className='fw-bold'>Description</span>
                <span className='value'>: {movie.Description}</span>
              </div>

              <Button
                className='my-4'
                variant='warning'
                onClick={() => {
                  onBackClick(null);
                }}
              >
                « Back
              </Button>
              {!isFavorite ? (
                <Button
                  className='my-4 ml-2'
                  variant='outline-primary'
                  onClick={() => this.addFavorite(movie)}
                >
                  Add to ❤️ Movies
                </Button>
              ) : (
                <Button
                  className='my-4 ml-2'
                  variant='outline-primary'
                  onClick={() => handleFavorite(movie._id, 'add')}
                >
                  Added to your ❤️ Movies
                </Button>
              )}
            </div>
          </Col>
        </Row>
      </Col>
    );
  }
}

MovieView.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired,
    Genre: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Description: PropTypes.string.isRequired,
    }),
    Director: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Description: PropTypes.string.isRequired
    }),
  }).isRequired,
};