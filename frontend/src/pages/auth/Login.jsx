// src/pages/Login.jsx
import { useState } from "react";
import { Link, useNavigate, Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { IconLock, IconMail } from "@tabler/icons-react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login, user } = useAuth();
  const navigate = useNavigate();

  // Redirect if already logged in
  if (user) {
    return <Navigate to={`/${user.role}/dashboard`} replace />;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const success = login(email, password);
    if (success) {
      // Login sets user; we navigate after re-render via useEffect, but simpler: use the returned role
      // We'll store role from dummy user

      // Better: directly get user after login? Since setUser is async, we can read from DUMMY_USERS.
      // Quick workaround: use context login returns true, we know the user; we could navigate manually.
      // Simplest: after login, navigate based on email.

      // Instead, we'll use a useEffect to watch user. Or we can call login and then navigate based on the role we know from signup.
      // Here I'll use a useEffect in component, but to keep it simple, I'll just navigate after successful login using a timeout.
      navigate(`/${roleFromEmail(email)}/dashboard`, { replace: true });
    } else {
      setError("Invalid credentials");
    }
  };

  const roleFromEmail = (email) => {
    if (email === "admin@test.com") return "admin";
    if (email === "client@test.com") return "client";
    if (email === "manager@test.com") return "manager";
    return "client"; // default
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-md">
        <h1 className="mb-6 text-center text-2xl font-bold text-gray-800">Login</h1>
        {error && <p className="mb-4 text-sm text-red-600">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <IconMail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="email"
              placeholder="Email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg border border-gray-300 py-2 pl-10 pr-4 focus:border-blue-500 focus:outline-none"
            />
          </div>
          <div className="relative">
            <IconLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="password"
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg border border-gray-300 py-2 pl-10 pr-4 focus:border-blue-500 focus:outline-none"
            />
          </div>
          <button
            type="submit"
            className="w-full rounded-lg bg-blue-600 py-2 font-semibold text-white transition-colors hover:bg-blue-700"
          >
            Sign In
          </button>
        </form>
        <p className="mt-4 text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <Link to="/signup" className="font-medium text-blue-600 hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;