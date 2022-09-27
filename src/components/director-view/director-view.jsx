import React from 'react';
import './director-view.scss';
// import { Link } from 'react-router-dom';
import { Container, Card, Button } from 'react-bootstrap';
import propTypes from 'prop-types';
import { BrowserRouter as Router } from 'react-router-dom';


export class DirectorView extends React.Component {

  render() {
    const { director, onBackClick } = this.props;

    return (
      <Router>
        <Container className="my-3">
          <Card className="my-3">
            <Card.Body>

              <Card.Title>Director</Card.Title>

              <Card.Text>
                <span className="label">Name: </span>
                <span className="value">{director.Name}</span>
              </Card.Text>

              <Card.Text>
                <span className="label">Description: </span>
                <span className="value">{director.Description}</span>
              </Card.Text>

            </Card.Body>
          </Card>

          <Button variant="primary" onClick={() => { onBackClick(); }}>Back</Button>
        </Container>
      </Router>
    );
  }
}
DirectorView.propTypes = {
  director: propTypes.shape({
    Name: propTypes.string.isRequired,
    Description: propTypes.string.isRequired,
  }).isRequired,
};