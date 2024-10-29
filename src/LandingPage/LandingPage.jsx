import { Container, Row, Col, Button } from "react-bootstrap";
import "../LandingPage/LandingPage.css";
import logo from "../assets/unionlogo.png";
import NavbarTop from "../Navbar/Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGamepad, faPerson, faBook } from "@fortawesome/free-solid-svg-icons";

function LandingPage() {
  return (
    <Container fluid className="box-container">
      <Row className="navbar">
        <NavbarTop />
      </Row>
      <div className="landing-page-container">
        <Row className="landing-page-content align-items-center">
          <Col md={6} lg={4} className="text-center">
            <img src={logo} alt="Logo" className="logo" />
            <h1 className="title">Re:UNION</h1>
            <h2 className="subtitle">Pump It Up Community from Surabaya</h2>
            <Button className="learn-more-btn">Learn More!</Button>
          </Col>
        </Row>
      </div>
      <div className="about-page px-3" id="about-page">
        <Row>
          <Col md={6}>
            <h1>About Us!</h1>
            <p>
              We are one of the Pump It Up communities in Surabaya, where this
              community aims to bring together Pump It Up players to play
              together, improve their playing skills, and expand their
              connections.
            </p>
            <p>21•05•2023</p>
          </Col>
          <Col md={6}>
            <h1>Goals</h1>
            <div className="goals-icon">
              <div className="icon-container">
                <div
                  className="icon-circle"
                  style={{ backgroundColor: "#4caf50" }} // Green
                >
                  <FontAwesomeIcon icon={faGamepad} size="2xl" />
                </div>
                <h3 className="icon-title">Game</h3> {/* Title for Game Icon */}
              </div>

              <div className="icon-container">
                <div
                  className="icon-circle"
                  style={{ backgroundColor: "#ff5722" }} // Orange
                >
                  <FontAwesomeIcon icon={faBook} size="2xl" />
                </div>
                <h3 className="icon-title">Learn</h3>{" "}
                {/* Title for Book Icon */}
              </div>

              <div className="icon-container">
                <div
                  className="icon-circle"
                  style={{ backgroundColor: "#2196f3" }} // Blue
                >
                  <FontAwesomeIcon icon={faPerson} size="2xl" />
                </div>
                <h3 className="icon-title">Connection</h3>{" "}
                {/* Title for Person Icon */}
              </div>
            </div>
          </Col>
        </Row>
      </div>
      <div className="basecamp-page">
        <Row></Row>
      </div>
    </Container>
  );
}
export default LandingPage;
