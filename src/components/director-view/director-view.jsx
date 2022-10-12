import React from 'react';
// import { Link } from 'react-router-dom';
import { Container, Card, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
// import { BrowserRouter as Router } from 'react-router-dom';
import './director-view.scss';


export class DirectorView extends React.Component {

  render() {
    const { director, onBackClick } = this.props;

    return (
      // <Router>
      <Container>
        <Card className='dir-view'>
          <Card.Header className='dir-view-header'>Director</Card.Header>
          <Card.Body className='dir-view-title'>{director.Name}</Card.Body>
          <Card.Body>{director.Description}</Card.Body>
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
      // </Router>
    );
  }
}
DirectorView.propTypes = {
  Director: PropTypes.shape({
    Name: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
  }).isRequired,
};