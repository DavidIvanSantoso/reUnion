import { Card, Container, Row } from "react-bootstrap";
import NavbarTop from "../Navbar/Navbar";
import "../Scoring/Scoring.css";
import DataTable from "react-data-table-component";
import { data } from "../assets/mockdata/scoring";

import { useEffect } from "react";

//redux
import { useDispatch, useSelector } from "react-redux";
import { getUpcomingScoring } from "../redux/slices/scoringSlice.js";

function Scoring() {
  // const [upcomingScoring, setUpcomingScoring] = useState(null);
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const { upcomingScoring, loading, error } = useSelector(
    (state) => state.scoring
  );

  //scoring-table
  const tableHeader = [
    {
      name: "Nama",
      selector: (row) => row.nama,
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
      selector: (row) => row.lagu1,
      sortable: true,
    },
    {
      name: "Lagu 2",
      selector: (row) => row.lagu2,
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
    dispatch(getUpcomingScoring()); // Dispatch the action to fetch data
  }, [dispatch]);

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
          <h3 className="pt-3">⚜ SCORING RE:UNION EP. 15 - SINGLE ⚜</h3>
        </Row>
        <Row>
          <DataTable
            columns={tableHeader}
            data={data}
            customStyles={customStylesTable}
            pagination
          ></DataTable>
        </Row>
      </div>
    </Container>
  );
}
export default Scoring;
