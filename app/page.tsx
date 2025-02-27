'use client';

import axios from "axios";
import Image from 'next/image';
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function Home() {
const [email, setEmail] = useState("");
const [password, setPassword] =useState("")
const [error, setError] = useState("")
const router = useRouter();

const handleSubmit = async (event: React.FormEvent) => {
  event.preventDefault();

  try {
    const response = await axios.post("http://127.0.0.1:8000/oauth/token",{
      grant_type: "password",
      client_id: process.env.NEXT_PUBLIC_PASSPORT_CLIENT_ID,
      client_secret: process.env.NEXT_PUBLIC_PASSPORT_CLIENT_SECRET,
      username: email,
      password: password,
      scope: "",
    },{
      headers: { "Content-Type": "application/json" },
      withCredentials: true, 
    })

    console.log(response.data);
    const accessToken = response.data.access_token;
    const refreshToken = response.data.refresh_token
    localStorage.setItem("access_token", accessToken);
    localStorage.setItem("refresh_token", refreshToken);
    
    router.push('/dashboard')
  } catch (err: any) {
    console.error("Login Error:", err.response?.data || err.message);
    
    if (err.response) {
      setError(err.response.data.message);
    } else if (err.request) {
      setError("No response from server. Check API.");
    } else {
      setError("Something went wrong. Try again.");
    }  
  }finally {
    console.log("asdhdsjas")
  } 
}

useEffect(() => {
  if(localStorage.getItem("access_token") && localStorage.getItem("refresh_token")){
    router.push('/dashboard')
  }
},[])


  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
      <div className="md:w-full p-6 bg-gray-300 rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
              <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <Image
                src="/images/logo.png"
                width={50}
                height={50}
                alt="Moneycache"
                style={{ display: 'block', marginLeft: 'auto', marginRight: 'auto' }} 
                />
                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  Sign in to your account
                </h1>
                {error && <p className="text-red-500 text-sm">{error}</p>}
                <form onSubmit={handleSubmit} className="space-y-4 p-4 md:space-y-6">
                  <div>
                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                    <input onChange={(e) => setEmail(e.target.value)} type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required />
                  </div>
                  <div>
                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                    <input onChange={(e) => setPassword(e.target.value)} type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-start">
                      <div className="flex items-center h-5">
                        <input id="remember" aria-describedby="remember" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" />
                      </div>
                      <div className="ml-3 text-sm">
                        <label htmlFor="remember" className="text-gray-500 dark:text-gray-300">Remember me</label>
                      </div>
                    </div>
                    <a href="#" className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">Forgot password?</a>
                  </div>
                  <button type="submit" className="text-white bg-gradient-to-br w-full from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Sign in</button>
                  <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                    Don’t have an account yet? <a href="/register" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign up</a>
                  </p>
                </form>
              </div>
            </div>
      </main>
    </div>
  );
}