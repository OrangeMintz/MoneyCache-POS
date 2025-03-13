@include('layouts.header')



<!-- Modal toggle -->
{{-- <button data-modal-target="archive-modal" data-modal-toggle="archive-modal" class="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">
  Toggle modal
</button> --}}



<button type="button" data-drawer-target="drawer-navigation" 
data-drawer-show="drawer-navigation" 
aria-controls="drawer-navigation">navigation</button>

<!-- Overlay Background -->
<div id="drawer-overlay" class="fixed inset-0 bg-black opacity-50 hidden z-50"></div>
    
{{-- drawer component --}}
<div id="drawer-navigation" class="fixed top-0 left-0 z-50 w-2/3 h-screen p-4 overflow-y-auto transition-transform -translate-x-full bg-white dark:bg-gray-800 dark:text-white" tabindex="-1" aria-labelledby="drawer-navigation-label">
    <h2 id="drawer-navigation-label" class="text-center text-2xl font-semibold text-gray-500   uppercase dark:text-gray-400">
        Actiity Records
    </h2>
    <button type="button" data-drawer-hide="drawer-navigation" aria-controls="drawer-navigation" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 absolute top-2.5 end-2.5 inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" >
        <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
        <span class="sr-only">Close menu</span>
    </button>
    <div class="py-4 overflow-y-auto">
        <table id="logsTable" class="display" style="width:100%">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Action Taken</th>
                    <th>Activity Description</th>
                    <th>Date & Time</th>
                    <th>Log Type</th>
                </tr>
            </thead>
            <tbody>
                @foreach ($allLogs as $log)
                    
                    <tr>
                        <td>{{ $log->user->name ?? 'Unknown' }}</td>
                        <td>{{ $log->category}}</td>
                        <td>{{ $log->message}}</td>
                        <td>{{ $log->category}}</td>
                        <td>{{ \Carbon\Carbon::parse($log->created_at)->setTimezone(config('app.timezone'))->format('Y-m-d g:i A') }}</td>
                    </tr>
                @endforeach

            </tbody>
        </table>
    </div>
</div>

<script>
    document.addEventListener("DOMContentLoaded", function () {

        // <!-- JavaScript for Overlay -->
        const drawer = document.getElementById("drawer-navigation");
        const overlay = document.getElementById("drawer-overlay");
        const openButton = document.querySelector("[data-drawer-show]");
        const closeButton = document.querySelector("[data-drawer-hide]");
    
        function openDrawer() {
            drawer.classList.remove("-translate-x-full");
            overlay.classList.remove("hidden");
        }
    
        function closeDrawer() {
            drawer.classList.add("-translate-x-full");
            overlay.classList.add("hidden");
        }
    
        openButton.addEventListener("click", openDrawer);
        closeButton.addEventListener("click", closeDrawer);
        overlay.addEventListener("click", closeDrawer);

        // Initialize Logs Table
        new DataTable('#logsTable');
    });

</script>

@include('layouts.footer')