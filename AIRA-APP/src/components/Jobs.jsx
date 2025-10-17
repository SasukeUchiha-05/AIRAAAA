import React, { useEffect, useState } from "react";

function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      setError("");

      try {
        // ✅ Fetch from local JSON (or your API endpoint later)
        const res = await fetch("/interview_candidates.json");
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();

        // === Aggregate by job_name ===
        const jobMap = {};

        data.forEach((item) => {
          const job = item.job_name || "Unknown Job";

          if (!jobMap[job]) {
            jobMap[job] = {
              job_name: job,
              total: 0,
              completed: 0,
              ongoing: 0,
              notStarted: 0,
            };
          }

          jobMap[job].total++;

          // classification logic (same as Interview.jsx)
          if (item.interview_score !== null && item.interview_verdict) {
            jobMap[job].completed++;
          } else if (
            item.interview_score === null &&
            new Date(item.interview_time) <= new Date()
          ) {
            jobMap[job].ongoing++;
          } else if (
            item.interview_score === null &&
            new Date(item.interview_time) > new Date()
          ) {
            jobMap[job].notStarted++;
          }
        });

        const jobList = Object.values(jobMap);
        setJobs(jobList);
      } catch (err) {
        console.error("Error fetching jobs:", err);
        setError("Failed to load job statistics.");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const renderTableRows = () => {
    if (!jobs.length)
      return (
        <tr>
          <td colSpan={5}>
            {loading ? "Loading..." : "No job data available."}
          </td>
        </tr>
      );

    return jobs.map((job, i) => (
      <tr key={i}>
        <td>{job.job_name}</td>
        <td>{job.completed}</td>
        <td>{job.ongoing}</td>
        <td>{job.notStarted}</td>
        <td>{job.total}</td>
      </tr>
    ));
  };

  return (
    <div className="jobs-container">
      <h2>Jobs Overview</h2>

      {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Job Name</th>
              <th>Completed</th>
              <th>Ongoing</th>
              <th>Not Started</th>
              <th>Total Interviews</th>
            </tr>
          </thead>
          <tbody>{renderTableRows()}</tbody>
        </table>
      </div>
    </div>
  );
}

export default Jobs;
