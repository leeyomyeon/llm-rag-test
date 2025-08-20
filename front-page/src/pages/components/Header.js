import React from 'react';
import { Container, Nav, Navbar, NavDropdown }from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

const path = "/llm-rag-test"

const Header = () => {
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand>React-Bootstrap</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={NavLink} to={`${path}/home`}>Home</Nav.Link>
            <Nav.Link as={NavLink} to={`${path}/counter`}>Sample Page</Nav.Link>
            <Nav.Link as={NavLink} to={`${path}/ragChat`}>LLM + RAG Chatbot</Nav.Link>
            <Nav.Link as={NavLink} to={`${path}/llmChat`}>LLM Chatbot</Nav.Link>
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
  )
}

export default Header;



