<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Show Transactions</title>
    @vite('resources/css/app.css')
    {{-- sweet alert cdn --}}
    <script src="https://cdnjs.cloudflare.com/ajax/libs/sweetalert/2.1.2/sweetalert.min.js"
        integrity="sha512-AA1Bzp5Q0K1KanKKmvN/4d3IRKVlv9PYgwFPvm32nPO6QS8yH1HO7LbgB1pgiOxPtfeg5zEn2ba64MUcqJx6CA=="
        crossorigin="anonymous" referrerpolicy="no-referrer"></script>

    {{-- bootstrap css --}}
    {{-- <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"/> --}}

    {{-- datatable css --}}
    <link rel="stylesheet" href="https://cdn.datatables.net/2.2.2/css/dataTables.dataTables.css" />
    <style>
    </style>
</head>

<body>
  @include('layouts.header')
    <main>
      <div class="font-sans bg-gray-100 p-6">
        <div class="bg-white p-4 mb-4">
          <div class="container py-6">
            <div class="card">
              <div class="card-header">
                <h5 class="title font-semibold text-[26px]">Recent Transactions</h5>
              </div>
              <div class="card-body">
                <div class="overflow-x-auto">
                  <table id="example" class="display table table-striped datatable" style="width:100%">
                      <thead>
                          <tr>
                              <th>Cashier</th>
                              <th>Time</th>
                              <th>Cash</th>
                              <th>Check</th>
                              <th>BPI Credit Card</th>
                              <th>BPI Debit Card</th>
                              <th>Metro Credit Card</th>
                              <th>Metro Debit Card</th>
                              <th>Pay Maya</th>
                              <th>AUB Credit Card</th>
                              <th>GCash</th>
                              <th>Food Panda</th>
                              <th>StreetBy</th>
                              <th>Grab food</th>
                              <th>GC Claimed (Others)</th>
                              <th>GC Claimed (Own)</th>
                              <th>Action</th>
                          </tr>
                      </thead>
                      <tbody>
                          <tr>
                            <td class="border">Deokgou Corin</td>
                            <td class="border">AM</td>
                            <td class="border">Edinburgh</td>
                            <td class="border !tw-text-center">61</td>
                            <td class="border">50</td>
                            <td class="border">30</td>
                            <td class="border">80</td>
                            <td class="border">40</td>
                            <td class="border">25</td>
                            <td class="border"></td>
                            <td class="border">75</td>
                            <td class="border"></td>
                            <td class="border">100</td>
                            <td class="border">60</td>
                            <td class="border">55</td>
                            <td class="border">45</td>
                            <td class="border border-gray-300 px-4 py-2 flex gap-2">
                              <button class="px-3 py-1 text-white bg-blue-500 rounded hover:bg-blue-600">Edit</button>
                              <button class="px-3 py-1 text-white bg-red-500 rounded hover:bg-red-600">Delete</button>
                            </td>
                          </tr>
                          <tr>
                            <td class="border">Alter Ego</td>
                            <td class="border">AM</td>
                            <td class="border">Edinburgh</td>
                            <td class="border !tw-text-center">61</td>
                            <td class="border">50</td>
                            <td class="border">30</td>
                            <td class="border">80</td>
                            <td class="border">40</td>
                            <td class="border">100</td>
                            <td class="border">60</td>
                            <td class="border">55</td>
                            <td class="border">45</td>
                            <td class="border">25</td>
                            <td class="border"></td>
                            <td class="border">75</td>
                            <td class="border"></td>
                            <td class="border border-gray-300 px-4 py-2 flex gap-2">
                              <button class="px-3 py-1 text-white bg-blue-500 rounded hover:bg-blue-600">Edit</button>
                              <button class="px-3 py-1 text-white bg-red-500 rounded hover:bg-red-600">Delete</button>
                            </td>
                          </tr>
                          <tr>
                            <td class="border">Tiger Nixon</td>
                            <td class="border">AM</td>
                            <td class="border">Edinburgh</td>
                            <td class="border !tw-text-center">61</td>
                            <td class="border">50</td>
                            <td class="border">30</td>
                            <td class="border">80</td>
                            <td class="border">40</td>
                            <td class="border">25</td>
                            <td class="border">45</td>
                            <td class="border"></td>
                            <td class="border">75</td>
                            <td class="border"></td>
                            <td class="border">100</td>
                            <td class="border">60</td>
                            <td class="border">55</td>
                            <td class="border border-gray-300 px-4 py-2 flex gap-2">
                              <button class="px-3 py-1 text-white bg-blue-500 rounded hover:bg-blue-600">Edit</button>
                              <button class="px-3 py-1 text-white bg-red-500 rounded hover:bg-red-600">Delete</button>
                            </td>
                          </tr>
                      </tbody>
                  </table>
                </div>
              </div>

            </div>
          </div>
        </div>
        {{-- <div class="bg-white p-4">
          <div class="container py-6">
            <div class="card">
              <div class="card-header">
                <h5 class="title font-semibold text-[26px]">MM Details</h5>
              </div>
              <div class="card-body">
                <div class="table-responsive">
                  <table id="example" class="display table table-striped datatable" style="width:100%">
                      <thead>
                          <tr>
                              <th>MM Head Office</th>
                              <th>MM-COMMISSARY</th>
                              <th>MM-RM</th>
                              <th>MM-DM</th>
                              <th>Food Charge</th>
                              <th>Action</th>
                          </tr>
                      </thead>
                      <tbody>
                          <tr>
                              <td>Tiger Nixon</td>
                              <td>AM</td>
                              <td>Edinburgh</td>
                              <td>61as</td>
                              <td>61as</td>
                              <td class="border border-gray-300 px-4 py-2 flex gap-2">
                                  <button class="px-3 py-1 text-white bg-blue-500 rounded hover:bg-blue-600">Edit</button>
                                  <button class="px-3 py-1 text-white bg-red-500 rounded hover:bg-red-600">Delete</button>
                              </td>
                          </tr>
                          
                      </tbody>
                  </table>
                </div>
              </div>

            </div>
          </div>
        </div> --}}
      </div>
    </main>
    <script>
      


      function confirmation(e) {

            swal({
                    title: "Are you sure you want to delete this ",
                    text: "You won't be able to revert this delete ",
                    icon: "warning",
                    buttons: true,
                    dangerMode: true,
                })
                .then((willCancel) => {
                    if (willCancel) {
                        window.location.href = urlToRedirect;
                    }
                });
        }
    </script>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
    <script src="https://code.jquery.com/jquery-3.7.1.min.js" integrity="sha256-/JqT3SQfawRcv/BIHPThkBvs0OEvtFFmqPF/lYI/Cxo=" crossorigin="anonymous"></script>
    <script src="https://cdn.datatables.net/2.2.2/js/dataTables.js"></script>

    {{-- Initialize datatable --}}
    <script type="text/javascript">
        $(document).ready(function() {
            $('.datatable').DataTable();
        })
    </script>
</body>

</html>
