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
                      <th>Number of Hours</th>
                      <th>Date</th>
                  </tr>
              </thead>
              <tbody>
                  <tr>
                      <td>Tiger Nixon</td>
                      <td>System Architect</td>
                      <td>Edinburgh</td>
                      <td>61</td>
                      <td>61</td>
                  </tr>
                  <tr>
                      <td>Garrett Winters</td>
                      <td>Accountant</td>
                      <td>Tokyo</td>
                      <td>63</td>
                      <td>63</td>
                  </tr>
                  <tr>
                      <td>Ashton Cox</td>
                      <td>Junior Technical Author</td>
                      <td>San Francisco</td>
                      <td>66</td>
                      <td>66</td>
                  </tr>
                  <tr>
                      <td>Cedric Kelly</td>
                      <td>Senior Javascript Developer</td>
                      <td>Edinburgh</td>
                      <td>66</td>
                      <td>22</td>
                  </tr>
                  <tr>
                      <td>Airi Satou</td>
                      <td>Accountant</td>
                      <td>Tokyo</td>
                      <td>66</td>
                      <td>33</td>
                  </tr>
                  <tr>
                      <td>Brielle Williamson</td>
                      <td>Integration Specialist</td>
                      <td>New York</td>
                      <td>66</td>
                      <td>61</td>
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
