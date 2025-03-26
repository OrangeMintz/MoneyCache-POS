<header class="z-50 sticky top-0 bg-white dark:bg-gray-900 dark:text-white shadow-md flex items-center px-6 py-3">
    <!-- Logo -->
    <h1 class="flex items-center space-x-2 w-3/12">
        <a href="{{ route('dashboard') }}" class="flex items-center space-x-2">
            <img src="{{ asset('img/LogoIcon.png') }}" alt="MoneyCache Logo" class="h-14 w-auto">
            <span
                class="text-2xl font-semibold text-gray-900 dark:text-white hover:text-MCGreen duration-200">MoneyCache</span>
        </a>
    </h1>

    <!-- Navigatiofn Menu (Desktop & Mobile) -->
    <div class="flex-grow flex items-center justify-end md:justify-center">
        <!-- Hamburger Button (Mobile) -->
        <button id="menuToggle" class="md:hidden sm:mr-0 mr-8 text-gray-700 focus:outline-none">
            <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16">
                </path>
            </svg>
        </button>

        <!-- Navigation Links -->
        <nav id="navMenu"
            class="hidden md:flex flex-col md:flex-row absolute md:relative top-full left-0 w-full md:w-auto bg-white dark:bg-gray-900 md:bg-transparent shadow-md md:shadow-none md:space-x-6 p-4 md:p-0">
            @if (auth()->user()->role === 'admin')
                <a href="{{ route('admin.users') }}"
                    class="p-4 block md:inline border-b-2 duration-200 cursor-pointer
                    {{ request()->routeIs('admin.users') ? 'border-MCGreen text-MCGreen' : 'border-transparent hover:border-MCGreen hover:text-MCGreen' }}">
                    User List
                </a>
            @endif
            <a href="{{ route('transaction') }}"
                class="p-4 block md:inline border-b-2 duration-200 cursor-pointer
                    {{ request()->routeIs('transaction') ? 'border-MCGreen text-MCGreen' : 'border-transparent hover:border-MCGreen hover:text-MCGreen' }}">
                Transaction
            </a>
            <a href="{{ route('transactions') }}"
                class="p-4 block md:inline border-b-2 duration-200 cursor-pointer
                    {{ request()->routeIs('transactions') ? 'border-MCGreen text-MCGreen' : 'border-transparent hover:border-MCGreen hover:text-MCGreen' }}">
                Sales
            </a>
        </nav>
    </div>

    <!-- Profile Dropdown -->
    <div class="w-3/12 flex justify-end relative">

        @include('components.darkmode')

        <img id="avatarButton" type="button" class="w-10 h-10 rounded-full cursor-pointer"
            src="{{ asset('img/LogoIcon.png') }}" alt="User dropdown">

        <!-- Dropdown Menu -->
        <div id="userDropdown"
            class="hidden absolute right-0 mt-14 bg-white divide-y divide-gray-100 rounded-lg shadow-md w-44">
            <div class="px-4 py-3 text-sm text-gray-900">
                <div>{{ auth()->user()->name }}</div>
                <div class="font-medium truncate">{{ auth()->user()->email }}</div>
            </div>
            <ul class="py-2 text-sm text-gray-700" aria-labelledby="avatarButton">
                <li>
                    <a href="{{ route('profile.edit') }}"
                        class="text-center block px-4 py-2 hover:bg-gray-100">Profile</a>
                </li>
                <li>
                    <a href="{{ route('attendance.index') }}"
                        class="text-center block px-4 py-2 hover:bg-gray-100">Attendance</a>
                </li>

                <li>
                    <form method="POST" action="{{ route('logout') }}"
                        class="w-full text-center bg-red-100 hover:bg-red-200">
                        @csrf
                        <button class="text-sm text-red-700 px-3 py-2 ">
                            Sign out
                        </button>
                    </form>
                </li>
            </ul>
        </div>
    </div>
</header>

<!-- JavaScript for Menu & Dropdown -->
<script>
    document.addEventListener("DOMContentLoaded", function() {
        const menuToggle = document.getElementById("menuToggle");
        const navMenu = document.getElementById("navMenu");
        const avatarButton = document.getElementById("avatarButton");
        const userDropdown = document.getElementById("userDropdown");

        // Toggle Mobile Navigation
        menuToggle.addEventListener("click", function() {
            navMenu.classList.toggle("hidden");
        });

        // Toggle Profile Dropdown
        avatarButton.addEventListener("click", function(event) {
            event.stopPropagation();
            userDropdown.classList.toggle("hidden");
        });

        // Hide dropdown when clicking outside
        document.addEventListener("click", function(event) {
            if (!avatarButton.contains(event.target) && !userDropdown.contains(event.target)) {
                userDropdown.classList.add("hidden");
            }
        });
    });
</script>
