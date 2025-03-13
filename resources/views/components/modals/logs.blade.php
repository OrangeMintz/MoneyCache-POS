<!-- Overlay Background -->
<div id="drawer-overlay" class="fixed inset-0 bg-black opacity-50 hidden z-50"></div>

{{-- drawer component --}}
<div id="drawer-navigation"
    class="fixed top-0 left-0 z-50 w-full h-screen p-4 overflow-y-auto transition-transform -translate-x-full bg-white dark:bg-gray-800 dark:text-white"
    tabindex="-1" aria-labelledby="drawer-navigation-label">
    <h2 id="drawer-navigation-label"
        class="text-center text-2xl font-semibold text-gray-500   uppercase dark:text-gray-400">
        Activity Records
    </h2>
    <button type="button" data-drawer-hide="drawer-navigation" aria-controls="drawer-navigation"
        class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 absolute top-2.5 end-2.5 inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white">
        <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clip-rule="evenodd"></path>
        </svg>
        <span class="sr-only">Close menu</span>
    </button>
    <div class="py-4 overflow-y-auto">
      <table id="logsTable" class="display" style="width:100%">
        <thead>
            <tr>
                <th></th>
                <th>Name</th>
                <th>Action Taken</th>
                <th>Activity Description</th>
                <th>Log Type</th>
                <th>Date & Time</th>
            </tr>
        </thead>

      </table>
        {{-- <table id="logsTable" class="display" style="width:100%">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Action Taken</th>
                    <th>Activity Description</th>
                    <th>Log Type</th>
                    <th>Date & Time</th>
                </tr>
            </thead>
            
            <thead>
              <tr>
                  <th>Name</th>
                  <th>Action Taken</th>
                  <th>Activity Description</th>
                  <th>Log Type</th>
                  <th>Date & Time</th>
              </tr>
            </thead>
             <tbody>
                @foreach ($allLogs as $log)
                    <tr>
                        <td>{{ $log->user->name ?? 'Unknown' }}</td>
                        <td>{{ $log->category }}</td>
                        <td>{{ $log->message }}</td>
                        <td>{{ $log->category }}</td>
                        <td>{{ \Carbon\Carbon::parse($log->created_at)->setTimezone(config('app.timezone'))->format('Y-m-d g:i A') }}
                        </td>
                    </tr>
                @endforeach

            </tbody>
        </table> --}}
    </div>
</div>

<script>
    document.addEventListener("DOMContentLoaded", function() {

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
        let logsTable = new DataTable('#logsTable', {
            ajax: '/object.txt',
            columns: [
                {
                    className: 'dt-control',
                    orderable: false,
                    data: null,
                    defaultContent: ''
                },
                { data: 'name' },
                { data: 'position' },
                { data: 'office' },
                { data: 'salary' },
                { data: 'start_date' }

            ],
            order: [[1, 'asc']]
        });

        function format(d) {
            // `d` is the original data object for the row
            return (
              `<div class="w-full bg-white dark:bg-gray-700 p-2 flex justify-evenly">
                  <div class="w-full max-w-md bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm rounded-lg p-5">
                      <h2 class="text-md font-semibold text-gray-900 dark:text-white mb-2">User details</h2>
                      <div class="relative bg-gray-50 dark:bg-gray-700 dark:border-gray-600 p-4 rounded-lg border border-gray-200 not-italic grid grid-cols-2">
                          <div class="text-sm space-y-1 text-gray-500 dark:text-gray-400 leading-loose hidden sm:block">
                              Name <br />
                              Email <br />
                              Shift Time <br />
                              Add
                              
                          </div>
                          <div class="text-sm space-y-1 text-gray-900 dark:text-white font-medium leading-loose">
                              Bonnie Green <br />
                              name@flowbite.com <br />
                              AM<br />
                              here
                          </div>

                      </div>
                  </div>

                  <div class="w-full max-w-md bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm rounded-lg p-5">
                      <h2 class="text-md font-semibold text-gray-900 dark:text-white mb-2">Transaction details</h2>
                      <div class="relative bg-gray-50 dark:bg-gray-700 dark:border-gray-600 p-4 rounded-lg border border-gray-200 not-italic grid grid-cols-2">
                          <div class="text-sm space-y-1 text-gray-500 dark:text-gray-400 leading-loose hidden sm:block">
                              Name <br />
                              Email <br />
                              Shift Time <br />
                              Add
                              
                          </div>
                          <div class="text-sm space-y-1 text-gray-900 dark:text-white font-medium leading-loose">
                              Bonnie Green <br />
                              name@flowbite.com <br />
                              AM<br />
                              here
                          </div>

                      </div>
                  </div>

              </div>`
            );
        }
        // Add event listener for opening and closing details
        logsTable.on('click', 'td.dt-control', function (e) {
            let tr = e.target.closest('tr');
            let row = logsTable.row(tr);
        
            if (row.child.isShown()) {
                // This row is already open - close it
                row.child.hide();
            }
            else {
                // Open this row
                row.child(format(row.data())).show();
            }
        });
    });
</script>
