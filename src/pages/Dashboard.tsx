import React, { useEffect, useState } from "react";
import { getMetrics } from "../services/api";
import { useAuth } from "../context/AuthContext";
import DataUpload from "./DataUpload";

const Dashboard: React.FC = () => {
  const [metrics, setMetrics] = useState<any[]>([]);
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState<string>("metrics");

  useEffect(() => {
    const fetchMetrics = async () => {
      const data = await getMetrics();
      setMetrics(data);
    };
    fetchMetrics();
  }, []);

  const renderMetrics = () => (
    <div className="metrics-section">
      {metrics.map((metric) => (
        <div key={metric.id} className="metric-card">
          <h4>{metric.name}</h4>
          <p>{metric.value}</p>
        </div>
      ))}
    </div>
  );

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
          className={`tab-button ${activeTab === "metrics" ? "active" : ""}`}
          onClick={() => setActiveTab("metrics")}
        >
          Metrics
        </button>
        <button
          className={`tab-button ${activeTab === "upload" ? "active" : ""}`}
          onClick={() => setActiveTab("upload")}
        >
          Data Upload
        </button>
      </div>

      <div className="tab-content">
        {activeTab === "metrics" && (
          <>
            <h3>Dashboard Metrics</h3>
            {renderMetrics()}
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
