import { Container, Row, Col } from "react-bootstrap";
import "./Footer.css"; // Optional: for custom styles
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";

function Footer() {
  return (
    <footer className="bg-dark text-white py-4">
      <Container>
        <Row>
          <Col md={6} className="text-center">
            <h5>About Us</h5>
            <p>Just an ordinary Pump It Up Community</p>
          </Col>
          {/* <Col md={4} className="text-center">
            <h5>Quick Links</h5>
            <ul className="list-unstyled">
              <li>
                <a href="#home" className="text-white">
                  Home
                </a>
              </li>
              <li>
                <a href="#gallery" className="text-white">
                  Gallery
                </a>
              </li>
              <li>
                <a href="#scoring" className="text-white">
                  Scoring
                </a>
              </li>
            </ul>
          </Col> */}
          <Col md={6} className="text-center">
            <h5>Contact Us</h5>
            <a
              href="https://www.instagram.com/piu.reunion"
              className="text-white"
            >
              <FontAwesomeIcon icon={faInstagram} /> piu.reunion
            </a>
            <p>Whatsapp: 111111111111</p>
          </Col>
        </Row>
        <Row className="text-center mt-3">
          <Col>
            <p>
              &copy; {new Date().getFullYear()} Re:UNION. All rights reserved.
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}
export default Footer;
