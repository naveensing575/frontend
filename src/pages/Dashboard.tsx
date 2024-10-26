// src/pages/Dashboard.tsx
import React, { useEffect, useState } from "react";
import { getDataRecords } from "../services/api";
import { useAuth } from "../context/AuthContext";
import DataUpload from "./DataUpload";
import DataRecordTable from "../components/DataRecordTable";

const Dashboard: React.FC = () => {
  const [dataRecords, setDataRecords] = useState<any[]>([]);
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState<string>("dataRecords");

  useEffect(() => {
    const fetchDataRecords = async () => {
      if (activeTab === "dataRecords") {
        const response = await getDataRecords(); // Fetch data
        setDataRecords(response.dataRecords || []); // Use the correct key and fallback to empty array
      }
    };
    fetchDataRecords();
  }, [activeTab]);

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h2>Welcome, {user?.name || "User"}!</h2>
        <button onClick={logout} className="logout-button">
          Logout
        </button>
      </header>

      <div className="tabs">
        <button
          className={`tab-button ${
            activeTab === "dataRecords" ? "active" : ""
          }`}
          onClick={() => setActiveTab("dataRecords")}
        >
          Data Records
        </button>
        <button
          className={`tab-button ${activeTab === "upload" ? "active" : ""}`}
          onClick={() => setActiveTab("upload")}
        >
          Data Upload
        </button>
      </div>

      <div className="tab-content">
        {activeTab === "dataRecords" && (
          <>
            <h3>Data Records</h3>
            <DataRecordTable
              dataRecords={dataRecords}
              setDataRecords={setDataRecords}
            />
          </>
        )}
        {activeTab === "upload" && (
          <>
            <h3>Data Upload</h3>
            <DataUpload />
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
