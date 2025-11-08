import { useState } from "react";
import { useNavigate } from "react-router-dom";

const API_BASE = "http://127.0.0.1:5000/api"; // Base Flask API URL

const LoginForm = ({ setMessage }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    try {
      // ✅ FIX 1: correct endpoint — remove `/login`, should be `/signin`
      const res = await fetch(`${API_BASE}/signin`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await res.json();

      // ✅ FIX 2: handle token logic properly
      if (res.ok && data.token) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("email", data.user?.email || formData.email);
        setMessage("Login successful!");
        // ✅ FIX 3: navigate instead of hard refresh
        navigate("/dashboard");
      } else {
        setMessage(data.error || "Invalid credentials");
      }

      setTimeout(() => setMessage(""), 3000);
    } catch (error) {
      setMessage("Server error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h1 className="text-2xl font-bold mb-6">User Login</h1>
      <form className="space-y-5" onSubmit={handleSubmit}>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            name="email"
            placeholder="you@example.com"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none transition-all"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Password
          </label>
          <input
            type="password"
            name="password"
            placeholder="••••••••"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none transition-all"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white py-3 rounded-lg font-semibold transition-all duration-200 shadow-md hover:shadow-lg"
        >
          {loading ? "Please wait..." : "Sign In"}
        </button>
      </form>

      <p className="text-center text-sm text-gray-600 mt-4">
        Don’t have an account?{" "}
        <span
          onClick={() => navigate("/user-register")}
          className="text-blue-600 hover:underline cursor-pointer"
        >
          Sign Up
        </span>
      </p>
    </>
  );
};

export default LoginForm;
