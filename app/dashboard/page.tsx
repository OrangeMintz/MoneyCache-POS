'use client';

import Navbar from "@/app/components/header";
import TransactionForm from "@/app/components/transaction";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import api from "../../utils/api";
export default function Dashboard() {
    const [user, setUser] = useState<any>(null);
    const router = useRouter();

    const getUser = async () => {
        const token = localStorage.getItem("access_token");
  
        if (!token) {
            router.push('/')
          console.error("No access token found. Please log in.");
          return;
        }
  
        try {
          const response = await api.get("/api/user", {
            headers: {
              Authorization: `Bearer ${token}`, // Send token in Authorization header
              Accept: "application/json",
            },
          });
  
          console.log("User Data:", response.data);
          setUser(response.data)
        } catch (error: any) {
            router.push('/')
          console.error("Error fetching user data:", error.response?.data || error.message);
        }
      };

    const logout = async (event: React.FormEvent) => {
      event.preventDefault();

      try {
        const token = localStorage.getItem("access_token");

        const response = await axios.post("http://127.0.0.1:8000/api/logout",{},{
          headers: {
            Authorization: `Bearer ${token}`, 
            Accept: "application/json",
          },
        })

        console.log(response.data)
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');

        router.push('/')
  
        if (!token) {
          console.error("No access token found.");
          return;
        }
      } catch (error) {
        console.error("Error logging out: ", error)
      }
    }

    useEffect(()=>{
        getUser();
    },[])

  return (
<main>
<Navbar/>
<TransactionForm/>
</main>
  );
}