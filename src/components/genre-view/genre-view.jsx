import React from 'react';
import PropTypes from 'prop-types';
import { Button, Container, Card } from 'react-bootstrap';
import './genre-view.scss';
import { BrowserRouter as Router } from 'react-router-dom';

export class GenreView extends React.Component {

  render() {

    const { genre, onBackClick } = this.props;

    return (
      <Router>
        <Container className='my-3'>
          <Card className='my-3 genre-card'>
            <Card.Body>

              <Card.Title>Genre</Card.Title>

              <Card.Text>
                <span className='label'>Name: </span>
                <span className='value'>{genre.Name}</span>
              </Card.Text>

              <Card.Text>
                <span className='label'>Description: </span>
                <span className='value'>{genre.Description}</span>
              </Card.Text>

            </Card.Body>
          </Card>

          <Button variant='primary' onClick={() => { onBackClick(); }}>Back</Button>

        </Container>
      </Router>
    );
  }
}

GenreView.proptypes = {
  genre: PropTypes.shape({
    Name: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
  }).isRequired,
};