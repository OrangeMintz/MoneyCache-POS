@extends('layoouts.head')

<body class="font-sans antialiased dark:bg-black dark:text-white/50">
    <div class="bg-gray-50 text-black/50 dark:bg-black dark:text-white/50">
        <img id="background" class="absolute -left-20 top-0 max-w-[877px]"
            src="https://laravel.com/assets/img/welcome/background.svg" alt="Laravel background" />
        <div
            class="relative min-h-screen flex flex-col items-center justify-center selection:bg-[#FF2D20] selection:text-white">
            <div class="relative w-full max-w-2xl px-6 lg:max-w-7xl">


                <main class="flex min-h-[90vh] items-center justify-center mt-[60px] bg-gray-100 dark:bg-gray-900">
                    <div class="w-full max-w-md bg-white p-8 shadow-lg rounded-lg dark:bg-gray-800">
                        <h2 class="text-2xl font-semibold text-center text-gray-900 dark:text-white">Register</h2>
                        <form class="mt-6">
                            <div>
                                <label for="text"
                                    class="block text-sm font-medium text-gray-700 dark:text-gray-300">First
                                    Name</label>
                                <input type="email" id="firstname" name="firstname" placeholder="firstname..."
                                    required
                                    class="mt-1 w-full p-2 border rounded-lg focus:ring focus:ring-indigo-300 dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                            </div>
                            <div class="mt-3">
                                <label for="text"
                                    class="block text-sm font-medium text-gray-700 dark:text-gray-300">Last Name</label>
                                <input type="password" id="lastname" name="lastname" placeholder="lastname..." required
                                    minlength="6"
                                    class="mt-1 w-full p-2 border rounded-lg focus:ring focus:ring-indigo-300 dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                            </div>
                            <div class="mt-3">
                                <label for="email"
                                    class="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
                                <input type="password" id="email" name="email" placeholder="email..."
                                    minlength="6"
                                    class="mt-1 w-full p-2 border rounded-lg focus:ring focus:ring-indigo-300 dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                            </div>
                            <div class="mt-3">
                                <label for="password"
                                    class="block text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
                                <input type="password" id="password" name="password" placeholder="password..." required
                                    minlength="6"
                                    class="mt-1 w-full p-2 border rounded-lg focus:ring focus:ring-indigo-300 dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                            </div>
                            <button type="submit"
                                class="mt-6 w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700">Login</button>
                        </form>
                        <p class="mt-4 text-center text-sm text-gray-600 dark:text-gray-300">
                            Don't have an account? <a href="#"
                                class="text-indigo-600 hover:underline dark:text-indigo-400">Sign up</a>
                        </p>
                    </div>
                </main>






                 @extends('layoouts.footer')
            </div>
        </div>
    </div>
</body>

</html>
