import React, { useState, useEffect } from "react";
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
  dataRecords = [],
  setDataRecords,
}) => {
  const [date, setDate] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [limit] = useState<number>(10); // Fixed limit per page
  const [totalPages, setTotalPages] = useState<number>(1);
  const [sortColumn, setSortColumn] = useState<keyof DataRecord | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  const fetchRecords = async () => {
    const filters = { date, location, page, limit, sortColumn, sortDirection };
    const response = await getDataRecords(filters);
    setDataRecords(response.dataRecords || []);
    setTotalPages(response.totalPages || 1);
  };

  useEffect(() => {
    fetchRecords();
  }, [page, sortColumn, sortDirection]); // Fetch data on page/sort change

  const clearFilters = () => {
    setDate("");
    setLocation("");
    setPage(1);
    fetchRecords();
  };

  const handleSort = (column: keyof DataRecord) => {
    if (sortColumn === column) {
      setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
  };

  const nextPage = () => {
    if (page < totalPages) setPage(page + 1);
  };

  const previousPage = () => {
    if (page > 1) setPage(page - 1);
  };

  return (
    <div className="data-record-table">
      <div className="filters">
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          placeholder="Select Date"
          className="filter-input"
        />
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Enter Location"
          className="filter-input"
        />
        <button onClick={fetchRecords} className="search-button">
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
          {dataRecords?.map((record) => (
            <tr key={record.id}>
              <td>{record.id}</td>
              <td>{new Date(record.timestamp).toLocaleString()}</td>
              <td>{record.location}</td>
              <td>{record.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="pagination">
        <button onClick={previousPage} disabled={page === 1}>
          Previous
        </button>
        <span>
          Page {page} of {totalPages}
        </span>
        <button onClick={nextPage} disabled={page === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
};

export default DataRecordTable;
