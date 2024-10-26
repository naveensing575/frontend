// src/components/AuthInterceptor.tsx
import { useEffect } from "react";
import { setupInterceptors } from "../services/api";
import { useAuth } from "../context/AuthContext";
import { useNotification } from "../context/NotificationContext";

const AuthInterceptor: React.FC = () => {
  const { logout } = useAuth();
  const { setMessage } = useNotification();

  useEffect(() => {
    setupInterceptors(logout, setMessage);
  }, [logout, setMessage]);

  return null;
};

export default AuthInterceptor;
