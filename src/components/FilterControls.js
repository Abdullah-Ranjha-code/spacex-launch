import React from "react";
import "./FilterControls.css";

function FilterControls({ filters, setFilters, applyFilters}) {
  const handleSuccessFilterChange = (event) => {
    const value = event.target.value;
    setFilters((prevFilters) => ({
      ...prevFilters,
      success: value === "all" ? null : value === "true",
    }));
  };

  const handleYearFilterChange = (event, type) => {
    const value = event.target.value;
    setFilters((prevFilters) => ({
      ...prevFilters,
      yearRange: {
        ...prevFilters.yearRange,
        [type]: value === "" ? null : value,
      },
    }));
  };

  return (
    <div className="filter-controls">
      <div>
        <label htmlFor="success-filter">Filter by Success:</label>
        <select id="success-filter" onChange={handleSuccessFilterChange}>
          <option value="all">All</option>
          <option value="true">Successful</option>
          <option value="false">Failed</option>
        </select>
      </div>

      <div>
        <label htmlFor="start-year">Start Year:</label>
        <select
          id="start-year"
          onChange={(e) => handleYearFilterChange(e, "start")}
        >
          <option value="">Any</option>
          {Array.from({ length: 25 }, (_, i) => 2000 + i).map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="end-year">End Year:</label>
        <select
          id="end-year"
          onChange={(e) => handleYearFilterChange(e, "end")}
        >
          <option value="">Any</option>
          {Array.from({ length: 25 }, (_, i) => 2000 + i).map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>

      <button onClick={applyFilters}>Apply Filters</button>
    </div>
  );
}

export default FilterControls;
