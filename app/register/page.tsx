'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';

export default function page() {

  const [email, setEmail] = useState("")


  return (
    <div className=" items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-9 row-start-2 items-center sm:items-start">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <Image
              src="/images/logo.png"
              width={50}
              height={50}
              alt="Moneycache"
              style={{ display: 'block', marginLeft: 'auto', marginRight: 'auto' }}
            />
            <h1 className="text-xl font-bold leading-tight text-center tracking-tight text-gray-900 md:text-xl dark:text-white">
              Register Account
            </h1>

            <form className="space-y-1 md:space-y-4">
              <div>
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Enter Name</label>
                <input type="email" name="email" id="text" className="text-sm bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="John Doe" required />
              </div>
              <div>
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Enter email</label>
                <input type="email" name="email" id="email" className="text-sm bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required />
              </div>
              <div>
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Enter Password</label>
                <input type="password" name="password" id="password" placeholder="••••••••" className="text-sm bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
              </div>
              <div className="flex items-center justify-between">

              </div>
              <button type="submit" className="w-full text-black bg-primary-600 border border-black hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Sign up</button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Already have an account? <a href="/" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign in</a>
              </p>
            </form>
          </div>
        </div>
      </main>
    </div>
  )
}
