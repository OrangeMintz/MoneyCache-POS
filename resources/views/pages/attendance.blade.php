@include('layouts.header')


<main>
  <div class="font-sans bg-gray-100 dark:bg-gray-800 dark:text-gray-100 p-6">
    <div class="bg-white dark:bg-gray-900 p-4 mb-4">
        <div class="">
            <div class="flex justify-between items-center mb-2">

                <h5 class="title font-semibold text-[26px]">Attendance Record</h5>
                    <button id="timeIn" class="w-32 text-center px-3 py-2 bg-green-100 dark:bg-green-300 text-green-700 dark:text-green-900 hover:bg-green-200 hidden">Time in</button>
                    <button id="timeOut" class="w-32 text-center px-3 py-2 bg-red-100 dark:bg-red-300 text-red-700 dark:text-red-900 hover:bg-red-200">Time out</button>
            </div>
            <table id="attendanceTable" class="display" style="width:100%">
              <thead>
                  <tr>
                      <th>Name</th>
                      <th>Time in</th>
                      <th>Time out</th>
                      <th>Attendance Status</th>
                      <th>Date</th>
                      <th>Action</th>
                  </tr>
              </thead>
              <tbody>
                  <tr>
                      <td>Garrett Winters</td>
                      <td>Accountant</td>
                      <td>Tokyo</td>
                      <td>Late</td>
                      <td>6333-33-33</td>
                      <td>
                          <button data-popover-target="view-details-1" type="button" class="cursor-default px-3 py-1 text-blue-500 hover:text-blue-600"">View Details
                        </button>

                        <div data-popover id="view-details-1" role="tooltip" class="absolute z-10 invisible inline-block w-64 text-sm text-gray-500 transition-opacity duration-300 bg-white border border-gray-200 rounded-lg shadow-xs opacity-0 dark:text-gray-400 dark:border-gray-600 dark:bg-gray-800">
                            <div class="px-3 py-2 bg-gray-100 border-b border-gray-200 rounded-t-lg dark:border-gray-600 dark:bg-gray-700">
                                <h3 class="font-semibold text-gray-900 dark:text-white">Work Summary</h3>
                            </div>
                            <div class="flex justify-evenly px-3 py-2">
                                <p class="font-medium text-gray-900 dark:text-white">Total Hours: 
                                    <span class="font-normal">0</span>
                                </p>
                                <p class="font-medium text-gray-900 dark:text-white">Total Rate: 
                                    <span class="font-normal">₱0</span>
                                </p>
                            </div>
                            <div data-popper-arrow></div>
                        </div>
                        

                        
                      </td>
                  </tr>
              </tbody>
          </table>
          
        </div>
    </div>
  </div>
</main>



@include('layouts.footer')

<script>
  //DataTable
  new DataTable('#attendanceTable', {
    // searching: false,
    // paging: false,
    // info: false
  });
</script>


<script>
    // timein/timeout toggle
    document.getElementById("timeOut").addEventListener("click", function(event) {
        event.preventDefault();
        document.getElementById("timeOut").classList.toggle("hidden");
        document.getElementById("timeIn").classList.toggle("hidden");
    });

    document.getElementById("timeIn").addEventListener("click", function(event) {
        event.preventDefault();
        document.getElementById("timeOut").classList.toggle("hidden");
        document.getElementById("timeIn").classList.toggle("hidden");
    });
</script>
