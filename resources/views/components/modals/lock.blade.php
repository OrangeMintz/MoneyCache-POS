    <div id="lockscreen"
        class="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-md flex items-center justify-center z-50 hidden">
        <div class="w-full max-w-md p-8 space-y-2 bg-white  dark:bg-gray-800 rounded-lg shadow-lg dark:text-white">
            <div class="flex flex-col items-center">
                <img src="{{ asset('img/user.png') }}" alt="User Avatar"
                    class="w-24 h-24 rounded-full border-4 border-gray-600">
                <h2 class="mt-4 text-xl font-semibold">{{ Auth::user()->name }}</h2>
                <p class="mt-2 text-gray-400 text-sm text-center">
                    Your session was locked due to inactivity. Please enter your password to continue.
                </p>
            </div>

            <form id="unlock-form" class="space-y-4">
                <div>
                    <label for="password" class="block mb-2 text-sm font-medium dark:text-white ">Password</label>
                    <input type="password" id="password" name="password"
                        class="bg-gray-100 border border-gray-500 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                        required>
                        <div id="password-error" class="mt-2 text-red-500 text-sm"></div>
                </div>
                <button type="submit"
                    class="w-full p-3 font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700">
                    <i class="fa-solid fa-unlock"></i> Unlock
                </button>
            </form>
        </div>
    </div>
