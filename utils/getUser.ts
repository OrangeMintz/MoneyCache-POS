'use client';
import api from "./api";

export const getUser = async (router: any, setUser: (user: any) => void, setLoading: (loading: boolean) => void) => {
    const token = localStorage.getItem("access_token");

    if (!token) {
        router.push('/');
        return;
    }

    try {
        const response = await api.get("/api/user", {
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: "application/json",
            },
        });

        localStorage.setItem('role', response.data.role);
        setUser(response.data);
    } catch (error: any) {
        router.push('/');
        console.error("Error fetching user data:", error.response?.data || error.message);
    } finally {
        setLoading(false);
    }
};
