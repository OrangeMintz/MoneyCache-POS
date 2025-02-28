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
            @if (auth()->user()->role === 'admin')
                <a href="{{ route('admin.users') }}"
                    class="p-4 border-b-2 duration-200 cursor-pointer
                    {{ request()->routeIs('admin.users') ? 'border-MCGreen text-MCGreen' : 'border-transparent hover:border-MCGreen hover:text-MCGreen' }}">
                    User List
                </a>
            @endif
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
        </div>
    </nav>

    <!-- buttons -->
    <div class="w-3/12 flex justify-end">
        {{-- <form method="POST" action="{{ route('logout') }}">
            @csrf
            <a href="{{ route('logout') }}"
                class="p-4 border-b-2 border-MCGreen border-opacity-0 hover:text-MCGreen duration-200 cursor-pointer"
                onclick="event.preventDefault(); this.closest('form').submit();">
                Logout
            </a>
        </form> --}}


        <img id="avatarButton" type="button" data-dropdown-toggle="userDropdown" data-dropdown-placement="bottom-start" class="w-10 h-10 rounded-full cursor-pointer" src="{{asset('img/LogoIcon.png')}}" alt="User dropdown">
        <!-- Dropdown menu -->
        <div id="userDropdown" class="z-10 hidden absolute right-0 mt-6 md:mt-14 bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44 dark:bg-gray-700 dark:divide-gray-600">
            <div class="px-2 py-3 text-sm text-gray-900 dark:text-white">
            <div>{{auth()->user()->name}}</div>
            <div class="font-medium truncate">{{auth()->user()->email}}</div>
            </div>
            <ul class="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="avatarButton">
                <li>
                    <a href="{{route('profile.edit')}}" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Profile</a>
                </li>
                <li>
                    <form method="POST" action="{{ route('logout') }}" class="">
                        @csrf
                        <button class="block px-4 py-2 text-sm text-gray-700 flex w-full hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">
                            Sign out
                        </button>
                    </form>
                </li>
            </ul>

        </div>
    </div>
</header>

{{-- Drop down toggle --}}
<script>
    document.addEventListener("DOMContentLoaded", function () {
        const avatarButton = document.getElementById("avatarButton");
        const userDropdown = document.getElementById("userDropdown");
    
        // Toggle dropdown when clicking the avatar
        avatarButton.addEventListener("click", function (event) {
            event.stopPropagation(); // Prevents the event from bubbling to the document
            userDropdown.classList.toggle("hidden");
        });
    
        // Hide dropdown when clicking outside
        document.addEventListener("click", function (event) {
            if (!avatarButton.contains(event.target) && !userDropdown.contains(event.target)) {
                userDropdown.classList.add("hidden");
            }
        });
    });
</script>
