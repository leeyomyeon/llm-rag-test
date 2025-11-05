import React from 'react';
import { Container, Nav, Navbar, NavDropdown, Image }from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import logo from './image/logo.svg';
import './Header.css';

const path = "/llm-rag-test"

const Header = () => {
  return (
    <>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand>
            <Image src={logo} alt="Logo" width="100" height="40" className="d-inline-block align-top" fluid />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={NavLink} to={`${path}/`} end>Home</Nav.Link>
              <Nav.Link as={NavLink} to={`${path}/counter`}>Sample Page</Nav.Link>
              <Nav.Link as={NavLink} to={`${path}/ragChat`}>LLM + RAG Chatbot</Nav.Link>
              <Nav.Link as={NavLink} to={`${path}/llmChat`}>LLM Chatbot</Nav.Link>
              <Nav.Link as={NavLink} to={`${path}/ImgComposit`}>이미지 합성</Nav.Link>
              <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                <NavDropdown.Item as={NavLink} to={`${path}/action/3.1`}>Action</NavDropdown.Item>
                <NavDropdown.Item as={NavLink} to={`${path}/action/3.2`}>
                    Another action
                </NavDropdown.Item>
                <NavDropdown.Item as={NavLink} to={`${path}/action/3.3`}>Something</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item as={NavLink} to={`${path}/action/3.4`}>
                    Separated link
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <div style={{ borderBottom: '2px solid #dee2e6ff', width: '100%' }} />
    </>
  )
}

export default Header;



