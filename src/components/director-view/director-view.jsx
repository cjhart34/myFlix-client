import React from 'react';
// import PropTypes from 'prop-types';
import { Container, Card, Button } from 'react-bootstrap';
import './director-view.scss';

export class DirectorView extends React.Component {
  render() {
    const { director, onBackClick, movie } = this.props;

    return (
      <Container className='my-3'>
        <Card className='my-3'>
          <Card.Body>
            <Card.Title>Director</Card.Title>

            <Card.Text>
              <span className='label'>Name: </span>
              <span className='value'>{directors.Name}</span>
            </Card.Text>

            <Card.Text>
              <span className='label'>Description: </span>
              <span className='value'>{director.Description}</span>
            </Card.Text>

            <Card.Text>
              <span className='label'>Date of Birth: </span>
              <span className='value'>{director.DateOfBirth}</span>
            </Card.Text>

          </Card.Body>
        </Card>

        <Button variant='primary' onClick={() => { onBackClick(); }}>Back</Button>
      </Container>
    );
  }
}

// DirectorView.proptypes = {
//   Director: PropTypes.shape({
//     Name: PropTypes.string.isRequired,
//     Bio: PropTypes.string
//   }).isRequired,
// };