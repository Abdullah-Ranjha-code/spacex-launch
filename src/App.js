import React, { useState, useEffect } from "react";
import LaunchList from "./components/LaunchList";
import FilterControls from "./components/FilterControls";
import "./App.css";

function App() {
  const [launches, setLaunches] = useState([]);
  const [filteredLaunches, setFilteredLaunches] = useState([]);
  const [filters, setFilters] = useState({
    success: null, // null: no filter, true: successful, false: failed
    yearRange: { start: null, end: null }, // null: no filter
  });

  useEffect(() => {
    const fetchLaunches = async () => {
      const response = await fetch("https://api.spacexdata.com/v4/launches");
      const data = await response.json();
      setLaunches(data);
      setFilteredLaunches(data);
    };

    fetchLaunches();
  }, []);

  const applyFilters = () => {
    let filtered = launches;

    // Apply success filter
    if (filters.success !== null) {
      filtered = filtered.filter(
        (launch) => launch.success === filters.success
      );
    }

    // Apply year range filter
    if (filters.yearRange.start || filters.yearRange.end) {
      const startYear = filters.yearRange.start
        ? parseInt(filters.yearRange.start, 10)
        : null;
      const endYear = filters.yearRange.end
        ? parseInt(filters.yearRange.end, 10)
        : null;

      filtered = filtered.filter((launch) => {
        const launchYear = new Date(launch.date_utc).getFullYear();
        return (
          (!startYear || launchYear >= startYear) &&
          (!endYear || launchYear <= endYear)
        );
      });
    }

    setFilteredLaunches(filtered);
  };

  return (
    <div className="app-container">
      <h1>SpaceX Launch Tracker</h1>
      <FilterControls filters={filters} setFilters={setFilters} applyFilters={applyFilters} />
      <LaunchList launches={filteredLaunches} />
    </div>
  );
}

export default App;
