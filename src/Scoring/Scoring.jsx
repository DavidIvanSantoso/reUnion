import {
  Card,
  Container,
  Row,
  Col,
  Form,
  Button,
  Modal,
  ModalBody,
} from "react-bootstrap";
import NavbarTop from "../Navbar/Navbar";
import "../Scoring/Scoring.css";
import DataTable from "react-data-table-component";
//youtube component
import YouTube from "react-youtube";

import { useEffect, useState } from "react";

//redux
import { useDispatch, useSelector } from "react-redux";
import {
  getUpcomingScoring,
  getScoringResultLastEpisode,
  getAllScoringEp,
  getScoringResultByEpisode,
} from "../redux/slices/scoringSlice.js";

import { getAllSongByEp } from "../redux/slices/songSlice.js";

function Scoring() {
  // const [upcomingScoring, setUpcomingScoring] = useState(null);
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState(null);

  //modal state
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleOpen = () => setShow(true);

  const [scoringEpID, setscoringEpID] = useState("");
  const dispatch = useDispatch();
  const {
    upcomingScoring,
    scoringResultLastEp,
    loading,
    error,
    scoringEp,
    scoringResultByEpId,
    songRes,
  } = useSelector((state) => ({ ...state.scoring, ...state.song }));

  // State for categorized songs
  const [noviceSongs, setNoviceSongs] = useState([]);
  const [intermediateSongs, setIntermediateSongs] = useState([]);
  const [advancedSongs, setAdvancedSongs] = useState([]);
  const [expertSongs, setExpertSongs] = useState([]);

  // Fetch and categorize songs
  useEffect(() => {
    if (songRes && songRes.length > 0) {
      setNoviceSongs(songRes.filter((song) => song.kategori === "Novice"));
      setIntermediateSongs(
        songRes.filter((song) => song.kategori === "Intermediate")
      );
      setAdvancedSongs(songRes.filter((song) => song.kategori === "Advanced"));
      setExpertSongs(songRes.filter((song) => song.kategori === "Expert"));
    }
  }, [songRes]);

  //scoring-table
  const tableHeader = [
    {
      name: "Nama",
      selector: (row) => row.namamember,
    },
    {
      name: "Kategori",
      selector: (row) => (
        <span
          className={`badge rounded-pill ${getKategoriColor(row.kategori)}`}
        >
          {row.kategori}
        </span>
      ),
    },
    {
      name: "Lagu 1",
      selector: (row) => row.skor1,
      sortable: true,
    },
    {
      name: "Lagu 2",
      selector: (row) => row.skor2,
      sortable: true,
    },
    {
      name: "Total Skor",
      selector: (row) => row.totalskor,
      sortable: true,
    },
  ];
  const getKategoriColor = (kategori) => {
    switch (kategori) {
      case "Expert":
        return "bg-dark";
      case "Novice":
        return "bg-success";
      case "Intermediate":
        return "bg-warning";
      case "Advanced":
        return "bg-danger";
    }
  };
  const customStylesTable = {
    rows: {
      style: {
        minHeight: "72px", // override the row height
        backgroundColor: "#gray", // row background color
        "&:hover": {
          backgroundColor: "#d3e3fd", // background color on hover
        },
      },
    },
    headCells: {
      style: {
        backgroundColor: "black", // header background color
        color: "white", // header text color
        fontSize: "18px", // font size for header
      },
    },
    cells: {
      style: {
        fontSize: "16px",
        paddingLeft: "8px", // cell padding
        paddingRight: "8px",
      },
    },
  };

  // //fetch Upcoming Scoring
  // const getUpcomingScoring = async () => {
  //   try {
  //     const response = await axios.get(
  //       "http://localhost:8080/getLastScoringEp"
  //     );
  //     setUpcomingScoring(response.data);
  //   } catch (err) {
  //     setError(err.message);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  //youtube config
  const onPlayerReady = (event) => {
    event.target.pauseVideo(); // The video will be paused on load (optional)
  };
  const opts = {
    height: "390",
    width: "100%",
    playerVars: {
      autoplay: 0, // Auto-play the video
    },
  };
  //get UpcomingScoring & Song using redux
  useEffect(() => {
    if (scoringEpID) {
      dispatch(getScoringResultByEpisode(scoringEpID));
    }
  }, [scoringEpID, dispatch]);

  useEffect(() => {
    dispatch(getUpcomingScoring());
    dispatch(getAllScoringEp());
    dispatch(getScoringResultLastEpisode());
  }, [dispatch]); // Run only once on component mount

  useEffect(() => {
    if (upcomingScoring && upcomingScoring.scoringep_id) {
      dispatch(getAllSongByEp(upcomingScoring.scoringep_id));
    }
  }, [dispatch, upcomingScoring]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  return (
    <Container fluid className="scoring-container">
      <div className="navbar-row">
        <NavbarTop></NavbarTop>
      </div>

      <div className="upcoming-scoring pt-3 px-5">
        <Row>
          <h1>Upcoming Scoring!</h1>
          <Card style={{ width: "100%" }} className="mt-3">
            <Card.Body>
              <Card.Title>
                ⚜ SCORING RE:UNION EP. {upcomingScoring.scoringep_id} -{" "}
                {upcomingScoring.scoringtype} ⚜
              </Card.Title>
              <p>📅 Date: {upcomingScoring.date}</p>
              <p>📍Location: {upcomingScoring.location}</p>
              <p>🕔 Time: {upcomingScoring.time}</p>

              <span className="badge bg-success me-2">Novice (D/S8-D/S11)</span>
              <span className="badge bg-warning me-2">
                Intermediate (D/S12 - D/S14)
              </span>
              <span className="badge bg-danger me-2">
                Advanced (D/S15 - D/S17)
              </span>
              <span className="badge bg-dark me-2">Expert (D/S18 - D/S20)</span>
              <div className="modal-button">
                <Button onClick={handleOpen} className="mt-3" variant="primary">
                  Check Song!
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Row>
      </div>

      {/* Modal */}
      <div className="modal show">
        <Modal show={show} onHide={handleClose} size="xl">
          <Modal.Header closeButton></Modal.Header>
          <ModalBody>
            {/* Novice Songs */}
            <Row>
              <h1>Novice Songs!</h1>
              {/* Divide into two columns */}
              <Col xs={12} md={6}>
                {/* First column */}
                {noviceSongs
                  .slice(0, Math.ceil(noviceSongs.length / 2))
                  .map((song, index) => (
                    <div key={index}>
                      <h3>Song {index + 1}:</h3>
                      <YouTube
                        videoId={song.linksong}
                        opts={opts}
                        onReady={onPlayerReady}
                        className="w-100"
                      />
                    </div>
                  ))}
              </Col>

              <Col xs={12} md={6}>
                {/* Second column */}
                {noviceSongs
                  .slice(Math.ceil(noviceSongs.length / 2))
                  .map((song, index) => (
                    <div key={index}>
                      <h3>
                        Song {index + 1 + Math.ceil(noviceSongs.length / 2)}:
                      </h3>
                      <YouTube
                        videoId={song.linksong}
                        opts={opts}
                        onReady={onPlayerReady}
                        className="w-100"
                      />
                    </div>
                  ))}
              </Col>
            </Row>

            {/* Intermediate Songs */}
            <Row>
              <h1>Intermediate Songs!</h1>
              {/* Divide into two columns */}
              <Col xs={12} md={6}>
                {/* First column */}
                {intermediateSongs
                  .slice(0, Math.ceil(intermediateSongs.length / 2))
                  .map((song, index) => (
                    <div key={index}>
                      <h3>Song {index + 1}:</h3>
                      <YouTube
                        videoId={song.linksong}
                        opts={opts}
                        onReady={onPlayerReady}
                        className="w-100"
                      />
                    </div>
                  ))}
              </Col>

              <Col xs={12} md={6}>
                {/* Second column */}
                {intermediateSongs
                  .slice(Math.ceil(intermediateSongs.length / 2))
                  .map((song, index) => (
                    <div key={index}>
                      <h3>
                        Song{" "}
                        {index + 1 + Math.ceil(intermediateSongs.length / 2)}:
                      </h3>
                      <YouTube
                        videoId={song.linksong}
                        opts={opts}
                        onReady={onPlayerReady}
                        className="w-100"
                      />
                    </div>
                  ))}
              </Col>
            </Row>

            {/* Advanced Songs */}
            <Row>
              <h1>Advanced Songs!</h1>
              {/* Divide into two columns */}
              <Col xs={12} md={6}>
                {/* First column */}
                {advancedSongs
                  .slice(0, Math.ceil(advancedSongs.length / 2))
                  .map((song, index) => (
                    <div key={index}>
                      <h3>Song {index + 1}:</h3>
                      <YouTube
                        videoId={song.linksong}
                        opts={opts}
                        onReady={onPlayerReady}
                        className="w-100"
                      />
                    </div>
                  ))}
              </Col>

              <Col xs={12} md={6}>
                {/* Second column */}
                {advancedSongs
                  .slice(Math.ceil(advancedSongs.length / 2))
                  .map((song, index) => (
                    <div key={index}>
                      <h3>
                        Song {index + 1 + Math.ceil(advancedSongs.length / 2)}:
                      </h3>
                      <YouTube
                        videoId={song.linksong}
                        opts={opts}
                        onReady={onPlayerReady}
                        className="w-100"
                      />
                    </div>
                  ))}
              </Col>
            </Row>

            {/* Expert Songs */}
            <Row>
              <h1>Expert Songs!</h1>
              {/* Divide into two columns */}
              <Col xs={12} md={6}>
                {/* First column */}
                {expertSongs
                  .slice(0, Math.ceil(expertSongs.length / 2))
                  .map((song, index) => (
                    <div key={index}>
                      <h3>Song {index + 1}:</h3>
                      <YouTube
                        videoId={song.linksong}
                        opts={opts}
                        onReady={onPlayerReady}
                        className="w-100"
                      />
                    </div>
                  ))}
              </Col>

              <Col xs={12} md={6}>
                {/* Second column */}
                {expertSongs
                  .slice(Math.ceil(expertSongs.length / 2))
                  .map((song, index) => (
                    <div key={index}>
                      <h3>
                        Song {index + 1 + Math.ceil(expertSongs.length / 2)}:
                      </h3>
                      <YouTube
                        videoId={song.linksong}
                        opts={opts}
                        onReady={onPlayerReady}
                        className="w-100"
                      />
                    </div>
                  ))}
              </Col>
            </Row>
          </ModalBody>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
      <div className="recent-result pt-5 px-5 mb-3">
        <Row>
          <h1>Recent Scoring Result!</h1>
          <Row className="pt-3">
            <Col xs={12} md={7}>
              {/* slalu cek dulu apakah data kosong ato nda  */}
              {scoringResultLastEp && scoringResultLastEp.length > 0 ? (
                <h4>
                  ⚜ SCORING RE:UNION EP {scoringEpID}
                  {scoringResultLastEp[0].scoringtype}⚜
                </h4>
              ) : (
                <h4 className="pt-3">Loading...</h4>
              )}
            </Col>
            <Col xs={12} md={5}>
              <Row>
                <Col>
                  <h5>Filter By Episode:</h5>
                </Col>
                <Col>
                  <Form.Group className="mb-3 ">
                    <Form.Select
                      value={scoringEpID}
                      onChange={(e) => setscoringEpID(parseInt(e.target.value))} // Ensure this converts the value to an integer
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
                </Col>
              </Row>
            </Col>
          </Row>
        </Row>
        <Row>
          <DataTable
            columns={tableHeader}
            data={
              scoringEpID === ""
                ? Array.isArray(scoringResultLastEp)
                  ? scoringResultLastEp
                  : []
                : Array.isArray(scoringResultByEpId)
                ? scoringResultByEpId
                : []
            }
            customStyles={customStylesTable}
            pagination
          ></DataTable>
        </Row>
      </div>
    </Container>
  );
}
export default Scoring;
