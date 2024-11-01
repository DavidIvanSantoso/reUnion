import { Card, CardBody, Container, Row } from "react-bootstrap";
import "../AdminPanel/AdminDashboard.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useEffect, useState } from "react";
import SideBarAdmin from "../AdminPanel/SidebarAdmin";

import { useDispatch, useSelector } from "react-redux";
import { postScoringEp, resetPostStatus } from "../redux/slices/scoringSlice";

function AdminDashboard() {
  //dispatch ini buat redux
  const dispatch = useDispatch();
  const { postSuccess, postError } = useSelector((state) => state.scoring); // Adjust based on your state shape

  const [date, setSelectedDate] = useState(null);
  const [title, setScoringTitle] = useState("");
  const [location, setLocation] = useState("Timezone GM 1");
  const [time, setTime] = useState("");
  const [scoringtype, setScoringType] = useState("Single");

  const handleFormInput = async (e) => {
    e.preventDefault();
    // Bikin struct JSON dari data yg dimau
    const scoringEpData = {
      title,
      location,
      time,
      scoringtype,
      date,
    };
    console.log("SCORING TYPE", scoringEpData.scoringtype);
    await dispatch(postScoringEp(scoringEpData));
  };

  useEffect(() => {
    if (postSuccess) {
      alert("Form Submit Success");
      dispatch(resetPostStatus());
    }
    if (postError) {
      alert("Error Submit");
      dispatch(resetPostStatus());
    }
  });
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
                    <Form onSubmit={handleFormInput}>
                      <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Scoring Title</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Enter Title"
                          value={title}
                          onChange={(e) => setScoringTitle(e.target.value)}
                        />
                      </Form.Group>

                      <Form.Group>
                        <Form.Label>Select a Date 📅</Form.Label>
                        <Row className="px-2">
                          <DatePicker
                            selected={date}
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
                          <option value="Timezone GM 1">Timezone GM 1</option>
                          <option value="Timezone GM 3">Timezone GM 3</option>
                          <option value="Happy Time GM 2">
                            Happy Time GM 2
                          </option>
                          <option value="Happy Time CW">Happy Time CW</option>
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
                          value={scoringtype}
                          onChange={(e) => setScoringType(e.target.value)}
                        >
                          <option value={"Single"}>Single</option>
                          <option value={"Double"}>Double</option>
                        </Form.Select>
                      </Form.Group>
                      <Button variant="primary" type="submit" className="mt-3">
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
