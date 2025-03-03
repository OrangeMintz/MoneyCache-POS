'use client';
import { createContext, useEffect, useState, useContext } from "react";
import { useRouter } from "next/navigation";
import api from "@/utils/api";

type User = {
    id: number;
    name: string;
    email: string;
    created_at: string;
    updated_at: string;
    email_verified_at: string | null;
};

interface AppContextType {
    globalFunction: () => void;
    user: User | null;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null)
    const router = useRouter()

    const globalFunction = async () => {
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
            // setLoading(false);
        }
    }

    return (
        <AppContext.Provider value={{ user, globalFunction }}>
            {children}
        </AppContext.Provider>
    );

}

// Custom Hook for consuming the context
export function useAppContext() {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error("useAppContext must be used within an AppProvider");
    }
    return context;
}


