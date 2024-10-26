// src/App.tsx
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { NotificationProvider } from "./context/NotificationContext";
import AuthInterceptor from "./components/AuthInterceptor";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Dashboard from "./pages/Dashboard";
import DataUpload from "./pages/DataUpload";

const App: React.FC = () => (
  <AuthProvider>
    <NotificationProvider>
      <AuthInterceptor />
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/upload" element={<DataUpload />} />
        </Routes>
      </Router>
    </NotificationProvider>
  </AuthProvider>
);

export default App;
