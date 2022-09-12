import React from 'react';
import PropTypes from 'prop-types';
import { Container, Card, Button } from 'react-bootstrap';
import './director-view.scss';

export class DirectorView extends React.Component {
  render() {
    const { director, onBackClick } = this.props;

    return (
      <Container>
        <Card className='director-view'>
          <Card.Header className='director-view-header'>Director</Card.Header>
          <Card.Body className='director-view-title'>{director.Name}</Card.Body>
          <Card.Body>{director.Bio}</Card.Body>
          <Card.Footer>
            <Button
              className='director-view-button'
              onClick={() => {
                onBackClick();
              }}
            >
              Back
            </Button>
          </Card.Footer>
        </Card>
      </Container>
    );
  }
}

DirectorView.proptypes = {
  Director: PropTypes.shape({
    Name: PropTypes.string.isRequired,
    Bio: PropTypes.string
  }).isRequired,
};