@include('layouts.header')

<!-- Lock Screen Overlay -->
<div class="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-md flex items-center justify-center z-50">
    <div class="w-full max-w-md p-8 space-y-6 bg-gray-800 rounded-lg shadow-lg text-white">
        <div class="flex flex-col items-center">
            <img src="{{asset('img/user.png')}}" alt="User Avatar" class="w-24 h-24 rounded-full border-4 border-gray-600">
            <h2 class="mt-4 text-xl font-semibold">User Name</h2>
            <p class="mt-2 text-gray-400 text-sm text-center">
                Your session was locked due to inactivity. Please enter your password to continue.
            </p>
        </div>

        <form class="space-y-4">
            <div>
                <label for="password" class="block text-sm font-medium">Enter Password</label>
                <input type="password" id="password" class="w-full p-3 text-gray-900 rounded-lg bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Password">
            </div>
            <button type="submit" class="w-full p-3 font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700">
                Unlock
            </button>
        </form>
    </div>
</div>

@include('layouts.footer')
