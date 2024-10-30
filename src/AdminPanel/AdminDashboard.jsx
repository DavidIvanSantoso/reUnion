import { Card, CardBody, Container, Row } from "react-bootstrap";
import "../AdminPanel/AdminDashboard.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";
import SideBarAdmin from "../AdminPanel/SidebarAdmin";
import axios from "axios";

function AdminDashboard() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [scoringTitle, setScoringTitle] = useState("");
  const [location, setLocation] = useState("");
  const [time, setTime] = useState("");
  const [scoringType, setScoringType] = useState("");

  const handleFormInput = async (e) => {
    e.preventDefault();

    try {
      // Send form data to the server
      const response = await axios.post("https://api.example.com/submit", {
        scoringTitle,
        location,
        time,
        scoringType,
        selectedDate,
      });

      // Handle the response
      if (response.status === 200) {
        console.log("Form submitted successfully:", response.data);
        alert("Form submitted successfully!");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("There was an error submitting the form.");
    }
  };
  return (
    <Container fluid className="p-0">
      <div
        className="d-flex"
        style={{ height: "80vh", padding: "0%", margin: "0%" }}
      >
        <div
          className="navbar-container"
          style={{
            width: "250px",
            backgroundColor: "black",
            padding: "0%",
            margin: "0%",
          }}
        >
          <SideBarAdmin></SideBarAdmin>
        </div>

        <div
          className="content-container"
          style={{
            flex: 1,
            padding: "20px",
          }}
        >
          <div className="add-alert-scoring">
            <Row>
              <h1>Alert Scoring!</h1>
              <div className="form-alert-scoring">
                <Card>
                  <CardBody>
                    <Form>
                      <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Scoring Title</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Enter Title"
                          value={scoringTitle}
                          onChange={(e) => setScoringTitle(e.target.value)}
                        />
                      </Form.Group>

                      <Form.Group>
                        <Form.Label>Select a Date 📅</Form.Label>
                        <Row className="px-2">
                          <DatePicker
                            selected={selectedDate}
                            onChange={(date) => setSelectedDate(date)}
                            className="form-control" // Add Bootstrap styling
                            placeholderText="Select a date"
                          />
                        </Row>
                      </Form.Group>
                      <Form.Group className="mb-3 mt-3">
                        <Form.Label>Location 📍</Form.Label>
                        <Form.Select
                          value={location}
                          onChange={(e) => setLocation(e.target.value)}
                        >
                          <option>Timezone GM 1</option>
                          <option>Timezone GM 3</option>
                          <option>Happy Time GM 2</option>
                          <option>Happy Time CW</option>
                        </Form.Select>
                      </Form.Group>
                      <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Time 🕙</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Enter Time"
                          value={time}
                          onChange={(e) => setTime(e.target.value)}
                        />
                      </Form.Group>
                      <Form.Group className="mb-3 mt-3">
                        <Form.Label>Scoring Type</Form.Label>
                        <Form.Select
                          value={scoringType}
                          onChange={(e) => setScoringType(e.target.value)}
                        >
                          <option>Single</option>
                          <option>Double</option>
                        </Form.Select>
                      </Form.Group>
                      <Button
                        variant="primary"
                        type="submit"
                        className="mt-3"
                        onClick={handleFormInput}
                      >
                        Submit
                      </Button>
                    </Form>
                  </CardBody>
                </Card>
              </div>
            </Row>
          </div>
        </div>
      </div>
    </Container>
  );
}
export default AdminDashboard;
