import React from 'react';
import logo from './images/myflix.png';
import { Menu, Navbar, Nav, Button } from 'react-bootstrap';

import './navbar.scss';

export function Menu({ user }) {
  const onLoggedOut = () => {
    localStorage.clear();
    window.open('/', '_self');
  };

  const isAuth = () => {
    if (typeof window == 'undefined') {
      return false;
    }
    if (localStorage.getItem('token')) {
      return localStorage.getItem('token');
    } else {
      return false;
    }
  };

  return (
    <Navbar style={{ width: '100%' }} className='navbar' expand='lg'>
      <Navbar.Brand className='navbar-logo' href='/'>
        <img src={logo} alt='logo' className='logo' />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls='basic-navbar-nav' />
      <Navbar.Collapse id='basic-navbar-nav'>
        <Nav className='ml-auto'>
          {isAuth() && <Nav.Link style={{ color: 'white' }} href='/'>Home</Nav.Link>}
          {isAuth() && <Nav.Link style={{ color: 'white' }} href={`/users/${user}`}>{user}</Nav.Link>}

          {isAuth() && (
            <Button onClick={onLoggedOut}>
              Logout
            </Button>
          )}
          {!isAuth() && <Nav.Link href='/'>Sign-in</Nav.Link>}
          {!isAuth() && <Nav.Link href='/register'>Sign-up</Nav.Link>}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}