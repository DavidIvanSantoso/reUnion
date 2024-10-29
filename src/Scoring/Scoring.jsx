import { Container, Row } from "react-bootstrap";
import NavbarTop from "../Navbar/Navbar";

function Scoring() {
  return (
    <Container fluid>
      <div className="navbar">
        <Row>
          <NavbarTop></NavbarTop>
        </Row>
      </div>
      <div className="upcoming-scoring">
        <Row>
          <h1>Next Scoring!</h1>
        </Row>
      </div>
    </Container>
  );
}
export default Scoring;
