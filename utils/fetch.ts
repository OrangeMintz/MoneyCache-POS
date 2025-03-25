import api from "./api";

export const fetchUsers = async (): Promise<any[]> => {
    try {
        const token = localStorage.getItem("access_token");
        const response = await api.get("/api/users", {
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: "application/json",
            },
        });

        return {
            users: response.data.users.reverse() || [],
            deletedUsers: response.data.deleted_users.reverse() || [],
        };
    } catch (error) {
        console.error("Error fetching data:", error);
        return [];
    }
};

export const fetchTransactions = async (): Promise<any[]> => {
    try {
        const token = localStorage.getItem('access_token');
        const response = await api.get("/api/transactions", {
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: "application/json",
            },
        });
        console.log("transactions", response.data.transactions)

        return response.data.transactions.reverse() || [];
    } catch (error) {
        console.error('Error fetching data:', error);
        return [];
    }
}

export const fetchTotals = async (): Promise<any[]> => {
    try {
        const token = localStorage.getItem('access_token');
        const response = await api.get("/api/transactions/totals", {
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: "application/json",
            },
        });

        console.log("totals", response.data)

        return response.data || [];
    } catch (error) {
        console.error('Error fetching data:', error);
        return [];
    }
}

export const fetchTotalsToday = async (date: string): Promise<any[]> => {
    try {
        const token = localStorage.getItem('access_token');
        const response = await api.post("/api/transactions/get-by-date/totals", { date: date }, {
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: "application/json",
            },
        });

        return response.data.totals.grand_total || [];
    } catch (error) {
        console.error('Error fetching data:', error);
        return [];
    }
}

export const fetchDashboard = async (date: string): Promise<any[]> => {
    try {
        const token = localStorage.getItem('access_token');
        const response = await api.post("/api/dashboard", { date: date }, {
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: "application/json",
            },
        });

        return response.data || [];
    } catch (error) {
        console.error('Error fetching dashboard:', error);
        return [];
    }
}

export const fetchLogs = async (): Promise<any[]> => {
    try {
        const token = localStorage.getItem('access_token');
        const response = await api.get("/api/logs", {
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: "application/json",
            },
        });

        console.log("logs", response.data.logs)
        return response.data.logs.reverse() || [];
    } catch (error) {
        console.error('Error fetching data:', error);
        return [];
    }
}

export const fetchAttendance = async (): Promise<any[]> => {
    try {
        const token = localStorage.getItem('access_token');
        const response = await api.get("/api/attendance", {
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: "application/json",
            },
        });

        return response.data.attendance.reverse() || [];
    } catch (error) {
        console.error('Error fetching data:', error);
        return [];
    }
}

export const timeIn = async (): Promise<any[]> => {
    try {
        const token = localStorage.getItem('access_token');
        const response = await api.get("/api/attendance/timein", {
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: "application/json",
            },
        });

        console.log(response.data)
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        return [];
    }
}

export const timeOut = async (): Promise<any[]> => {
    try {
        const token = localStorage.getItem('access_token');
        const response = await api.get("/api/attendance/timeout", {
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: "application/json",
            },
        });

        console.log(response.data)
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        return [];
    }
}

