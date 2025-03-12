@include('layouts.header')


<main>
  <div class="font-sans bg-gray-100 dark:bg-gray-800 dark:text-gray-100 p-6">
    <div class="bg-white dark:bg-gray-900 p-4 mb-4">
        <div class="card-header">
            <h5 class="title font-semibold text-[26px]">Attendance Record</h5>
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
                      <td>Tiger Nixon</td>
                      <td>System Architect</td>
                      <td>Edinburgh</td>
                      <td>Early</td>
                      <td>6122-22-22</td>
                      <td>
                          <button class="px-3 py-1 text-blue-500 hover:text-blue-600"">View Details
                        </button>
                    </td>
                        
                  </tr>
                  <tr>
                      <td>Garrett Winters</td>
                      <td>Accountant</td>
                      <td>Tokyo</td>
                      <td>Late</td>
                      <td>6333-33-33</td>
                      <td>
                          <button class="px-3 py-1 text-blue-500 hover:text-blue-600"">View Details
                        </button>
                        
                      </td>
                  </tr>
                  <tr>
                      <td>Ashton Cox</td>
                      <td>Junior Technical Author</td>
                      <td>San Francisco</td>
                      <td>Overtime</td>
                      <td>6622-22-22</td>
                      <td>
                        <button data-modal-target="view-details" data-modal-toggle="view-details" class="px-3 py-1 text-blue-500 hover:text-blue-600" type="button">View Details
                        </button>
                        
  
  <!-- Main modal -->
  <div id="view-details" tabindex="-1" aria-hidden="true" class="bg-black bg-opacity-50 hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
      <div class="relative p-4 w-full max-w-2xl max-h-full">
          <!-- Modal content -->
          <div class="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">
              <!-- Modal header -->
              <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200">
                  <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                      Name of the Cashier
                  </h3>
                  <button type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="view-details">
                      <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                      </svg>
                      <span class="sr-only">Close modal</span>
                  </button>
              </div>
              <!-- Modal body -->
              <div class="p-4 md:p-5 space-y-4">
                  <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                      With less than a month to go before the European Union enacts new consumer privacy laws for its citizens, companies around the world are updating their terms of service agreements to comply.
                  </p>
                  <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                      The European Union’s General Data Protection Regulation (G.D.P.R.) goes into effect on May 25 and is meant to ensure a common set of data rights in the European Union. It requires organizations to notify users as soon as possible of high-risk data breaches that could personally affect them.
                  </p>
              </div>
          </div>
      </div>
  </div>
  
  
                      </td>
                  </tr>
                  <tr>
                      <td>Cedric Kelly</td>
                      <td>Senior Javascript Developer</td>
                      <td>Edinburgh</td>
                      <td>Late</td>
                      <td>2222-22-22</td>
                      <td>
                          <button class="px-3 py-1 text-blue-500 hover:text-blue-600"">View Details
                        </button>
                        
                      </td>
                  </tr>
                  <tr>
                      <td>Airi Satou</td>
                      <td>Accountant</td>
                      <td>Tokyo</td>
                      <td>Overtime</td>
                      <td>3312-23-22</td>
                      <td>
                          <button class="px-3 py-1 text-blue-500 hover:text-blue-600"">View Details
                        </button>
                        
                      </td>
                  </tr>
                  <tr>
                      <td>Brielle Williamson</td>
                      <td>Integration Specialist</td>
                      <td>New York</td>
                      <td>Overtime</td>
                      <td>6112-23-23</td>
                      <td>
                          <button class="px-3 py-1 text-blue-500 hover:text-blue-600"">View Details
                        </button>
                        
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
  new DataTable('#attendanceTable');
</script>
