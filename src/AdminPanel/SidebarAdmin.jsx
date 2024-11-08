import { Container, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

function SidebarAdmin() {
  return (
    <Container>
      <Nav className="flex-column" style={{ height: "100%", color: "white" }}>
        <Nav.Link as={Link} to="/admin" className="text-light">
          Scoring
        </Nav.Link>
        <Nav.Link as={Link} to="/admin/scoring" className="text-light">
          Scoring Member
        </Nav.Link>
        <Nav.Link as={Link} to="/admin/song" className="text-light">
          Song Input
        </Nav.Link>
        {/* <Nav.Link as={Link} to="/services" className="text-light">
          Services
        </Nav.Link>
        <Nav.Link as={Link} to="/contact" className="text-light">
          Contact
        </Nav.Link> */}
        {/* Add more links as needed */}
      </Nav>
    </Container>
  );
}
export default SidebarAdmin;
