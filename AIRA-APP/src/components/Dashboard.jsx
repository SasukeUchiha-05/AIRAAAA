// src/components/Dashboard.jsx
import { useState } from "react";
import Interview from "./Interview";
import Overview from "./Overview";
import Candidates from "./Candidates";
import Jobs from "./Jobs";

function Dashboard() {
  const [activePage, setActivePage] = useState("interview");

  const renderContent = () => {
    switch (activePage) {
      case "interview":
        return <Interview />;
      case "overview":
        return <Overview />;
      case "candidates":
        return <Candidates />;
      case "jobs":
        return <Jobs />;
      default:
        return (
          <div className="content">
            <p>Select a section from the sidebar.</p>
          </div>
        );
    }
  };

  return (
    <div className="dashboard-container">
      <aside className="sidebar">
        <h2>AIRA Dashboard</h2>
        <ul>
          <li
            className={activePage === "interview" ? "active" : ""}
            onClick={() => setActivePage("interview")}
          >
            Interview
          </li>
          <li
            className={activePage === "candidates" ? "active" : ""}
            onClick={() => setActivePage("candidates")}
          >
            Candidates
          </li>
          <li
            className={activePage === "jobs" ? "active" : ""}
            onClick={() => setActivePage("jobs")}
          >
            Jobs
          </li>

          <li
            className={activePage === "overview" ? "active" : ""}
            onClick={() => setActivePage("overview")}
          >
            Overview
          </li>
        </ul>
      </aside>

      <main className="main-content">{renderContent()}</main>
    </div>
  );
}

export default Dashboard;
