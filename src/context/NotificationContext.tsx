// src/context/NotificationContext.tsx
import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from "react";

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
  const [visible, setVisible] = useState<boolean>(false);

  useEffect(() => {
    if (message) {
      setVisible(true);

      // Set a timeout to clear the message after 5 seconds if not canceled
      const timer = setTimeout(() => {
        setVisible(false);
        setMessage(null);
      }, 5000);

      // Clear the timer if the component unmounts or if the message changes
      return () => clearTimeout(timer);
    }
  }, [message]);

  const handleCancel = () => {
    setVisible(false);
    setMessage(null); // Clear the message when "Cancel" is clicked
  };

  return (
    <NotificationContext.Provider value={{ message, setMessage }}>
      {children}
      {visible && message && (
        <div
          style={{
            position: "fixed",
            top: 10,
            right: 10,
            backgroundColor: "#f44336",
            color: "#fff",
            padding: "10px",
            borderRadius: "5px",
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <span>{message}</span>
          <button
            onClick={handleCancel}
            style={{
              backgroundColor: "transparent",
              color: "#fff",
              border: "none",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            Cancel
          </button>
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
