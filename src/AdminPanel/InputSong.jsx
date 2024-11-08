import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Card,
  CardBody,
} from "react-bootstrap";
import { useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { getAllScoringEp } from "../redux/slices/scoringSlice";
import { postSong } from "../redux/slices/songSlice";

import SideBarAdmin from "../AdminPanel/SidebarAdmin";

function InputScoring() {
  //song input
  const [noviceLink1, setNoviceLink1] = useState("");
  const [noviceLink2, setNoviceLink2] = useState("");
  const [intermediateLink1, setIntermediateLink1] = useState("");
  const [intermediateLink2, setIntermediateLink2] = useState("");
  const [advancedLink1, setAdvancedLink1] = useState("");
  const [advancedLink2, setAdvancedLink2] = useState("");
  const [expertLink1, setExpertLink1] = useState("");
  const [expertLink2, setExpertLink2] = useState("");
  const [scoringep_id, setScoringEp] = useState("");
  //redux
  const dispatch = useDispatch();
  const { scoringEp } = useSelector((state) => state.scoring);
  //link-parser
  const LinkParse = (url) => {
    const urlObj = new URL(url);
    return urlObj.searchParams.get("v");
  };
  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent page refresh on form submit

    const songData = [
      {
        scoringep_id: scoringep_id,
        kategori: "Novice",
        linksong: LinkParse(noviceLink1),
      },
      {
        scoringep_id: scoringep_id,
        kategori: "Novice",
        linksong: LinkParse(noviceLink2),
      },
      {
        scoringep_id: scoringep_id,
        kategori: "Intermediate",
        linksong: LinkParse(intermediateLink1),
      },
      {
        scoringep_id: scoringep_id,
        kategori: "Intermediate",
        linksong: LinkParse(intermediateLink2),
      },
      {
        scoringep_id: scoringep_id,
        kategori: "Advanced",
        linksong: LinkParse(advancedLink1),
      },
      {
        scoringep_id: scoringep_id,
        kategori: "Advanced",
        linksong: LinkParse(advancedLink2),
      },
      {
        scoringep_id: scoringep_id,
        kategori: "Expert",
        linksong: LinkParse(expertLink1),
      },
      {
        scoringep_id: scoringep_id,
        kategori: "Expert",
        linksong: LinkParse(expertLink2),
      },
    ];
    console.log("SONG DATA", songData);
    await dispatch(postSong(songData));
  };

  //fetch data dari redux
  useEffect(() => {
    dispatch(getAllScoringEp()); // Dispatch the action to fetch data
  }, [dispatch]);

  return (
    <Container fluid className="p-0">
      <div
        className="d-flex"
        style={{ height: "100vh", padding: "0%", margin: "0%" }}
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
          <Row className="mx-1">
            <h1>Song Input</h1>
            <Card>
              <CardBody>
                <Form onSubmit={handleSubmit} className="scoring-input">
                  <Form.Group className="mb-3 ">
                    <Form.Label>Scoring Episode</Form.Label>
                    <Form.Select
                      value={scoringep_id}
                      onChange={(e) => setScoringEp(parseInt(e.target.value))} // Ensure this converts the value to an integer
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
                  <Row>
                    <p>Novice Song!</p>
                    <Col>
                      <Form.Group className="mb-3" controlId="noviceSong1">
                        <Form.Label>Link Song 1</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Enter Song 1"
                          value={noviceLink1}
                          onChange={(e) => setNoviceLink1(e.target.value)}
                        />
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group className="mb-3" controlId="noviceSong2">
                        <Form.Label>Link Song 2</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Enter Song 2"
                          value={noviceLink2}
                          onChange={(e) => setNoviceLink2(e.target.value)}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <p>Intermediate Song!</p>
                    <Col>
                      <Form.Group
                        className="mb-3"
                        controlId="intermediateSong1"
                      >
                        <Form.Label>Link Song 1</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Enter Song 1"
                          value={intermediateLink1}
                          onChange={(e) => setIntermediateLink1(e.target.value)}
                        />
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group
                        className="mb-3"
                        controlId="intermediateSong2"
                      >
                        <Form.Label>Link Song 2</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Enter Song 2"
                          value={intermediateLink2}
                          onChange={(e) => setIntermediateLink2(e.target.value)}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <p>Advanced Song!</p>
                    <Col>
                      <Form.Group className="mb-3" controlId="advancedSong1">
                        <Form.Label>Link Song 1</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Enter Song 1"
                          value={advancedLink1}
                          onChange={(e) => setAdvancedLink1(e.target.value)}
                        />
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group className="mb-3" controlId="advancedSong2">
                        <Form.Label>Link Song 2</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Enter Song 2"
                          value={advancedLink2}
                          onChange={(e) => setAdvancedLink2(e.target.value)}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <p>Expert Song!</p>
                    <Col>
                      <Form.Group className="mb-3" controlId="expertSong1">
                        <Form.Label>Link Song 1</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Enter Song 1"
                          value={expertLink1}
                          onChange={(e) => setExpertLink1(e.target.value)}
                        />
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group className="mb-3" controlId="expertSong2">
                        <Form.Label>Link Song 2</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Enter Song 2"
                          value={expertLink2}
                          onChange={(e) => setExpertLink2(e.target.value)}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Button variant="primary" type="submit">
                    Submit
                  </Button>
                </Form>
              </CardBody>
            </Card>
          </Row>
        </div>
      </div>
    </Container>
  );
}
export default InputScoring;
