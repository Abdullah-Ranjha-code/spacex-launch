import React from "react";
import "./LaunchList.css";

function LaunchList({ launches }) {
  return (
    <div className="launch-list">
      <h2>Launches</h2>
      {launches.length === 0 ? (
        <p>No launches found.</p>
      ) : (
        <ul>
          {launches.map((launch) => (
            <li key={launch.id} className="launch-item">
              <h3>{launch.name}</h3>
              <p>
                <strong>Date:</strong>{" "}
                {new Date(launch.date_utc).toLocaleString()}
              </p>
              <p>
                <strong>Rocket:</strong> {launch.rocket}
              </p>
              <p>
                <strong>Success:</strong>{" "}
                {launch.success === null ? "N/A" : launch.success ? "Yes" : "No"}
              </p>
              <a
                href={launch.links.webcast}
                target="_blank"
                rel="noopener noreferrer"
              >
                Watch Launch
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default LaunchList;
