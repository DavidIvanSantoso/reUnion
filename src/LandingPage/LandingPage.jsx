import { Container, Row, Col, Button, Card, Carousel } from "react-bootstrap";
import "../LandingPage/LandingPage.css";
import logo from "../assets/unionlogo.png";
import NavbarTop from "../Navbar/Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGamepad, faPerson, faBook } from "@fortawesome/free-solid-svg-icons";
//GC Img
import htCW from "../assets/htcw.jpg";
import tZ1 from "../assets/tz1.jpg";
import tZ3 from "../assets/tz3.jpg";
//album
import img1 from "../assets/album/img1.jpg";
import img2 from "../assets/album/img2.jpg";
import img3 from "../assets/album/img3.jpg";

function LandingPage() {
  const scrollToAboutPage = () => {
    const element = document.getElementById("about-page");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };
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
            <Button onClick={scrollToAboutPage} className="learn-more-btn">
              Learn More!
            </Button>
          </Col>
        </Row>
      </div>
      <div className="about-page px-3 pt-3" id="about-page">
        <Row>
          <Col md={6} className="pt-3 ">
            <h1>About Us!</h1>
            <p>
              We are one of the Pump It Up communities in Surabaya, where this
              community aims to bring together Pump It Up players to play
              together, improve their playing skills, and expand their
              connections.
            </p>
            <span className="badge bg-success me-2">21•05•2023 ~</span>
          </Col>

          <Col md={6} className="text-center pt-3">
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
      <div className="basecamp-page pt-5 px-3">
        <h1 className="text-center">Our Playground!</h1>
        <Row className="pt-3 justify-content-center">
          <Col md={4} xs={12} className="pb-3">
            <Card>
              <Card.Img className="card-img" variant="top" src={tZ1} />
              <Card.Body>
                <Card.Title>Timezone Galaxy Mall 1</Card.Title>
                <Card.Text>
                  Address: Jl. Dr. Ir. H. Soekarno 35-39, Mulyorejo, Surabaya,
                  East Java 60115
                </Card.Text>
                <Button
                  variant="primary"
                  onClick={() =>
                    window.open(
                      "https://maps.app.goo.gl/1nzPX2Z4CGEPJ45C7",
                      "_blank"
                    )
                  }
                >
                  Open Google Maps!
                </Button>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4} xs={12} className="pb-3">
            <Card>
              <Card.Img className="card-img" variant="top" src={tZ3} />
              <Card.Body>
                <Card.Title>Timezone Galaxy Mall 3</Card.Title>
                <Card.Text>
                  Address: Galaxy Mall, Jl. Dharmahusada Indah Timur No.37 Lt.
                  3, Mulyorejo, Kec. Mulyorejo, Surabaya, Jawa Timur 60115
                </Card.Text>
                <Button
                  variant="primary"
                  onClick={() =>
                    window.open(
                      "https://maps.app.goo.gl/vdvTZ7sz3wiHLgRJ9",
                      "_blank"
                    )
                  }
                >
                  Open Google Maps!
                </Button>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4} xs={12} className="pb-3">
            <Card>
              <Card.Img className="card-img" variant="top" src={htCW} />
              <Card.Body>
                <Card.Title>Happy Time Ciputra World</Card.Title>
                <Card.Text>
                  Address: Jalan M Sungkono No.89, Gn. Sari, Kec. Dukuhpakis,
                  Surabaya, Jawa Timur 60224
                </Card.Text>
                <Button
                  variant="primary"
                  onClick={() =>
                    window.open(
                      "https://maps.app.goo.gl/jK88SzGShSPdYwx79",
                      "_blank"
                    )
                  }
                >
                  Open Google Maps!
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
      <div
        className="gallery pt-3 px-3 align-items-center"
        style={{ backgroundColor: "black", color: "white" }}
      >
        <Row className="text-center py-3">
          <h1>Gallery!</h1>
        </Row>
        <Row>
          <Carousel className="pb-5">
            <Carousel.Item>
              <img src={img1} className="d-block w-100"></img>
            </Carousel.Item>
            <Carousel.Item>
              <img src={img2} className="d-block w-100"></img>
            </Carousel.Item>
            <Carousel.Item>
              <img src={img3} className="d-block w-100"></img>
            </Carousel.Item>
          </Carousel>
        </Row>
      </div>
    </Container>
  );
}
export default LandingPage;
