{{-- <label class="inline-flex items-center cursor-pointer">
    <input type="checkbox" id="darkModeToggle" class="sr-only peer">
    <div
        class="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 dark:peer-focus:ring-green-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-MCGreen dark:peer-checked:bg-MCGreen">
    </div>
    <span class="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300"></span>
</label> --}}

<label class="inline-flex items-center cursor-pointer mr-5">
    <input type="checkbox" id="darkModeToggle" class="sr-only">
    <div class="relative w-14 h-7 bg-gray-200 dark:bg-gray-700 rounded-full transition-all">
        <!-- Toggle Button -->
        <div id="toggleCircle"
            class="absolute top-[2px] left-[2px] bg-white border-gray-300 border rounded-full h-6 w-6 transition-all dark:border-gray-600">
        </div>
        <!-- Sun Icon -->
        <i id="sunIcon"
            class="fa-regular fa-sun absolute left-2 top-1/2 transform -translate-y-1/2 text-yellow-500 text-sm"></i>
        <!-- Moon Icon -->
        <i id="moonIcon"
            class="fa-regular fa-moon absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm hidden"></i>
    </div>
</label>

<script>
    const toggle = document.getElementById('darkModeToggle');
    const sunIcon = document.getElementById('sunIcon');
    const moonIcon = document.getElementById('moonIcon');
    const toggleCircle = document.getElementById('toggleCircle');

    // Check local storage for theme preference
    if (localStorage.getItem('theme') === 'dark') {
        document.documentElement.classList.add('dark');
        toggle.checked = true;
        moonIcon.classList.remove('hidden');
        sunIcon.classList.add('hidden');
        toggleCircle.classList.add('translate-x-7');
    }

    toggle.addEventListener('change', function() {
        if (this.checked) {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
            moonIcon.classList.remove('hidden');
            sunIcon.classList.add('hidden');
            toggleCircle.classList.add('translate-x-7');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
            moonIcon.classList.add('hidden');
            sunIcon.classList.remove('hidden');
            toggleCircle.classList.remove('translate-x-7');
        }
    });
</script>
