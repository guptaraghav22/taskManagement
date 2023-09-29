import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

import React from "react";

function Navbars() {
  return (
    <Navbar bg="dark" variant="dark">
      <Navbar.Brand href="http://localhost:3000/">Task Management</Navbar.Brand>
      <Nav className="ml-auto">
        <Nav.Link href="http://localhost:3000/">Home</Nav.Link>
      </Nav>
    </Navbar>
  );
}

export default Navbars;
