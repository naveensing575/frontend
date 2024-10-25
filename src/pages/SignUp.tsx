import React, { useState } from "react";
import api from "../services/api";
import { useNavigate, Link } from "react-router-dom";

const SignUp: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [roleId, setRoleId] = useState(1); // Default roleId (change as needed)
  const navigate = useNavigate();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post("/auth/register", { name, email, password, roleId });
      alert("Registration successful! You can now log in.");
      navigate("/"); // Redirect to login page
    } catch (error) {
      alert("Failed to register. Please try again.");
    }
  };

  return (
    <div>
      <h2>Sign Up</h2>
      <form onSubmit={handleSignUp}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
          required
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <select
          value={roleId}
          onChange={(e) => setRoleId(Number(e.target.value))}
        >
          <option value={1}>User</option>
          <option value={2}>Manager</option>
          <option value={3}>Admin</option>
        </select>
        <button type="submit">Sign Up</button>
      </form>
      <p>
        Already have an account? <Link to="/">Log in here</Link>
      </p>
    </div>
  );
};

export default SignUp;
