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
      const result = await signInUser(email, password);
      console.log("signInUser result:", result);

      // handle common return shapes:
      // 1) { success: true, ... }
      // 2) { session: {...} } (supabase style)
      // 3) { user: {...}, session: {...} }
      // 4) { error: {...} }
      const ok =
        result?.success === true ||
        Boolean(result?.session) ||
        Boolean(result?.user);

      if (ok) {
        navigate("/dashboard");
        return;
      }

      // fall back to error messages
      const message =
        result?.error?.message || result?.error || "Sign in failed";
      setError(message);
    } catch (err) {
      console.error("Sign in error:", err);
      setError(err?.message || "Unexpected sign in error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen  flex items-center justify-center">
      <form onSubmit={handleSignIn} className="bg-gray rounded-lg shadow-lg w-full max-w-md p-8">
        <h2 className="text-2xl font-bold mb-1">Log in</h2>

        <div className="mb-4">
          <input onChange={(e) => setEmail(e.target.value)} value={email}
            className="w-full p-3 border border-gray-300 rounded" type="email" name="email" placeholder="Email" required />
        </div>

        <div className="mb-6">
          <input onChange={(e) => setPassword(e.target.value)} value={password}
            className="w-full p-3 border border-gray-300 rounded" type="password" name="password" placeholder="Password" required />
        </div>

        <p className="text-sm text-gray-600 mb-6">
          Don't have an account yet? <Link className="text-teal-600 hover:underline" to="/signup">Sign up</Link>
        </p>

        <button type="submit" disabled={loading} className="w-full bg-teal-500 text-white py-3 rounded">
          {loading ? "Signing in..." : "Log in"}
        </button>

        
        {error && <p className="text-red-600 text-center pt-4">{error}</p>}
      </form>
    </div>
  );
};

export default Signin;
