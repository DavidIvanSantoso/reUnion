import { Card, Container, Row, Col, Form } from "react-bootstrap";
import NavbarTop from "../Navbar/Navbar";
import "../Scoring/Scoring.css";
import DataTable from "react-data-table-component";

import { useEffect, useState } from "react";

//redux
import { useDispatch, useSelector } from "react-redux";
import {
  getUpcomingScoring,
  getScoringResultLastEpisode,
  getAllScoringEp,
  getScoringResultByEpisode,
} from "../redux/slices/scoringSlice.js";

function Scoring() {
  // const [upcomingScoring, setUpcomingScoring] = useState(null);
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState(null);
  const [scoringEpID, setscoringEpID] = useState("");
  const dispatch = useDispatch();
  const {
    upcomingScoring,
    scoringResultLastEp,
    loading,
    error,
    scoringEp,
    scoringResultByEpId,
  } = useSelector((state) => state.scoring);

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

  //get UpcomingScoring using redux
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

              <span className="badge bg-success me-2">Novice (S8-S11)</span>
              <span className="badge bg-warning me-2">
                Intermediate (S12 - S14)
              </span>
              <span className="badge bg-danger me-2">Advanced (S15 - S17)</span>
              <span className="badge bg-dark me-2">Expert (S18 - S20)</span>
            </Card.Body>
          </Card>
        </Row>
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
