import { useState } from "react";

const API_BASE = "http://127.0.0.1:5000/api"; // Flask backend

const LoginForm = ({ setMessage }) => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const [loading, setLoading] = useState(false);

    // Handle form input changes
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage(""); // Clear previous message
        setLoading(true);

        try {
            // Send login request to the backend
            const res = await fetch(`${API_BASE}/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email: formData.email,
                    password: formData.password,
                }),
            });

            const data = await res.json();

            if (res.ok && data.token) {
                // If login is successful, store token and email in localStorage
                localStorage.setItem("email", formData.email);
                localStorage.setItem("token", data.token);
                setMessage("Login successful!");
                // Redirect to dashboard
                window.location.href = "/dashboard";
            } else {
                // If there is an error, display the error message
                setMessage(data.error || "Login failed");
            }

            // Timeout to clear the message after 3 seconds
            setTimeout(() => setMessage(""), 3000);

        } catch (error) {
            // If there is a network error, show a generic message
            setMessage("Server error. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
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
    );
};

export default LoginForm;
