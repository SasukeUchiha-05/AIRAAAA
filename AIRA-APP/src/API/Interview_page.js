// fetch-interviews.js
// Simple GET request to fetch JSON array from backend and print it.

const API_URL = "http://10.0.0.238:8080/api/interviews/not started"; // your backend endpoint

async function fetchInterviews() {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();

    console.log("✅ Received data:");
    console.log(data); // prints JSON array to console
  } catch (error) {
    console.error("❌ Error fetching data:", error);
  }
}



fetchInterviews();
