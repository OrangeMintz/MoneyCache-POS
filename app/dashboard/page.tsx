'use client';

import Image from "next/image";
import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";


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
          const response = await axios.get("http://127.0.0.1:8000/api/user", {
            headers: {
              Authorization: `Bearer ${token}`, // Send token in Authorization header
              Accept: "application/json",
            },
          });
  
          console.log("User Data:", response.data);
          setUser(response.data)
        } catch (error: any) {
            router.push('/login')
          console.error("Error fetching user data:", error.response?.data || error.message);
        }
      };

    useEffect(()=>{
        getUser();
    },[])

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
      <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
              <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  Hello React, from Laravel Backend!
                </h1>

                {user ? <div>
                            <p>{user.name}</p>
                            <p>{user.email}</p>
                        </div>: ''}
                
              </div>
            </div>
      </main>
    </div>
  );
}