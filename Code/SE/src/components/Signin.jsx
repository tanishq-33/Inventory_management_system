import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const { signInUser } = UserAuth();
  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { session, error } = await signInUser(email, password);

      if (error) {
        setError(error);
        setTimeout(() => setError(""), 3000);
        return;
      }

      if (session) {
        setError("");
        navigate("/dashboard");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form
        onSubmit={handleSignIn}
        className="bg-gray rounded-lg shadow-lg w-full max-w-md p-8"
      >
        <h2 className="text-2xl font-bold mb-1">Log in</h2>

        <div className="mb-4">
          <input
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-300"
            type="email"
            name="email"
            id="email"
            placeholder="Username"
            required
          />
        </div>

        <div className="mb-6">
          <input
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-300"
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-teal-500 hover:bg-teal-600 text-white py-3 rounded font-medium disabled:opacity-60"
        >
          {loading ? "Signing in..." : "Log in"}
        </button>

        <div className="text-center mt-4 text-sm text-gray-500">
          or, <Link to="/signup" className="text-teal-600 hover:underline">sign up</Link>
        </div>

        {error && <p className="text-red-600 text-center pt-4">{error}</p>}
      </form>
    </div>
  );
};

export default Signin;
