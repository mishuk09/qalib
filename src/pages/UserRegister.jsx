import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import BehaviorQuestion from "../components/users/BehaviorQuestion";

export default function UserRegister() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const [secondModalOpen, setSecondModalOpen] = useState(false);


    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     setLoading(true);
    //     setError("");

    //     try {
    //         const res = await axios.post("http://127.0.0.1:5000/api/register", formData);
    //         const { token } = res.data;

    //         localStorage.setItem("token", token);
    //         navigate("/dashboard"); // redirect after registration
    //     } catch (err) {
    //         setError(err.response?.data?.error || "Registration failed");
    //     } finally {
    //         setLoading(false);
    //     }
    // };
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const res = await axios.post("http://127.0.0.1:5000/api/register", formData);
            const { token } = res.data;

            localStorage.setItem("token", token);

            // ✅ Redirect to dashboard and pass state
            navigate("/dashboard", { state: { showModalAfter: true } });

        } catch (err) {
            setError(err.response?.data?.error || "Registration failed");
        } finally {
            setLoading(false);
        }
    };



    return (
        <>
           
            <div className="min-h-screen flex items-center justify-center bg-blue-50 px-4">
                <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
                    <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
                        Create Your Account
                    </h1>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Name */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Full Name
                            </label>
                            <input
                                type="text"
                                name="name"
                                required
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                                placeholder="John Doe"
                            />
                        </div>

                        {/* Email */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Email Address
                            </label>
                            <input
                                type="email"
                                name="email"
                                required
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                                placeholder="john@example.com"
                            />
                        </div>

                        {/* Password */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Password
                            </label>
                            <input
                                type="password"
                                name="password"
                                required
                                value={formData.password}
                                onChange={handleChange}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                                placeholder="••••••••"
                            />
                        </div>

                        {/* Error message */}
                        {error && (
                            <p className="text-red-500 text-sm text-center mt-2">{error}</p>
                        )}

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className={`w-full py-3 mt-4 font-medium text-white rounded-lg transition ${loading
                                ? "bg-blue-300 cursor-not-allowed"
                                : "bg-blue-600 hover:bg-blue-700"
                                }`}
                        >
                            {loading ? "Registering..." : "Register"}
                        </button>
                    </form>

                    <p className="text-center text-sm text-gray-600 mt-4">
                        Already have an account?{" "}
                        <span
                            onClick={() => navigate("/register")}
                            className="text-blue-600 hover:underline cursor-pointer"
                        >
                            Sign in
                        </span>
                    </p>
                </div>
            </div>
        </>
    );
}
