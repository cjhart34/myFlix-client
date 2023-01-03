import React from 'react';
import { Container, Card, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import './director-view.scss';


export class DirectorView extends React.Component {

  render() {
    const { director, onBackClick } = this.props;

    return (
      <Container>
        <Card className='dir-view'>
          <Card.Header className='dir-view-header'>Director</Card.Header>
          <Card.Body className='dir-view-title'>{director.Name}</Card.Body>
          <Card.Body>{director.Bio}</Card.Body>
          <Card.Footer>
            <Button
              className='dir-view-button'
              onClick={() => {
                onBackClick();
              }}>
              Back
            </Button>
          </Card.Footer>
        </Card>
      </Container>
    );
  }
}
DirectorView.propTypes = {
  director: PropTypes.shape({
    Name: PropTypes.string.isRequired,
    Bio: PropTypes.string.isRequired,
  }).isRequired,
};