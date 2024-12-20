import { Card, CardBody, Container, Row } from "react-bootstrap";
import "../AdminPanel/AdminDashboard.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "react-datepicker/dist/react-datepicker.css";
import { useState, useEffect } from "react";
import SidebarAdmin from "./SidebarAdmin";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getAllScoringEp } from "../redux/slices/scoringSlice";

function InputScoringMember() {
  const [namamember, setNama] = useState("");
  const [kategori, setKategori] = useState("Novice");
  const [skor1, setLagu1] = useState(null);
  const [skor2, setLagu2] = useState(null);
  const [totalskor, setTotalSkor] = useState("");
  const [scoringep_id, setScoringEp] = useState(1);

  //redux setting
  const dispatch = useDispatch();
  const { scoringEp } = useSelector((state) => state.scoring);

  const handleFormInput = async (e) => {
    e.preventDefault();
    const totalScore = parseFloat(skor1) + parseFloat(skor2);
    setTotalSkor(totalScore);
    try {
      // Send form data to the server
      const response = await axios.post("http://localhost:8080/addUserRes", {
        namamember,
        kategori,
        skor1,
        skor2,
        totalskor: totalScore,
        scoringep_id,
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
  //fetch data dari redux
  useEffect(() => {
    dispatch(getAllScoringEp()); // Dispatch the action to fetch data
  }, [dispatch]);

  return (
    <>
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
            <SidebarAdmin></SidebarAdmin>
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
                <h1>Scoring Member Result</h1>
                <div className="form-alert-scoring">
                  <Card>
                    <CardBody>
                      <Form onSubmit={handleFormInput}>
                        <Form.Group className="mb-3 ">
                          <Form.Label>Scoring Episode</Form.Label>
                          <Form.Select
                            value={scoringep_id}
                            onChange={(e) =>
                              setScoringEp(parseInt(e.target.value))
                            } // Ensure this converts the value to an integer
                          >
                            {(Array.isArray(scoringEp) ? scoringEp : []).map(
                              (episode) => (
                                <option
                                  key={episode.scoringep_id}
                                  value={episode.scoringep_id}
                                >
                                  {episode.scoringep_id} - {episode.title} -{" "}
                                  {episode.date}
                                </option>
                              )
                            )}
                          </Form.Select>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicEmail">
                          <Form.Label>Player Name</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Enter Name"
                            value={namamember}
                            onChange={(e) => setNama(e.target.value)}
                          />
                        </Form.Group>
                        <Form.Group className="mb-3 mt-3">
                          <Form.Label>Category</Form.Label>
                          <Form.Select
                            value={kategori}
                            onChange={(e) => setKategori(e.target.value)}
                          >
                            <option value="Novice">Novice</option>
                            <option value="Intermediate">Intermediate</option>
                            <option value="Advanced">Advanced</option>
                            <option value="Expert">Expert</option>
                          </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                          <Form.Label>Score 1:</Form.Label>
                          <Form.Control
                            type="number"
                            placeholder="Enter Score 1"
                            value={skor1}
                            onChange={(e) => setLagu1(parseInt(e.target.value))}
                          />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                          <Form.Label>Score 2:</Form.Label>
                          <Form.Control
                            type="number"
                            placeholder="Enter Score 1"
                            value={skor2}
                            onChange={(e) => setLagu2(parseInt(e.target.value))}
                          />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                          <Form.Label>Total Score:</Form.Label>
                          <Form.Control
                            type="number"
                            placeholder="Total Score"
                            value={totalskor}
                            disabled
                          />
                        </Form.Group>
                        <Button
                          variant="primary"
                          type="submit"
                          className="mt-3"
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
    </>
  );
}
export default InputScoringMember;
