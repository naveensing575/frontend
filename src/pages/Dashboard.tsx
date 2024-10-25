import React, { useEffect, useState } from "react";
import { getMetrics } from "../services/api";

const Dashboard: React.FC = () => {
  const [metrics, setMetrics] = useState<any[]>([]);

  useEffect(() => {
    const fetchMetrics = async () => {
      const data = await getMetrics();
      setMetrics(data);
    };
    fetchMetrics();
  }, []);

  return (
    <div>
      <h2>Dashboard</h2>
      <div>
        {metrics.map((metric) => (
          <div key={metric.id}>
            <h3>{metric.name}</h3>
            <p>{metric.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
