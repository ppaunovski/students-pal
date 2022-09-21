import React from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Offcanvas from "react-bootstrap/Offcanvas";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

function Navigation() {
  const { currentUser } = useAuth();
  return (
    <>
      {[false, "sm", "md", "lg", "xl", "xxl"].map((expand) => (
        <Navbar
          key={expand}
          bg="light"
          expand={expand}
          className="mb-3"
          fixed="top"
        >
          <Container fluid>
            <Navbar.Brand>
              {" "}
              <Link to="/">Student's Pal</Link>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-${expand}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
              placement="end"
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                  Student's Pal
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav className="justify-content-end flex-grow-1 pe-3">
                  <Nav.Link>
                    <Link to="/profile" state={{ profile: currentUser.email }}>
                      Profile
                    </Link>
                  </Nav.Link>
                  <Nav.Link>
                    <Link to="/forum">Forum</Link>
                  </Nav.Link>
                  <Nav.Link>
                    <Link to="/semesters">Semesters</Link>
                  </Nav.Link>
                  {/* <NavDropdown
                    title="Semesters"
                    id={`offcanvasNavbarDropdown-expand-${expand}`}
                  >
                    <NavDropdown.Item>
                      <Link to="/semesters">Semester 1</Link>
                    </NavDropdown.Item>
                    <NavDropdown.Item>
                      <Link to="/semesters">Semester 2</Link>
                    </NavDropdown.Item>
                    <NavDropdown.Item>
                      <Link to="/semesters">Semester 3</Link>
                    </NavDropdown.Item>
                    <NavDropdown.Item>
                      <Link to="/semesters">Semester 4</Link>
                    </NavDropdown.Item>
                    <NavDropdown.Item>
                      <Link to="/semesters">Semester 5</Link>
                    </NavDropdown.Item>
                    <NavDropdown.Item>
                      <Link to="/semesters">Semester 6</Link>
                    </NavDropdown.Item>
                    <NavDropdown.Item>
                      <Link to="/semesters">Semester 7</Link>
                    </NavDropdown.Item>
                    <NavDropdown.Item>
                      <Link to="/semesters">Semester 8</Link>
                    </NavDropdown.Item>
                  </NavDropdown> */}
                </Nav>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      ))}
    </>
  );
}

export default Navigation;
