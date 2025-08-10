import { useState, useEffect } from "react";

export default function useUserData() {
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const token = localStorage.getItem("token");

    useEffect(() => {
        if (!token) {
            setLoading(false);
            return;
        }

        fetch("http://127.0.0.1:5000/api/profile", {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.user) {
                    setUserData(data.user);
                } else {
                    setError(data.error || "Unexpected response");
                }
            })
            .catch(err => setError(err.message))
            .finally(() => setLoading(false));
    }, [token]);

    return { userData, loading, error };
}
