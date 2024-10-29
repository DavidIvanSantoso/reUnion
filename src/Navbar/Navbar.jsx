import { Container, Navbar, NavbarCollapse } from "react-bootstrap";
import Nav from "react-bootstrap/Nav";
import logo from "../assets/unionlogo.png";
import "../Navbar/Navbar.css";
function NavbarTop() {
  return (
    <>
      <Navbar bg="black" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand href="#home" className="d-flex align-items-center">
            <img
              src={logo}
              width="50px"
              height="50px"
              className="d-inline-block align-center"
              alt="reUnionlogo"
            />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <NavbarCollapse className="justify-content-end">
            <Nav>
              <Nav.Link href="#home" className="nav-link-custom">
                Home
              </Nav.Link>
              <Nav.Link href="#features" className="nav-link-custom">
                Gallery
              </Nav.Link>
              <Nav.Link href="#pricing" className="nav-link-custom">
                Scoring
              </Nav.Link>
            </Nav>
          </NavbarCollapse>
        </Container>
      </Navbar>
    </>
  );
}
export default NavbarTop;
