import React from 'react';
import PropTypes from 'prop-types';
import { Button, Card, CardGroup, Row, Col, Container, Form } from 'react-bootstrap';
import './movie-view.scss';

export class MovieView extends React.Component {

  keypressCallback(event) {
    console.log(event.key);
  }

  componentDidMount() {
    document.addEventListener('keypress', this.keypressCallback);
  }

  componentWillUnmount() {
    document.removeEventListener('keypress', this.keypressCallback);
  }

  render() {
    const { movie, onBackClick } = this.props;

    return (
      <Container fluid className='movieViewContainer justify-content-md-center'>
        <Row>
          <Col className='movieImage justify-content-md-center'>
            <img src={movie.ImagePath} />
          </Col>
        </Row>
        <Row>
          <Col className='movieTitle'>
            <span className='label'>Title: </span>
            <span className='value'>{movie.Title}</span>
          </Col>
        </Row>
        <Row>
          <Col className='movieDescription'>
            <span className='label'>Description: </span>
            <span className='value'>{movie.Description}</span>
          </Col>
        </Row>
        <Row>
          <Col className='movieGenre'>
            <span className='label'>Genre: </span>
            <span className='value'>{movie.Genre.Name + '-' + movie.Genre.Description}</span>
          </Col>
        </Row>
        <Row>
          <Col className='movieDirector'>
            <span className='label'>Director: </span>
            <span className='value'>{movie.Director.Name + '-' + movie.Director.Bio}</span>
          </Col>
        </Row>
        <Row>
          <Col>
            <Button onClick={() => { onBackClick(null); }}>Back</Button>
          </Col>
        </Row>
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
  }).isRequired,
};