import { useState, useEffect } from "react";

export default function useUserData() {
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const token = localStorage.getItem("token");

    useEffect(() => {
        if (!token) {
            setLoading(false);
            setError("No token found");
            return;
        }

        const fetchData = async () => {
            try {
                // Fetch user profile
                const res = await fetch("http://127.0.0.1:5000/api/user-profile", {
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                });

                const data = await res.json();

                if (res.ok && data.user) {
                    setUserData(data.user);
                } else {
                    throw new Error(data.error || "Failed to fetch profile");
                }

            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [token]);

    return { userData, loading, error };
}
