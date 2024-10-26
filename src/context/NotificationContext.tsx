// src/context/NotificationContext.tsx
import React, { createContext, useState, useContext, ReactNode } from "react";

interface NotificationContextProps {
  message: string | null;
  setMessage: (msg: string | null) => void;
}

export const NotificationContext = createContext<
  NotificationContextProps | undefined
>(undefined);

export const NotificationProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [message, setMessage] = useState<string | null>(null);

  return (
    <NotificationContext.Provider value={{ message, setMessage }}>
      {children}
      {message && (
        <div
          style={{
            position: "fixed",
            top: 10,
            right: 10,
            backgroundColor: "#f44336",
            color: "#fff",
            padding: "10px",
            borderRadius: "5px",
          }}
        >
          {message}
        </div>
      )}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context)
    throw new Error("useNotification must be used within NotificationProvider");
  return context;
};
