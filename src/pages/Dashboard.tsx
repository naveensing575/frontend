import React, { useEffect, useState } from "react";
import { getMetrics } from "../services/api";
import { useAuth } from "../context/AuthContext";

const Dashboard: React.FC = () => {
  const [metrics, setMetrics] = useState<any[]>([]);
  const { user, logout } = useAuth();

  useEffect(() => {
    const fetchMetrics = async () => {
      const data = await getMetrics();
      setMetrics(data);
    };
    fetchMetrics();
  }, []);

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h2>Welcome, {user?.name || "User"}!</h2>
        <button onClick={logout}>Logout</button>
      </div>
      <h3>Dashboard Metrics</h3>
      <div>
        {metrics.map((metric) => (
          <div key={metric.id} style={{ marginBottom: "1rem" }}>
            <h4>{metric.name}</h4>
            <p>{metric.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
