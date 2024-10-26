import React, { useEffect, useState } from "react";
import { getMetrics } from "../services/api";

interface Metric {
  id: number;
  name: string;
  value: number;
}

const Dashboard: React.FC = () => {
  const [metrics, setMetrics] = useState<Metric[]>([]);

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const data = await getMetrics();
        setMetrics(data);
      } catch (error) {
        console.error("Failed to fetch metrics:", error);
      }
    };
    fetchMetrics();
  }, []);

  return (
    <div>
      <h2>Metrics Dashboard</h2>
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
