import { useState, useEffect } from "react";

function Interview() {
  const [data, setData] = useState({
    Completed: [],
    Ongoing: [],
    "Not Started": [],
  });
  const [activeTab, setActiveTab] = useState("Completed");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const BASE_URL = "http://10.0.0.248:8080/api/interviews";

  // fetch all 3 datasets in parallel
  useEffect(() => {
    async function fetchAll() {
      setLoading(true);
      setError("");

      try {
        const endpoints = {
          Completed: `${BASE_URL}/completed`,
          Ongoing: `${BASE_URL}/ongoing`,
          "Not Started": `${BASE_URL}/not started`,
        };

        // parallel requests
        const [completedRes, ongoingRes, notStartedRes] = await Promise.all([
          fetch(endpoints.Completed),
          fetch(endpoints.Ongoing),
          fetch(endpoints["Not Started"]),
        ]);

        if (!completedRes.ok || !ongoingRes.ok || !notStartedRes.ok) {
          throw new Error("Failed to fetch one or more datasets");
        }

        const [completed, ongoing, notStarted] = await Promise.all([
          completedRes.json(),
          ongoingRes.json(),
          notStartedRes.json(),
        ]);

        setData({ Completed: completed, Ongoing: ongoing, "Not Started": notStarted });
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Unable to load interview data. Please try again.");
      } finally {
        setLoading(false);
      }
    }

    fetchAll();
  }, []);

  // choose dataset to render
  const getActiveData = () => data[activeTab] || [];

  // dynamic headers
  const renderTableHeaders = () => {
    if (activeTab === "Completed") {
      return (
        <tr>
          <th>Candidate Name</th>
          <th>Email</th>
          <th>Phone</th>
          <th>Recruiter</th>
          <th>Interview Time</th>
          <th>Resume Match</th>
          <th>Score</th>
          <th>Verdict</th>
        </tr>
      );
    } else {
      return (
        <tr>
          <th>Candidate Name</th>
          <th>Email</th>
          <th>Phone</th>
          <th>Recruiter</th>
          <th>Interview Time</th>
          <th>Resume Match</th>
        </tr>
      );
    }
  };

  // render table rows
  const renderTableRows = () => {
    const rows = getActiveData();

    if (!rows.length) {
      return (
        <tr>
          <td colSpan={activeTab === "Completed" ? 8 : 6}>
            {loading ? "Loading..." : "No records found."}
          </td>
        </tr>
      );
    }

    return rows.map((row, idx) => (
      <tr key={idx}>
        <td>{row.candidate_name}</td>
        <td>{row.candidate_email}</td>
        <td>{row.candidate_phone}</td>
        <td>{row.recruiter_name}</td>
        <td>{row.interview_time}</td>
        <td>{row.resume_match_score}%</td>
        {activeTab === "Completed" && (
          <>
            <td>{row.interview_score}</td>
            <td>{row.interview_verdict}</td>
          </>
        )}
      </tr>
    ));
  };

  return (
    <div className="interview-container">
      <h2>Interview Overview</h2>

      {/* Tabs */}
      <div className="tabs">
        {["Completed", "Ongoing", "Not Started"].map((tab) => (
          <button
            key={tab}
            className={`tab-btn ${activeTab === tab ? "active" : ""}`}
            onClick={() => setActiveTab(tab)}
            disabled={loading}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Error message */}
      {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}

      {/* Table */}
      <div className="table-container">
        <table>
          <thead>{renderTableHeaders()}</thead>
          <tbody>{renderTableRows()}</tbody>
        </table>
      </div>
    </div>
  );
}

export default Interview;
