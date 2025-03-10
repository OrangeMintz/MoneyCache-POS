<x-app-layout>

    {{-- Hero --}}
    {{-- <section class="bg-white dark:bg-gray-900">
        <div class="py-12 px-4 mx-auto max-w-screen-xl text-center lg:py-20 lg:px-12">
            <h1
                class="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
                Welcome back {{ auth()->user()->name }}!
            </h1>
            <p class="mb-8 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400">
                At MoneyCache, we back businesses with the tools and support they need to grow and
                thrive.
                Our focus is on smart financial solutions that make managing money easier and more
                efficient.
            </p>
            <div class="flex flex-col mb-8 lg:mb-8 space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4">
                <a href="{{ route('transaction') }}"
                    class="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-MCGreen hover:bg-MCHover focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900">
                    Transaction
                </a>
                <a href="#"
                    class="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-gray-900 rounded-lg border border-gray-300 hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800">
                    <svg class="mr-2 -ml-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z">
                        </path>
                    </svg>
                    Watch video
                </a>
            </div>
        </div>
    </section> --}}


    {{-- Features --}}
    {{-- <section class=" dark:bg-gray-900">
        <div class="py-8 px-4 mx-auto max-w-screen-xl sm:py-16 lg:px-6">
            <div class="max-w-screen-md mb-8 lg:mb-16">
                <h2 class="mb-4 text-4xl tracking-tight font-extrabold text-[#3A3A3A] dark:text-white">
                    Designed for business teams like yours</h2>
                <p class="text-[#3A3A3A] sm:text-xl dark:text-white">Here at Flowbite we focus on
                    markets where technology, innovation, and capital can unlock long-term value and
                    drive economic growth.</p>
            </div>
            <div class="space-y-8 md:grid md:grid-cols-2 lg:grid-cols-2 md:gap-12 md:space-y-0">
                <div>
                    <div
                        class="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-primary-100 lg:h-12 lg:w-12 dark:bg-primary-900">
                        <svg class="w-8 h-8 text-[#3FA3DA] lg:w-8 lg:h-8 dark:text-primary-300" fill="currentColor"
                            viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd"
                                d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 0l-2 2a1 1 0 101.414 1.414L8 10.414l1.293 1.293a1 1 0 001.414 0l4-4z"
                                clip-rule="evenodd"></path>
                        </svg>
                    </div>
                    <h3 class="mb-2 text-xl font-bold text-[#3A3A3A] dark:text-white">Marketing</h3>
                    <p class="text-[#3A3A3A] dark:text-gray-400">Plan it, create it, launch it.
                        Collaborate seamlessly with all the organization and hit your marketing goals
                        every month with our marketing plan.</p>
                </div>
                <div>
                    <div
                        class="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-primary-100 lg:h-12 lg:w-12 dark:bg-primary-900">
                        <svg class="w-8 h-8 text-[#3FA3DA] lg:w-8 lg:h-8 dark:text-primary-300" fill="currentColor"
                            viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z">
                            </path>
                        </svg>
                    </div>
                    <h3 class="mb-2 text-xl font-bold text-[#3A3A3A] dark:text-white">Legal</h3>
                    <p class="text-[#3A3A3A] dark:text-gray-400">Protect your organization, devices and
                        stay compliant with our structured workflows and custom permissions made for
                        you.</p>
                </div>
                <div>
                    <div
                        class="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-primary-100 lg:h-12 lg:w-12 dark:bg-primary-900">
                        <svg class="w-8 h-8 text-[#3FA3DA] lg:w-8 lg:h-8 dark:text-primary-300" fill="currentColor"
                            viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd"
                                d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z"
                                clip-rule="evenodd"></path>
                            <path
                                d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z">
                            </path>
                        </svg>
                    </div>
                    <h3 class="mb-2 text-xl font-bold text-[#3A3A3A] dark:text-white">Business
                        Automation</h3>
                    <p class="text-[#3A3A3A] dark:text-gray-400">Auto-assign tasks, send Slack
                        messages,
                        and much more. Now power up with hundreds of new templates to help you get
                        started.</p>
                </div>
                <div>
                    <div
                        class="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-primary-100 lg:h-12 lg:w-12 dark:bg-primary-900">
                        <svg class="w-8 h-8 text-[#3FA3DA] lg:w-8 lg:h-8 dark:text-primary-300" fill="currentColor"
                            viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z">
                            </path>
                            <path fill-rule="evenodd"
                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z"
                                clip-rule="evenodd"></path>
                        </svg>
                    </div>
                    <h3 class="mb-2 text-xl font-bold text-[#3A3A3A] dark:text-white">Finance</h3>
                    <p class="text-[#3A3A3A] dark:text-gray-400">Audit-proof software built for
                        critical
                        financial operations like month-end close and quarterly budgeting.</p>
                </div>
            </div>
        </div>
    </section> --}}

    {{-- FAQ Section --}}
    {{-- <section class=" w-full bg-white dark:bg-gray-900 dark:text-white px-6 pt-10 pb-8 mt-8 shadow-xl ring-1         ring-gray-900/5 sm:rounded-lg sm:px-10">
        <div class="mx-auto px-5">
            <div class="flex flex-col items-center">
                <h2 class="mt-5 text-center text-4xl font-bold tracking-tight md:text-5xl">FAQ</h2>
                <p class="mt-3 text-lg text-neutral-500 md:text-xl">Frequenty asked questions

                </p>
            </div>
            <div class="mx-auto mt-8 grid max-w-5xl divide-y divide-neutral-200">
                <div class="py-5">
                    <details class="group">
                        <summary class="flex cursor-pointer list-none items-center justify-between font-medium">
                            <span> How does the billing work?</span>
                            <span class="transition group-open:rotate-180">
                                <svg fill="none" height="24" shape-rendering="geometricPrecision"
                                    stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                    stroke-width="1.5" viewBox="0 0 24 24" width="24">
                                    <path d="M6 9l6 6 6-6"></path>
                                </svg>
                            </span>
                        </summary>
                        <p class="group-open:animate-fadeIn mt-3 text-neutral-600">Springerdata offers a variety of
                            billing options, including monthly and annual subscription plans, as well as pay-as-you-go
                            pricing for certain services. Payment is typically made through a credit card or other
                            secure online payment method.
                        </p>
                    </details>
                </div>
                <div class="py-5">
                    <details class="group">
                        <summary class="flex cursor-pointer list-none items-center justify-between font-medium">
                            <span> Can I get a refund for my subscription?</span>
                            <span class="transition group-open:rotate-180">
                                <svg fill="none" height="24" shape-rendering="geometricPrecision"
                                    stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                    stroke-width="1.5" viewBox="0 0 24 24" width="24">
                                    <path d="M6 9l6 6 6-6"></path>
                                </svg>
                            </span>
                        </summary>
                        <p class="group-open:animate-fadeIn mt-3 text-neutral-600">We offer a 30-day money-back
                            guarantee for most of its subscription plans. If you are not satisfied with your
                            subscription within the first 30 days, you can request a full refund. Refunds for
                            subscriptions that have been active for longer than 30 days may be considered on a
                            case-by-case basis.
                        </p>
                    </details>
                </div>
                <div class="py-5">
                    <details class="group">
                        <summary class="flex cursor-pointer list-none items-center justify-between font-medium">
                            <span> How do I cancel my subscription?</span>
                            <span class="transition group-open:rotate-180">
                                <svg fill="none" height="24" shape-rendering="geometricPrecision"
                                    stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                    stroke-width="1.5" viewBox="0 0 24 24" width="24">
                                    <path d="M6 9l6 6 6-6"></path>
                                </svg>
                            </span>
                        </summary>
                        <p class="group-open:animate-fadeIn mt-3 text-neutral-600">To cancel your subscription, you can
                            log in to your account and navigate to the subscription management page. From there, you
                            should be able to cancel your subscription and stop future billing.
                        </p>
                    </details>
                </div>
                <div class="py-5">
                    <details class="group">
                        <summary class="flex cursor-pointer list-none items-center justify-between font-medium">
                            <span> Is there a free trial?</span>
                            <span class="transition group-open:rotate-180">
                                <svg fill="none" height="24" shape-rendering="geometricPrecision"
                                    stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                    stroke-width="1.5" viewBox="0 0 24 24" width="24">
                                    <path d="M6 9l6 6 6-6"></path>
                                </svg>
                            </span>
                        </summary>
                        <p class="group-open:animate-fadeIn mt-3 text-neutral-600">We offer a free trial of our
                            software
                            for a limited time. During the trial period, you will have access to a limited set of
                            features and functionality, but you will not be charged.
                        </p>
                    </details>
                </div>
                <div class="py-5">
                    <details class="group">
                        <summary class="flex cursor-pointer list-none items-center justify-between font-medium">
                            <span> How do I contact support?</span>
                            <span class="transition group-open:rotate-180">
                                <svg fill="none" height="24" shape-rendering="geometricPrecision"
                                    stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                    stroke-width="1.5" viewBox="0 0 24 24" width="24">
                                    <path d="M6 9l6 6 6-6"></path>
                                </svg>
                            </span>
                        </summary>
                        <p class="group-open:animate-fadeIn mt-3 text-neutral-600">If you need help with our platform
                            or
                            have any other questions, you can contact the company's support team by submitting a support
                            request through the website or by emailing support@ourwebsite.com.
                        </p>
                    </details>
                </div>
                <div class="py-5">
                    <details class="group">
                        <summary class="flex cursor-pointer list-none items-center justify-between font-medium">
                            <span> Do you offer any discounts or promotions?</span>
                            <span class="transition group-open:rotate-180">
                                <svg fill="none" height="24" shape-rendering="geometricPrecision"
                                    stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                    stroke-width="1.5" viewBox="0 0 24 24" width="24">
                                    <path d="M6 9l6 6 6-6"></path>
                                </svg>
                            </span>
                        </summary>
                        <p class="group-open:animate-fadeIn mt-3 text-neutral-600">We may offer discounts or promotions
                            from time to time. To stay up-to-date on the latest deals and special offers, you can sign
                            up for the company's newsletter or follow it on social media.
                        </p>
                    </details>
                </div>
            </div>
        </div>
    </section> --}}

    {{-- CTA Section --}}
    {{-- <section class="bg-[#1669B2] dark:bg-gray-900 py-10">
        <div class="py-8 px-4 mx-auto max-w-screen-xl sm:py-16 lg:px-6">
            <div class="mx-auto max-w-screen-sm text-center space-y-6">
                <h2 class="text-4xl tracking-tight font-extrabold leading-tight text-white dark:text-gray-900">
                    Start your free trial today
                </h2>
                <p class="font-light text-white dark:text-gray-400 md:text-lg">
                    Try MoneyCache Platform for 30 days. No credit card required.
                </p>
                <a href="#"
                    class="text-white bg-[#EE7601] hover:bg-[#ee7001ef] focus:ring-4
        focus:ring-primary-300 font-bold rounded-3xl text-md px-8 py-5
        dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none
        dark:focus:ring-primary-800 inline-block">
                    Free trial for 30 days
                </a>
            </div>
        </div>
    </section> --}}

    <div class="font-sans bg-gray-100 dark:bg-gray-800 dark:text-gray-100 p-6">
        <div class="bg-white dark:bg-gray-900 p-4 mb-4 grid gap-6">
            <div class="flex flex-col space-y-6 md:space-y-0 md:flex-row justify-between">
              <div class="mr-6">
                <h1 class="title font-semibold text-[26px] mb-2">Dashboard</h1>
                <h2 class="text-gray-600 ml-0.5">MoneyCache #1 POS</h2>
              </div>
              <div class="flex flex-wrap items-start justify-end -mb-3">
                {{-- <button class="inline-flex px-5 py-3 text-purple-600 hover:text-purple-700 focus:text-purple-700 hover:bg-purple-100 focus:bg-purple-100 border border-purple-600 rounded-md mb-3">
                  <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="flex-shrink-0 h-5 w-5 -ml-1 mt-0.5 mr-2">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                  </svg>
                  Manage dashboard
                </button> --}}
                <a href="{{route('transaction')}}" class="inline-flex px-5 py-3 text-white bg-MCGreen hover:bg-MCGreenHover focus:bg-MCGreenHover rounded-md ml-6 mb-3">
                  Input a Transaction
                </a>
              </div>
            </div>
            <section class="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
                <div class="flex items-center p-8 bg-white shadow rounded-lg">
                    <div class="inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-purple-600 bg-purple-100 rounded-full mr-6">
                    <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="h-6 w-6">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    </div>
                    <div>
                    <span class="block text-2xl font-bold">62</span>
                    <span class="block text-gray-500">Users</span>
                    </div>
                </div>
                <div class="flex items-center p-8 bg-white shadow rounded-lg">
                    <div class="inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-green-600 bg-green-100 rounded-full mr-6">
                    <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="h-6 w-6">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                    </div>
                    <div>
                    <span class="block text-2xl font-bold">6.8</span>
                    <span class="block text-gray-500">Transaction</span>
                    </div>
                </div>
                <div class="flex items-center p-8 bg-white shadow rounded-lg">
                    <div class="inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-red-600 bg-red-100 rounded-full mr-6">
                    <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="h-6 w-6">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
                    </svg>
                    </div>
                    <div>
                    <span class="inline-block text-2xl font-bold">9</span>
                    <span class="block text-gray-500">Net Sales</span>
                    </div>
                </div>
                <div class="flex items-center p-8 bg-white shadow rounded-lg">
                    <div class="inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-blue-600 bg-blue-100 rounded-full mr-6">
                    <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="h-6 w-6">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                    </div>
                    <div>
                    <span class="block text-2xl font-bold">83</span>
                    <span class="block text-gray-500">Gross Sales</span>
                    </div>
                </div>
            </section>
            <section class="grid md:grid-cols-3 xl:grid-cols-3 md:grid-rows-2 xl:grid-flow-col gap-6">

                {{-- chart --}}
                <div class="flex flex-col row-span-3 md:col-span-2 md:row-span-2 bg-white shadow rounded-lg p-4 sm:p-8">
                    
                    <h5 class="text-xl font-bold leading-none text-gray-900 dark:text-white">Recent Activities</h5>
                    <div class="p-4 flex-grow">
                    <div class="flex items-center justify-center h-full px-4 py-16 text-gray-400 text-3xl font-semibold bg-gray-100 border-2 border-gray-200 border-dashed rounded-md">Chart</div>
                    </div>
                </div>


                {{-- recent logs --}}
                <div class="row-span-2  md:col-span-1 bg-white shadow rounded-lg">


                    <div class="w-full max-w-md p-4 bg-white border border-gray-200 rounded-lg shadow-sm sm:p-8 dark:bg-gray-800 dark:border-gray-700">
                        <div class="flex items-center justify-start mb-4">
                            <h5 class="text-xl font-bold leading-none text-gray-900 dark:text-white">Recent Activities</h5>
                       </div>
                       <div class="flow-root max-h-96 overflow-y-auto">
                            <ul role="list" class="divide-y divide-gray-200 dark:divide-gray-700">
                                <li class="py-3 sm:py-4">
                                    <div class="flex items-center relative">
                                        <div class="min-w-0 ms-4">
                                            <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
                                                Name: 
                                                <span class="text-sm text-gray-500 break-words dark:text-gray-400">John Doe</span>
                                            </p>
                                            <p class="text-sm font-medium text-gray-900 break-words dark:text-white">
                                                Shift: 
                                                <span class="text-sm text-gray-500 break-words dark:text-gray-400">AM</span>
                                            </p>
                                            <p class="text-sm font-medium text-gray-900 break-words dark:text-white">
                                                Message: 
                                                <span class="text-sm text-gray-500 break-words dark:text-gray-400 text-wrap">The quick brown fox jumps over the lazy dog</span>
                                            </p>
                                        </div>
                                        <div class="flex flex-col justify-between h-full px-2 w-1/3">
                                            <p class="text-xs italic absolute top-0 right-0">2025-03-10</p>
                                            <a href="#" class="text-sm text-end font-medium text-blue-600 hover:underline dark:text-blue-500 absolute bottom-0 right-0">
                                                Active
                                            </a>
                                        </div>
                                    </div>
                                </li>
                                <li class="py-3 sm:py-4">
                                    <div class="flex items-center relative">
                                        <div class="min-w-0 ms-4">
                                            <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
                                                Name: 
                                                <span class="text-sm text-gray-500 break-words dark:text-gray-400">John Doe</span>
                                            </p>
                                            <p class="text-sm font-medium text-gray-900 break-words dark:text-white">
                                                Shift: 
                                                <span class="text-sm text-gray-500 break-words dark:text-gray-400">AM</span>
                                            </p>
                                            <p class="text-sm font-medium text-gray-900 break-words dark:text-white">
                                                Message: 
                                                <span class="text-sm text-gray-500 break-words dark:text-gray-400 text-wrap">The quick brown fox jumps over the lazy dog</span>
                                            </p>
                                        </div>
                                        <div class="flex flex-col justify-between h-full px-2 w-1/3">
                                            <p class="text-xs italic absolute top-0 right-0">2025-03-10</p>
                                            <a href="#" class="text-sm text-end font-medium text-blue-600 hover:underline dark:text-blue-500 absolute bottom-0 right-0">
                                                Active
                                            </a>
                                        </div>
                                    </div>
                                </li>
                                <li class="py-3 sm:py-4">
                                    <div class="flex items-center relative">
                                        <div class="min-w-0 ms-4">
                                            <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
                                                Name: 
                                                <span class="text-sm text-gray-500 break-words dark:text-gray-400">John Doe</span>
                                            </p>
                                            <p class="text-sm font-medium text-gray-900 break-words dark:text-white">
                                                Shift: 
                                                <span class="text-sm text-gray-500 break-words dark:text-gray-400">AM</span>
                                            </p>
                                            <p class="text-sm font-medium text-gray-900 break-words dark:text-white">
                                                Message: 
                                                <span class="text-sm text-gray-500 break-words dark:text-gray-400 text-wrap">The quick brown fox jumps over the lazy dog</span>
                                            </p>
                                        </div>
                                        <div class="flex flex-col justify-between h-full px-2 w-1/3">
                                            <p class="text-xs italic absolute top-0 right-0">2025-03-10</p>
                                            <a href="#" class="text-sm text-end font-medium text-blue-600 hover:underline dark:text-blue-500 absolute bottom-0 right-0">
                                                Active
                                            </a>
                                        </div>
                                    </div>
                                </li>
                                <li class="py-3 sm:py-4">
                                    <div class="flex items-center relative">
                                        <div class="min-w-0 ms-4">
                                            <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
                                                Name: 
                                                <span class="text-sm text-gray-500 break-words dark:text-gray-400">John Doe</span>
                                            </p>
                                            <p class="text-sm font-medium text-gray-900 break-words dark:text-white">
                                                Shift: 
                                                <span class="text-sm text-gray-500 break-words dark:text-gray-400">AM</span>
                                            </p>
                                            <p class="text-sm font-medium text-gray-900 break-words dark:text-white">
                                                Message: 
                                                <span class="text-sm text-gray-500 break-words dark:text-gray-400 text-wrap">The quick brown fox jumps over the lazy dog</span>
                                            </p>
                                        </div>
                                        <div class="flex flex-col justify-between h-full px-2 w-1/3">
                                            <p class="text-xs italic absolute top-0 right-0">2025-03-10</p>
                                            <a href="#" class="text-sm text-end font-medium text-blue-600 hover:underline dark:text-blue-500 absolute bottom-0 right-0">
                                                Active
                                            </a>
                                        </div>
                                    </div>
                                </li>

                            </ul>
                       </div>
                    </div>
                    
                </div>

            </section>
        </div>

    </div>

        @include('layouts/footer')


</x-app-layout>
