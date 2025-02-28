'use client';

import axios from "axios";
import Image from 'next/image';
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const response = await axios.post("http://127.0.0.1:8000/oauth/token", {
        grant_type: "password",
        client_id: process.env.NEXT_PUBLIC_PASSPORT_CLIENT_ID,
        client_secret: process.env.NEXT_PUBLIC_PASSPORT_CLIENT_SECRET,
        username: email,
        password: password,
        scope: "",
      }, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      })

      console.log(response.data);
      const accessToken = response.data.access_token;
      const refreshToken = response.data.refresh_token
      const role = response.data
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
    } finally {
      console.log("asdhdsjas")
    }
  }

  useEffect(() => {
    if (localStorage.getItem("access_token") && localStorage.getItem("refresh_token")) {
      router.push('/dashboard')
    }
  }, [])


  return (
    <div className="items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <div className="w-full rounded-lg border shadow-lg dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <Image
              src="/images/logo.png"
              width={50}
              height={50}
              alt="Moneycache"
              style={{ display: 'block', marginLeft: 'auto', marginRight: 'auto' }}
            />
            <h1 className="text-xl font-bold leading-tight tracking-tight text-center text-gray-900 md:text-xl dark:text-white">
              Sign in to your account
            </h1>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
              <div>
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                <input onChange={(e) => setEmail(e.target.value)} type="email" name="email" id="email" className="text-sm bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required />
              </div>
              <div>
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                <input onChange={(e) => setPassword(e.target.value)} type="password" name="password" id="password" placeholder="••••••••" className="text-sm bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
              </div>

              {/* Improved alignment for remember me and forgot password */}
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input id="remember" type="checkbox" required className="w-4 h-4 border border-gray-300 rounded  bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" />
                  <label htmlFor="remember" className="ml-2 text-sm text-gray-500 dark:text-gray-300" >Remember me</label>
                </div>
                <a href="/forgot-password" className="text-sm ml-2 text-primary-600 hover:underline dark:text-primary-500">Forgot password?</a>
              </div>

              <button type="submit" className="w-full bg-gray-800 text-white bg-primary-600 border border-black hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Sign in</button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400 text-center">
                Don't have an account yet? <a href="/register" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign up</a>
              </p>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}