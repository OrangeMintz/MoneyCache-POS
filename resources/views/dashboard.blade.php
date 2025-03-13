@include('layouts.header')

<main>

    <div class="font-sans bg-gray-100 dark:bg-gray-800 dark:text-gray-100 p-6">
        <div class="bg-white dark:bg-gray-900 p-4 mb-4 grid gap-6">
            <div class="flex flex-col space-y-6 md:space-y-0 md:flex-row justify-between">
                <div class="mr-6">
                    <h1 class="title font-semibold text-[26px] mb-2">Dashboard</h1>
                </div>
            </div>
            <section class="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
                <div class="flex items-center p-8 bg-white dark:bg-gray-800 shadow rounded-lg">
                    <div
                        class="inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-purple-600 bg-purple-100 rounded-full mr-6">
                        <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="h-6 w-6">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                    </div>
                    <div>
                        <span class="block text-2xl font-bold">{{ $users }} </span>
                        <span class="block text-gray-500">Total Users</span>
                    </div>
                </div>
                <div class="flex items-center p-8 bg-white dark:bg-gray-800 shadow rounded-lg">
                    <div
                        class="inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-blue-600 bg-blue-100 rounded-full mr-6">
                        <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                            class="h-6 w-6">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                        </svg>
                    </div>
                    <div>
                        <span class="block text-2xl font-bold">{{ $transactions ?? '0' }}</span>
                        <span class="block text-gray-500">Total Transactions</span>
                    </div>
                </div>
                <div class="flex items-center p-8 bg-white dark:bg-gray-800 shadow rounded-lg">
                    <div
                        class="inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-green-600 bg-green-100 rounded-full mr-6">
                        <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                            class="h-6 w-6">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                        </svg>
                    </div>
                    <div>
                        <span class="block text-2xl font-bold">₱{{ number_format($grossTotal ?? '0', 2) }}</span>
                        <span class="block text-gray-500">Total Gross Sales</span>
                    </div>
                </div>
                <div class="flex items-center p-8 bg-white dark:bg-gray-800 shadow rounded-lg">
                    <div
                        class="inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-red-600 bg-red-100 rounded-full mr-6">
                        <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                            class="h-6 w-6">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
                        </svg>
                    </div>
                    <div>
                        <span class="inline-block text-2xl font-bold">₱{{ number_format($netTotal ?? '0', 2) }}</span>
                        <span class="block text-gray-500">Total Net Sales</span>
                    </div>
                </div>
            </section>
            <section class="grid md:grid-cols-3 xl:grid-cols-3 md:grid-rows-2 xl:grid-flow-col gap-6">

                {{-- chart --}}
                <div
                    class="flex flex-col row-span-3 md:col-span-2 md:row-span-2 bg-white dark:bg-gray-800 shadow rounded-lg p-4 sm:p-8">

                    <h5 class="text-xl font-bold leading-none text-gray-900 dark:text-white">Grand Total</h5>
                    <div class="flex-grow">
                        <div class="w-full bg-white rounded-lg shadow-sm dark:bg-gray-800 py-4 md:py-6">
                            <div class="flex justify-between">
                                <div>
                                    <h5 class="leading-none text-3xl font-medium text-gray-900 dark:text-white pb-2">
                                        ₱ {{ number_format($grandTotal ?? '0', 2) }}
                                    </h5>
                                    <p class="text-base font-normal text-gray-500 dark:text-gray-400">Income this month
                                    </p>
                                </div>
                                {{-- <div
                                    class="flex items-center px-2.5 py-0.5 text-base font-semibold text-green-500 dark:text-green-500 text-center">
                                    12%
                                    <svg class="w-3 h-3 ms-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                                        fill="none" viewBox="0 0 10 14">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                            stroke-width="2" d="M5 13V1m0 0L1 5m4-4 4 4" />
                                    </svg>
                                </div> --}}
                            </div>
                            <div id="area-chart"></div>
                            <div
                                class="grid grid-cols-1 items-center border-gray-200 border-t dark:border-gray-700 justify-between">
                                <div class="flex justify-end items-center pt-5">
                                    <!-- Button -->
                                    {{-- <button id="dropdownDefaultButton" data-dropdown-toggle="lastDaysdropdown"
                                        data-dropdown-placement="bottom"
                                        class="text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-gray-900 text-center inline-flex items-center dark:hover:text-white"
                                        type="button">
                                        Last 7 days
                                        <svg class="w-2.5 m-2.5 ms-1.5" aria-hidden="true"
                                            xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                                stroke-width="2" d="m1 1 4 4 4-4" />
                                        </svg>
                                    </button> --}}
                                    <!-- Dropdown menu -->
                                    <div id="lastDaysdropdown"
                                        class="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44 dark:bg-gray-700">
                                        <ul class="py-2 text-sm text-gray-700 dark:text-gray-200"
                                            aria-labelledby="dropdownDefaultButton">
                                            <li>
                                                <a href="#"
                                                    class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Yesterday</a>
                                            </li>
                                            <li>
                                                <a href="#"
                                                    class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Today</a>
                                            </li>
                                            <li>
                                                <a href="#"
                                                    class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Last
                                                    7 days</a>
                                            </li>
                                            <li>
                                                <a href="#"
                                                    class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Last
                                                    30 days</a>
                                            </li>
                                            <li>
                                                <a href="#"
                                                    class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Last
                                                    90 days</a>
                                            </li>
                                        </ul>
                                    </div>
                                    @if (auth()->user()->role === 'admin')
                                        <a href="{{ route('transactions.sheet', ['date' => now()->format('Y-m-d')]) }}"
                                            class="uppercase text-sm font-semibold inline-flex items-center rounded-lg text-blue-600 hover:text-blue-700 dark:hover:text-blue-500  hover:bg-gray-100 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 px-3 py-2">
                                            Users Report
                                            <svg class="w-2.5 h-2.5 ms-1.5 rtl:rotate-180" aria-hidden="true"
                                                xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                                                <path stroke="currentColor" stroke-linecap="round"
                                                    stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4" />
                                            </svg>
                                        </a>
                                    @endif
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {{-- recent logs --}}
                <div class="row-span-2  md:col-span-1 bg-white dark:bg-gray-800 shadow rounded-lg">
                    <div
                        class="w-full max-w-md p-4 bg-white border border-gray-200 rounded-lg shadow-sm sm:p-8 dark:bg-gray-800 dark:border-gray-700">
                        <div class="flex items-center justify-start mb-4">
                            <h5 class="text-xl font-bold leading-none text-gray-900 dark:text-white">Recent Activities
                            </h5>
                        </div>
                        <div class="flow-root max-h-96 overflow-y-auto">
                            <ul role="list" class="divide-y divide-gray-200 dark:divide-gray-700">
                                @if ($logs->isEmpty())
                                    <li class="py-3 sm:py-4 text-center text-gray-500 dark:text-gray-400">
                                        No transactions yet.
                                    </li>
                                @else
                                    @foreach ($logs as $log)
                                        <li class="py-3 sm:py-4">
                                            <div class="flex items-center relative">
                                                <div class="min-w-0 ms-4">
                                                    <p
                                                        class="text-sm font-medium text-gray-900 truncate dark:text-white">
                                                        Name:
                                                        <span
                                                            class="text-sm text-gray-500 break-words dark:text-gray-400">
                                                            {{ $log->user->name ?? 'Unknown' }}
                                                        </span>
                                                    </p>
                                                    <p
                                                        class="text-sm font-medium text-gray-900 break-words dark:text-white">
                                                        Action:
                                                        <span
                                                            class="text-sm break-words text-wrap capitalize
                                            @if ($log->category === 'add') text-green-600
                                            @elseif ($log->category === 'update') text-blue-600
                                            @elseif ($log->category === 'delete') text-red-500
                                            @else text-gray-500 @endif">
                                                            {{ ucfirst($log->category) }}
                                                        </span>
                                                    </p>
                                                    <p
                                                        class="text-sm font-medium text-gray-900 break-words dark:text-white">
                                                        Activity:
                                                        <span
                                                            class="text-sm text-gray-500 break-words dark:text-gray-400 text-wrap">
                                                            {{ $log->message }}
                                                        </span>
                                                    </p>
                                                </div>
                                                <div class="flex flex-col justify-between h-full px-2 w-1/3">
                                                    <p class="text-xs italic absolute top-0 right-0">
                                                        {{ \Carbon\Carbon::parse($log->created_at)->setTimezone(config('app.timezone'))->format('Y-m-d g:i A') }}
                                                    </p>
                                                    <p
                                                        class="text-sm text-end font-medium px-1 rounded-lg text-white absolute bottom-0 right-0 capitalize
                                        @if ($log->type === 'transaction') bg-green-500
                                        @elseif ($log->type === 'user') bg-blue-500
                                        @else bg-gray-500 @endif">
                                                        {{ ucfirst($log->type) }}
                                                    </p>
                                                </div>
                                            </div>
                                        </li>
                                    @endforeach
                                @endif
                            </ul>
                        </div>
                    </div>
                    {{-- view more logs --}}
                    <div class="flex justify-end mt-6 mr-6">
                        <button type="button" data-drawer-target="drawer-navigation"
                            data-drawer-show="drawer-navigation" aria-controls="drawer-navigation"
                            class="uppercase text-sm font-semibold inline-flex items-center rounded-lg text-blue-600 hover:text-blue-700 dark:hover:text-blue-500  hover:bg-gray-100 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 px-3 py-2">
                            View Details
                            <svg class="w-2.5 h-2.5 ms-1.5 rtl:rotate-180" aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                    stroke-width="2" d="m1 9 4-4-4-4" />
                            </svg>
                        </button>

                        @include('components.modals.logs')

                    </div>

                </div>
            </section>
        </div>
    </div>


</main>
@include('layouts/footer')
