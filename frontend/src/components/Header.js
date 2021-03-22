import React from 'react'
import { Navbar, Nav, Container } from 'react-bootstrap'
import { ShoppingCart, LogIn } from 'react-feather'

const Header = () => {
  return (
    <header>
      <Navbar bg='dark' variant='dark' expand='md' collapseOnSelect>
        <Container>
          <Navbar.Brand href='/'>CANALU</Navbar.Brand>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='ml-auto'>
              <Nav.Link href='/cart'>
                <ShoppingCart size={14} style={{ margin: '0 6px 3px 0' }} />
                Cart
              </Nav.Link>
              <Nav.Link href='/login'>
                <LogIn size={16} style={{ margin: '0 6px 3px 0' }} />
                Sign In
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  )
}

export default Header
