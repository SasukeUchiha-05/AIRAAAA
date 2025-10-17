// Overview.jsx
// Pie chart showing interview overview: Completed, Ongoing, Not Started
// Determines status from `interview_time`, `interview_score`, and `interview_verdict`.
// Reads data from local interview_candidates.json.

import React, { useMemo,useState,useEffect } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Legend,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
// import candidates from "./interview_candidates.json"; 

const COLORS = {
  completed: "#4CAF50",
  ongoing: "#2196F3",
  not_started: "#FFC107",
  default: "#9E9E9E",
};

export default function Overview() {
    const [candidates, setCandidates] = useState([]);

    useEffect(() => {
    fetch("/interview_candidates.json")
        .then((res) => res.json())
        .then(setCandidates);
    }, []);
  const chartData = useMemo(() => {
    const now = new Date();
    const counts = { completed: 0, ongoing: 0, not_started: 0 };

    for (const c of candidates) {
      const verdict = String(c.interview_verdict || "").toLowerCase();
      const score = Number(c.interview_score || 0);
      const time = new Date(c.interview_time.replace(" ", "T"));

      let status = "not_started";

      // rule 1: verdict or score present → completed
      if (verdict && verdict !== "pending") {
        status = "completed";
      } else if (score > 0) {
        status = "completed";
      }
      // rule 2: if it's happening around now (within ±30 min) → ongoing
      else {
        const diffMinutes = (now - time) / 60000;
        if (Math.abs(diffMinutes) <= 30) {
          status = "ongoing";
        } else if (time > now) {
          status = "not_started";
        } else {
          status = "completed"; // already passed but no verdict yet
        }
      }

      counts[status]++;
    }

    return [
      { name: "Completed", value: counts.completed, key: "completed" },
      { name: "Ongoing", value: counts.ongoing, key: "ongoing" },
      { name: "Not Started", value: counts.not_started, key: "not_started" },
    ];
  }, );

  return (
    <div style={{ width: "100%", height: "80vh", padding: "2rem" }}>
      <h2 style={{ textAlign: "center", marginBottom: "1.5rem" }}>
        Interview Overview
      </h2>

      <ResponsiveContainer width="100%" height="70%">
        <PieChart>
          <Pie
            data={chartData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={150}
            label={(d) => `${d.name}: ${d.value}`}
            isAnimationActive
          >
            {chartData.map((entry) => (
              <Cell
                key={entry.key}
                fill={COLORS[entry.key] || COLORS.default}
              />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>

      <div
        style={{
          textAlign: "center",
          marginTop: "1rem",
          fontSize: "1rem",
        }}
      >
        {chartData.map((d) => (
          <span key={d.key} style={{ margin: "0 10px" }}>
            {d.name}: {d.value}
          </span>
        ))}
      </div>
    </div>
  );
}
