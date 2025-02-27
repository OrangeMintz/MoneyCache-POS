<header class="z-50 header sticky top-0 bg-white shadow-md flex items-center px-8 py-3">
    <!-- logo -->
    <h1 class="flex items-center space-x-2 w-3/12">
        <a href="{{ route('dashboard') }}" class="flex items-center space-x-2">
            <img src="{{ asset('img/LogoIcon.png') }}" alt="MoneyCache Logo" class="h-14 w-auto">
            <span class=" text-2xl font-semibold text-gray-900 hover:text-MCGreen duration-200">MoneyCache</span>
        </a>
    </h1>

    <!-- navigation -->
    <nav class="nav font-semibold text-lg flex-grow flex justify-center">
        <div class="flex space-x-6">
            <a href="{{ route('admin.users') }}"
                class="p-4 border-b-2 duration-200 cursor-pointer
                    {{ request()->routeIs('admin.users') ? 'border-MCGreen text-MCGreen' : 'border-transparent hover:border-MCGreen hover:text-MCGreen' }}">
                User List
            </a>
            <a href="{{ route('transaction') }}"
                class="p-4 border-b-2 duration-200 cursor-pointer
                    {{ request()->routeIs('transaction') ? 'border-MCGreen text-MCGreen' : 'border-transparent hover:border-MCGreen hover:text-MCGreen' }}">
                Transaction
            </a>
            <a href="{{ route('transactions') }}"
                class="p-4 border-b-2 duration-200 cursor-pointer
                    {{ request()->routeIs('transactions') ? 'border-MCGreen text-MCGreen' : 'border-transparent hover:border-MCGreen hover:text-MCGreen' }}">
                Transaction List
            </a>
            <a href="{{ route('transactions.sheet', ['date' => now()->format('Y-m-d')]) }}"
                class="p-4 border-b-2 duration-200 cursor-pointer
        {{ request()->routeIs('transactions.sheet') ? 'border-MCGreen text-MCGreen' : 'border-transparent hover:border-MCGreen hover:text-MCGreen' }}">
                Sheets
            </a>
        </div>
    </nav>

    <!-- buttons -->
    <div class="w-3/12 flex justify-end">
        <form method="POST" action="{{ route('logout') }}">
            @csrf
            <a href="{{ route('logout') }}"
                class="p-4 border-b-2 border-MCGreen border-opacity-0 hover:text-MCGreen duration-200 cursor-pointer"
                onclick="event.preventDefault(); this.closest('form').submit();">
                Logout
            </a>
        </form>
    </div>
</header>
