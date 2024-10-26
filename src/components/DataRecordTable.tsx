import React, { useState } from "react";
import { getDataRecords } from "../services/api";

interface DataRecord {
  id: number;
  timestamp: string;
  location: string;
  amount: number;
}

interface DataRecordTableProps {
  dataRecords: DataRecord[];
  setDataRecords: (data: DataRecord[]) => void;
}

const DataRecordTable: React.FC<DataRecordTableProps> = ({
  dataRecords,
  setDataRecords,
}) => {
  const [date, setDate] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [sortColumn, setSortColumn] = useState<keyof DataRecord | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  const handleSearch = async () => {
    const filters = { date, location };
    const response = await getDataRecords(filters);
    setDataRecords(response.dataRecords); // Ensure the API returns data in the expected format
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  const clearFilters = () => {
    setDate("");
    setLocation("");
    handleSearch(); // Re-fetch all records after clearing filters
  };

  const handleSort = (column: keyof DataRecord) => {
    if (sortColumn === column) {
      // Toggle direction if the same column is clicked
      setSortDirection((prevDirection) =>
        prevDirection === "asc" ? "desc" : "asc"
      );
    } else {
      // Set the new column and reset direction to ascending
      setSortColumn(column);
      setSortDirection("asc");
    }
  };

  const sortedDataRecords = [...dataRecords].sort((a, b) => {
    if (sortColumn) {
      const aValue = a[sortColumn];
      const bValue = b[sortColumn];

      // Compare numeric, date, or string values
      if (typeof aValue === "number" && typeof bValue === "number") {
        return sortDirection === "asc" ? aValue - bValue : bValue - aValue;
      } else if (sortColumn === "timestamp") {
        const aDate = new Date(aValue as string).getTime();
        const bDate = new Date(bValue as string).getTime();
        return sortDirection === "asc" ? aDate - bDate : bDate - aDate;
      } else {
        return sortDirection === "asc"
          ? String(aValue).localeCompare(String(bValue))
          : String(bValue).localeCompare(String(aValue));
      }
    }
    return 0;
  });

  return (
    <div className="data-record-table">
      <div className="filters">
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Select Date"
          className="filter-input"
        />
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Enter Location"
          className="filter-input"
        />
        <button onClick={handleSearch} className="search-button">
          Search
        </button>
        <button onClick={clearFilters} className="clear-button">
          Clear
        </button>
      </div>

      <table>
        <thead>
          <tr>
            <th onClick={() => handleSort("id")}>
              ID{" "}
              {sortColumn === "id" ? (sortDirection === "asc" ? "↑" : "↓") : ""}
            </th>
            <th onClick={() => handleSort("timestamp")}>
              Timestamp{" "}
              {sortColumn === "timestamp"
                ? sortDirection === "asc"
                  ? "↑"
                  : "↓"
                : ""}
            </th>
            <th onClick={() => handleSort("location")}>
              Location{" "}
              {sortColumn === "location"
                ? sortDirection === "asc"
                  ? "↑"
                  : "↓"
                : ""}
            </th>
            <th onClick={() => handleSort("amount")}>
              Amount{" "}
              {sortColumn === "amount"
                ? sortDirection === "asc"
                  ? "↑"
                  : "↓"
                : ""}
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedDataRecords.map((record) => (
            <tr key={record.id}>
              <td>{record.id}</td>
              <td>{new Date(record.timestamp).toLocaleString()}</td>
              <td>{record.location}</td>
              <td>{record.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataRecordTable;
