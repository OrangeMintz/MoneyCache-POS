'use client'
import Image from 'next/image'
export default function footer() {
  return (
    <footer className="bg-white dark:bg-gray-900">
    <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
        <div className="md:flex md:justify-between">
          <div className="mb-6 md:mb-0">
              <a href="https://money-cache.org/" className="flex items-center">
                  <Image src="/images/logo.png" width={50} height={50} alt="FlowBite Logo" />
                  <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white md:mt-1 md:ml-2">MoneyCache</span>
              </a>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
              <div>
                  <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Resources</h2>
                  <ul className="text-gray-500 dark:text-gray-400 font-medium">
                      <li className="mb-4">
                          <a href="https://www.instagram.com/moneycachepos/" className="hover:underline">MoneycachePOS</a>
                      </li>
                     
                  </ul>
              </div>
              <div>
                  <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Follow us</h2>
                  <ul className="text-gray-500 dark:text-gray-400 font-medium">
                      <li className="mb-4">
                          <a href="https://www.facebook.com/moneycachepos/" className="hover:underline ">Facebook</a>
                      </li>
                      <li>
                          <a href="https://www.instagram.com/moneycachepos/"  className="hover:underline">Instagram</a>
                      </li>
                  </ul>
              </div>
              <div>
                  <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Legal</h2>
                  <ul className="text-gray-500 dark:text-gray-400 font-medium">
                      <li className="mb-4">
                          <a href="#" className="hover:underline">Privacy Policy</a>
                      </li>
                      <li>
                          <a href="#" className="hover:underline">Terms &amp; Conditions</a>
                      </li>
                  </ul>
              </div>
          </div>
      </div>
      <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
      <div className="sm:flex sm:items-center sm:justify-between">
          <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2025 <a href="https://flowbite.com/" className="hover:underline">Moneycache</a> || Developed by BuksU IT Student. All Rights Reserved.
          </span>
          <div className="flex mt-4 sm:justify-center sm:mt-0">
              <a href="https://www.facebook.com/moneycachepos/?locale=sw_KE" className="text-gray-500 hover:text-gray-900 dark:hover:text-white">
                  <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 8 19">
                        <path fillRule="evenodd" d="M6.135 3H8V0H6.135a4.147 4.147 0 0 0-4.142 4.142V6H0v3h2v9.938h3V9h2.021l.592-3H5V3.591A.6.6 0 0 1 5.592 3h.543Z" clipRule="evenodd"/>
                    </svg>
                  <span className="sr-only">Facebook page</span>
              </a>
              <a href="https://www.instagram.com/moneycachepos/" className="text-gray-500 hover:text-gray-900 dark:hover:text-white ms-5">
                    <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M7.5 2C4.46 2 2 4.46 2 7.5v9C2 19.54 4.46 22 7.5 22h9c3.04 0 5.5-2.46 5.5-5.5v-9C22 4.46 19.54 2 16.5 2h-9zM12 6.5c3.03 0 5.5 2.47 5.5 5.5s-2.47 5.5-5.5 5.5S6.5 15.03 6.5 12 8.97 6.5 12 6.5zm0 2.5a3 3 0 1 0 .001 6.001A3 3 0 0 0 12 9zm5.5-3a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
                    </svg>
                    <span className="sr-only">Instagram page</span>
                    </a>
              <a href="https://money-cache.org/" className="text-gray-500 hover:text-gray-900 dark:hover:text-white ms-5">
                <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-.89-13.9c-.71 1.3-1.11 3.16-1.19 5.31H5.08c.23-2.16 1.01-4.08 2.16-5.63.6-.78 1.27-1.39 2.03-1.83zm-1.19 6.9c.08 2.15.48 4.01 1.19 5.31-.76-.44-1.43-1.05-2.03-1.83-1.15-1.55-1.93-3.47-2.16-5.63h4.22zm2.97 5.97c.71-1.3 1.11-3.16 1.19-5.31h4.22c-.23 2.16-1.01 4.08-2.16 5.63-.6.78-1.27 1.39-2.03 1.83zm1.19-6.97c-.08-2.15-.48-4.01-1.19-5.31.76.44 1.43 1.05 2.03 1.83 1.15 1.55 1.93 3.47 2.16 5.63h-4.22z"/>
                </svg>
                <span className="sr-only">Website</span>
                </a>
          </div>
      </div>
    </div>
</footer>
  )
}
