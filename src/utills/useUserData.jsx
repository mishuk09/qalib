import { useState, useEffect } from "react";

export default function useUserData() {
    const [userData, setUserData] = useState(null);
    const [allUsers, setAllUsers] = useState([]);
    const [admins, setAdmins] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const token = localStorage.getItem("token");

    useEffect(() => {
        if (!token) {
            setLoading(false);
            return;
        }

        const fetchData = async () => {
            try {
                // Fetch profile
                const profileRes = await fetch("http://127.0.0.1:5000/api/profile", {
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                });
                const profileData = await profileRes.json();

                if (profileData.user) {
                    setUserData(profileData.user);
                } else {
                    throw new Error(profileData.error || "Failed to fetch profile");
                }

                // Fetch all users
                const usersRes = await fetch("http://127.0.0.1:5000/api/users");
                const usersData = await usersRes.json();
                setAllUsers(usersData.users || []);

                // Fetch all admins
                const adminRes = await fetch("http://127.0.0.1:5000/api/admin");
                const adminData = await adminRes.json();
                setAdmins(adminData.admins || []);

            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [token]);

    return { userData, allUsers, admins, loading, error };
}
