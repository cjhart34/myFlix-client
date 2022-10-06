import React from 'react';
import { Navbar, Container, Nav, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './navbar.scss';
import logo from './images/myflix.png';

export function NavBar() {
    let user = localStorage.getItem('user');

    const handleLogOut = (e) => {
        e.preventDefault();
        localStorage.clear();
        window.open('/', '_self');
        props.onLoggedOut(user);
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
        <Navbar collapseOnSelect expand='xxl' variant='dark' className='navbar'>
            <Container>
                <Navbar.Brand className='navbar-logo' href='/'>
                    <img src={logo} alt='logo' className='logo' />
                </Navbar.Brand>
                {/* <Navbar.Toggle aria-controls='responsive-navbar-nav' /> */}
                <Navbar.Collapse id='responsive-navbar-nav'>
                    <Nav className='me-auto'>
                        {isAuth() && (
                            <Nav.Link as={Link} to={`/users/${user}`}>
                                {user}
                            </Nav.Link>
                        )}<br></br>
                        {isAuth() && (
                            <Button className='ml-3' variant='link' onClick={handleLogOut}>
                                Logout
                            </Button>
                        )}
                        {!isAuth() && <Nav.Link href='/'>Sign in</Nav.Link>}
                        <br></br>
                        {!isAuth() && <Nav.Link href='/register'>Sign up</Nav.Link>}
                        <hr></hr>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}