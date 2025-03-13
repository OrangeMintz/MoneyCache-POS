<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>{{ config('app.name', 'Laravel') }}</title>
    {{-- fav icon --}}
    <link rel="icon" type="image/png" href="{{ asset('img/LogoIcon.png') }}">

    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.bunny.net">
    <link href="https://fonts.bunny.net/css?family=figtree:400,500,600&display=swap" rel="stylesheet" />

    {{-- Fontawesome --}}
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.13.1/css/all.min.css">
    <script src="https://kit.fontawesome.com/da305c7c97.js" crossorigin="anonymous"></script>

    <!-- Styles / Scripts -->
    @if (file_exists(public_path('build/manifest.json')) || file_exists(public_path('hot')))
        @vite(['resources/css/app.css', 'resources/js/app.js'])
    @endif
</head>

<body class="font-sans antialiased dark:bg-gray-900 dark:text-white/50">
    <div class="bg-gray-50 text-black/50 dark:bg-gray-800 dark:text-white/50">
        <div
            class="relative min-h-screen flex flex-col items-center justify-center selection:bg-[#FF2D20] selection:text-white">
            <div class="relative w-full">
                <header>
                    <nav class="bg-white border-gray-200 px-4 lg:px-6 py-8 dark:bg-gray-800">
                        <div class="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
                            <h1 class="flex items-center space-x-2 w-3/12">
                                <a href="" class="flex items-center space-x-2">
                                    <img src="{{ asset('img/LogoIcon.png') }}" alt="MoneyCache Logo"
                                        class="h-14 w-auto">
                                    <span
                                        class="text-2xl font-semibold text-gray-900 dark:text-gray-100 hover:text-MCGreen duration-200">MoneyCache</span>
                                </a>
                            </h1>

                            <div class="flex items-center lg:order-2">
                                @if (Route::has('login'))
                                    <nav class="flex justify-end w-full lg:col-start-3">

                                        <!-- Dark Mode Toggle Switch -->
                                        @include('components.darkmode')

                                        @auth
                                            <a href="{{ url('/dashboard') }}"
                                                class="text-gray-800 dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-lg px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800">
                                                Dashboard
                                            </a>
                                        @else
                                            <a href="{{ route('login') }}"
                                                class="text-gray-800 dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-lg px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800">
                                                Login
                                            </a>

                                            {{-- @if (Route::has('register'))
                                                <a href="{{ route('register') }}"
                                                    class="text-white bg-MCGreen hover:bg-MCGreenHover focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-lg px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800">
                                                    Register
                                                </a>
                                            @endif --}}
                                        @endauth
                                    </nav>
                                @endif
                            </div>
                        </div>
                    </nav>
                </header>
                <div>
                    <section class="dark:bg-gray-900 py-14">
                        <div class="grid max-w-screen-xl px-4 py-8 mx-auto md:gap-8 xl:gap-0 md:py-16 md:grid-cols-12">
                            <div
                                class="mr-auto place-self-center md:col-span-7 text-center md:text-center lg:text-left flex flex-col items-center md:items-center lg:items-start">
                                <h1
                                    class="max-w-2xl mb-4 text-4xl font-black uppercase tracking-tighter leading-none md:text-5xl xl:text-6xl dark:text-white">
                                    <span class="text-MCGreen font-light">Money</span><span
                                        class="text-[#3FA3DA]">Cache</span>
                                </h1>
                                <h1
                                    class="max-w-2xl mb-4 text-3xl text-[#3A3A3A] font-extrabold tracking-tight leading-none md:text-4xl xl:text-4xl dark:text-white">
                                    A powerful cloud-based POS system for modern businesses.
                                </h1>
                                <p
                                    class="max-w-2xl mb-6 font-light text-gray-500 md:mb-8 md:text-lg lg:text-xl dark:text-gray-400">
                                    Streamline sales, manage inventory, and grow your business with ease using
                                    MoneyCache POS.
                                </p>
                                <div
                                    class="flex flex-col md:flex-row gap-4 w-full md:w-auto justify-center md:justify-center lg:justify-start">
                                    <a href="{{ route('login') }}"
                                        class="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-white rounded-lg bg-MCGreen hover:bg-MCGreenHover focus:ring-4 focus:ring-primary-300 dark:focus:ring-MCGreenHover w-full md:w-auto">
                                        Login
                                        <svg class="w-5 h-5 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path fill-rule="evenodd"
                                                d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                                                clip-rule="evenodd"></path>
                                        </svg>
                                    </a>
                                    <a href="#"
                                        class="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800 w-full md:w-auto">
                                        Speak to Sales
                                    </a>
                                </div>
                            </div>
                            <div class="hidden md:flex md:col-span-5">
                                <img src="{{ asset('img/Moneycache-Cloud-Based-POS-System-POS-For-Any-Devices-transformed.png') }}"
                                    alt="mockup">
                            </div>
                        </div>
                    </section>
                </div>

                <main class="">
                    <section class="bg-white dark:bg-gray-900 dark:border dark:border-gray-700">
                        <div class="py-12 px-4 mx-auto max-w-screen-xl text-center lg:py-20 lg:px-12">
                            <h1
                                class="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
                                We invest in the world’s potential
                            </h1>
                            <p
                                class="mb-8 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400">
                                At MoneyCache, we back businesses with the tools and support they need to grow and
                                thrive.
                                Our focus is on smart financial solutions that make managing money easier and more
                                efficient.
                            </p>
                            <div
                                class="flex flex-col mb-8 lg:mb-8 space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4">
                                <a href="#"
                                    class="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-MCGreen hover:bg-MCGreenHover focus:ring-4 focus:ring-primary-300 dark:focus:ring-MCGreenHover">
                                    Learn more
                                    <svg class="ml-2 -mr-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path fill-rule="evenodd"
                                            d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                                            clip-rule="evenodd"></path>
                                    </svg>
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
                    </section>

                    {{-- Features --}}
                    <section class="dark:bg-gray-900">
                        <div class="py-8 px-4 mx-auto max-w-screen-xl sm:py-16 lg:px-6">
                            <div class="max-w-screen-md mb-8 lg:mb-16">
                                <h2 class="mb-4 text-4xl tracking-tight font-extrabold text-[#3A3A3A] dark:text-white">
                                    Designed for business teams like yours</h2>
                                <p class="text-[#3A3A3A] sm:text-xl dark:text-white">
                                    MoneyCache simplifies payments and financial management, so your team can focus on
                                    growing the business.
                                    With fast transactions and smart tools, we help you stay in control of your cash
                                    flow.
                                </p>
                            </div>
                            <div class="space-y-8 md:grid md:grid-cols-2 lg:grid-cols-2 md:gap-12 md:space-y-0">
                                <div>
                                    <div
                                        class="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-primary-100 lg:h-12 lg:w-12 dark:bg-primary-900">
                                        <svg class="w-8 h-8 text-[#3FA3DA] lg:w-8 lg:h-8 dark:text-primary-300"
                                            fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
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
                                        <svg class="w-8 h-8 text-[#3FA3DA] lg:w-8 lg:h-8 dark:text-primary-300"
                                            fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
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
                                        <svg class="w-8 h-8 text-[#3FA3DA] lg:w-8 lg:h-8 dark:text-primary-300"
                                            fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
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
                                        <svg class="w-8 h-8 text-[#3FA3DA] lg:w-8 lg:h-8 dark:text-primary-300"
                                            fill="currentColor" viewBox="0 0 20 20"
                                            xmlns="http://www.w3.org/2000/svg">
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
                    </section>

                    {{-- CTA --}}
                    <section class="bg-[#1669B2] dark:bg-[#1669B2] py-10 dark:text-white">
                        <div class="py-8 px-4 mx-auto max-w-screen-xl sm:py-16 lg:px-6">
                            <div class="mx-auto max-w-screen-sm text-center space-y-6">
                                <h2 class="text-4xl tracking-tight font-extrabold leading-tight text-white">
                                    Start your free trial today
                                </h2>
                                <p class="font-light text-TWHITE dark:text-gray-400 md:text-lg">
                                    Try MoneyCache POS for 30 days. No credit card required.
                                </p>
                                <a href="#"
                                    class="text-TWHITE bg-[#EE7601] hover:bg-[#ee7001ef] focus:ring-4
                focus:ring-primary-300 font-bold rounded-3xl text-md px-8 py-5 focus:outline-none
                dark:focus:ring-primary-800 inline-block">
                                    Free trial for 30 days
                                </a>
                            </div>
                        </div>
                    </section>
                </main>
            </div>
        </div>
    </div>

    <script src="{{ asset('js/darkmode.js') }}"></script>
</body>

<div class=" mt-10">
    @include('layouts.footer')
</div>

</html>
