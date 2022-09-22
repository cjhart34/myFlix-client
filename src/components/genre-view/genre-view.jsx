import React from 'react';
// import PropTypes from 'prop-types';
import { Button, Container, Card, Row } from 'react-bootstrap';
import './genre-view.scss';

export class GenreView extends React.Component {

  render() {

    const { genre, onBackClick } = this.props;

    return (
      <Container className='my-3'>
        <Card className='my-3 genre-card'>
          <Card.Body>

            <Card.Title>Genre</Card.Title>

            <Card.Text>
              <span className='label'>Name: </span>
              <span className='value'>{genres.Name}</span>
            </Card.Text>

            <Card.Text>
              <span className='label'>Description: </span>
              <span className='value'>{genre.Description}</span>
            </Card.Text>

          </Card.Body>
        </Card>

        <Button variant='primary' onClick={() => { onBackClick(); }}>Back</Button>

      </Container>
    );
  }
}

// GenreView.proptypes = {
//   Genre: PropTypes.shape({
//     Name: PropTypes.string.isRequired,
//     Description: PropTypes.string.isRequired,
//   }).isRequired,
// };