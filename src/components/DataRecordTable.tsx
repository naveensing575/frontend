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

  const handleSearch = async () => {
    const filters = { date, location };
    const filteredData = await getDataRecords(filters);
    setDataRecords(filteredData);
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

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
      </div>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Timestamp</th>
            <th>Location</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {dataRecords.map((record) => (
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
