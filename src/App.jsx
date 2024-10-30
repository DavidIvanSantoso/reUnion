import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

//pages
import LandingPage from "./LandingPage/LandingPage";
import Scoring from "./Scoring/Scoring";
import Footer from "./Footer/Footer";
import Login from "./AdminPanel/LoginForm";
import Admin from "./AdminPanel/AdminDashboard";
import AdminScoringMember from "./AdminPanel/InputScoringMember";
function App() {
  return (
    <>
      <Router>
        <div className="d-flex flex-column min-vh-100">
          <div className="flex-fill">
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/scoring" element={<Scoring />} />
              <Route path="/login" element={<Login />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/admin/scoring" element={<AdminScoringMember />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </Router>
      {/* <LandingPage></LandingPage> */}
    </>
  );
}

export default App;
