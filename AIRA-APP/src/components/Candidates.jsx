import React, { useState, useEffect } from "react";

function Candidates() {
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchCandidates() {
      setLoading(true);
      setError("");

      try {
        // ✅ if using local JSON file from public/
        const res = await fetch("/interview_candidates.json");
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();

        // optional: sort by resume match score descending
        const sorted = [...data].sort(
          (a, b) => b.resume_match_score - a.resume_match_score
        );

        setCandidates(sorted);
      } catch (err) {
        console.error("Error loading candidates:", err);
        setError("Failed to load candidate data.");
      } finally {
        setLoading(false);
      }
    }

    fetchCandidates();
  }, []);

  const renderTableRows = () => {
    if (!candidates.length)
      return (
        <tr>
          <td colSpan={8}>
            {loading ? "Loading..." : "No candidate records found."}
          </td>
        </tr>
      );

    return candidates.map((c, i) => (
      <tr key={i}>
        <td>{i + 1}</td>
        <td>{c.candidate_name}</td>
        <td>{c.candidate_email}</td>
        <td>{c.candidate_phone}</td>
        {/* <td>{c.recruiter_name}</td> */}
        <td>{c.resume_match_score}%</td>
        <td>{c.interview_score ?? "—"}</td>
        <td>{c.interview_verdict || "Pending"}</td>
      </tr>
    ));
  };

  return (
    <div className="candidates-container">
      <h2>Candidate Profiles</h2>

      {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Candidate Name</th>
              <th>Email</th>
              <th>Phone</th>
              {/* <th>Recruiter</th> */}
              <th>Resume Match</th>
              <th>Interview Score</th>
              <th>Verdict</th>
            </tr>
          </thead>
          <tbody>{renderTableRows()}</tbody>
        </table>
      </div>
    </div>
  );
}

export default Candidates;
