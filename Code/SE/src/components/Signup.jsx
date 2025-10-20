import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const { signUpNewUser } = UserAuth();
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const result = await signUpNewUser(email, password);
      console.log("signUpNewUser result:", result);

      // If the auth backend returns a session on sign up, it's an auto-login.
      // Only navigate automatically if a session exists (explicit auto-login).
      if (result?.session || result?.user && result?.session) {
        navigate("/dashboard");
        return;
      }

      // If signup succeeded but no session returned, show message instead of auto-login
      if (result?.user || result?.success) {
        setError(null);
        // show success message instead of navigation
        setError("Account created. Please check your email to confirm (if required) and then sign in.");
        return;
      }

      // fall back to error
      setError(result?.error?.message || result?.error || "Signup failed");
    } catch (err) {
      console.error("Signup error:", err);
      setError(err?.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen  flex items-center justify-center">
      <form
        onSubmit={handleSignUp}
        className="bg-grey rounded-lg shadow-lg w-full max-w-md p-8"
      >
        <h2 className="pb-4 text-2xl font-bold mb-1">Sign up</h2>

        <div className="mb-4">
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-300"
            type="email"
            name="email"
            id="email"
            placeholder="Email"
            required
          />
        </div>

        <div className="mb-6">
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
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
          {loading ? "Creating account..." : "Sign up"}
        </button>

        <p className="pt-4 text-sm text-gray-600 mb-6">
          Already have an account?{" "}
          <Link to="/" className="text-teal-600 hover:underline">
            Sign in
          </Link>
        </p>

        {error && <p className="text-red-600 text-center pt-4">{error}</p>}
      </form>
    </div>
  );
};

export default Signup;
