import React from 'react';
import ReactDOMClient from 'react-dom/client';
import Container from 'react-bootstrap/Container';
import MainView from './components/main-view/main-view';
import './index.scss';

// Main component (will eventually use all the others)
class MyFlixApplication extends React.Component {
  render() {
    return (
      <Container>
        <MainView />
      </Container>
    );
  }
}

// Finds the root of your app
const container = document.getElementsByClassName('app-container')[0];

const root = ReactDOMClient.createRoot(container);
root.render(<MyFlixApplication />);
// Tells React to render your app in the root DOM element
// ReactDOM.createRoot((MyFlixApplication), container);