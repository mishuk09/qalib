import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { FaXTwitter } from "react-icons/fa6";

const API_BASE = "http://127.0.0.1:5000/api"; // Flask backend

const AuthForm = () => {
    const [isSignUp, setIsSignUp] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.type === "text" ? "name" : e.target.type === "email" ? "email" : e.target.name || "password"]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("");
        setLoading(true);

        try {
            if (isSignUp) {
                if (formData.password !== formData.confirmPassword) {
                    setMessage("Passwords do not match");
                    setLoading(false);
                    return;
                }
                const res = await fetch(`${API_BASE}/register`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        name: formData.name,
                        email: formData.email,
                        password: formData.password,
                    }),
                });

                setMessage('Registration successful!');
                // Set a timeout to clear the message after 5 seconds (5000ms)
                setTimeout(() => {
                    setMessage(""); // Clear the message after the timeout
                }, 3000);
            } else {
                const res = await fetch(`${API_BASE}/login`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        email: formData.email,
                        password: formData.password,
                    }),
                });
                const data = await res.json();
                if (data.token) {
                    localStorage.setItem("token", data.token);
                    window.location.href = "/dashboard"; // Redirect to home page
                    setMessage("Login successful!");
                } else {
                    setMessage(data.error || "Login failed");
                }
                // Set a timeout to clear the message after 5 seconds (5000ms)
                setTimeout(() => {
                    setMessage(""); // Clear the message after the timeout
                }, 3000);
            }
        } catch (error) {
            setMessage("Server error. Please try again.");
        } finally {
            setLoading(false);
        }
    };




    return (
        <div className="flex relative justify-center items-center min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 px-4">
            {message && (
                <p className="absolute px-4 py-2 text-white font-semibold  top-2 right-2 bg-blue-500 text-center  rounded  mt-4  ">{message}</p>
            )}

            <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md transition-all duration-300">
                {/* Tabs */}
                <div className="flex mb-8 border-b border-gray-200">
                    <button
                        onClick={() => setIsSignUp(false)}
                        className={`flex-1 py-3 font-semibold text-lg transition-colors duration-200 ${!isSignUp
                            ? "text-blue-600 border-b-2 border-blue-600"
                            : "text-gray-500 hover:text-blue-500"
                            }`}
                    >
                        Sign In
                    </button>
                    <button
                        onClick={() => setIsSignUp(true)}
                        className={`flex-1 py-3 font-semibold text-lg transition-colors duration-200 ${isSignUp
                            ? "text-blue-600 border-b-2 border-blue-600"
                            : "text-gray-500 hover:text-blue-500"
                            }`}
                    >
                        Sign Up
                    </button>
                </div>

                {/* Form */}
                <form className="space-y-5" onSubmit={handleSubmit}>
                    {isSignUp && (
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Full Name
                            </label>
                            <input
                                type="text"
                                placeholder="John Doe"
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none transition-all"
                                required
                            />
                        </div>
                    )}

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Email
                        </label>
                        <input
                            type="email"
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

                    {isSignUp && (
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Confirm Password
                            </label>
                            <input
                                type="password"
                                name="confirmPassword"
                                placeholder="••••••••"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none transition-all"
                                required
                            />
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white py-3 rounded-lg font-semibold transition-all duration-200 shadow-md hover:shadow-lg"
                    >
                        {loading
                            ? "Please wait..."
                            : isSignUp
                                ? "Create Account"
                                : "Sign In"}
                    </button>
                </form>

                {/* Feedback */}


                {/* Forgot password */}
                {!isSignUp && (
                    <div className="text-center mt-4">
                        <a
                            href="#"
                            className="text-sm text-blue-500 hover:underline transition-colors"
                        >
                            Forgot your password?
                        </a>
                    </div>
                )}

                {/* Divider */}
                <div className="flex items-center my-6">
                    <div className="flex-1 h-px bg-gray-300"></div>
                    <span className="px-3 text-gray-400 text-sm">or</span>
                    <div className="flex-1 h-px bg-gray-300"></div>
                </div>

                {/* Social Login */}
                <div className="space-y-3 ">
                    <button
                        type="button"
                        className="w-full flex items-center justify-center gap-3 border border-gray-300 rounded-lg py-3 hover:bg-gray-50 transition-colors shadow-sm"
                    >
                        <FcGoogle size={22} />
                        <span className="text-gray-700 font-medium">
                            Continue with Google
                        </span>
                    </button>
                    <button
                        type="button"
                        className="w-full flex items-center justify-center gap-3 border border-gray-300 rounded-lg py-3 hover:bg-gray-50 transition-colors shadow-sm"
                    >
                        <FaXTwitter size={20} className="text-black" />
                        <span className="text-gray-700 font-medium">Continue with X</span>
                    </button>
                </div>


                {/* Switch Link */}
                <p className="text-center text-sm text-gray-500 mt-6">
                    {isSignUp
                        ? "Already have an account?"
                        : "Don't have an account?"}{" "}
                    <button
                        onClick={() => setIsSignUp(!isSignUp)}
                        className="text-blue-600 font-semibold hover:underline transition-colors"
                    >
                        {isSignUp ? "Sign In" : "Sign Up"}
                    </button>
                </p>
            </div>
        </div>
    );
};

export default AuthForm;
