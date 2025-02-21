@include('layouts.header')
<main>
    <div class="font-sans bg-gray-100 p-6">
        <div class="bg-white p-4 mb-4">
          <div class="card-header">
            <h5 class="title font-semibold text-[26px]">Test Transactions</h5>
          </div>
            <div class="overflow-x-auto">
            <table id="example" class="display" style="width:100%">
              <thead>
                  <tr>
                      <th></th>
                      <th>Name</th>
                      <th>Time</th>
                      <th>Sub-Total</th>
                      <th>Sub-Total Non Trade</th>
                      <th>Grand total</th>
                  </tr>
              </thead>
              <tfoot>
                <tr>
                    <th></th>
                    <th>Name</th>
                    <th>Time</th>
                    <th>Sub-Total</th>
                    <th>Sub-Total Non Trade</th>
                    <th>Grand total</th>
                </tr>
              </tfoot>
            </table>
            </div>
        </div>
      </div>
    </main>



<script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>
<script src="https://cdn.datatables.net/2.2.2/js/dataTables.js"></script>


<script>

  // Formatting function for row details - modify as you need
  function format(d) {
      // `d` is the original data object for the row
      return (
          '<dl>' +
            '<dt>Full name:</dt>' +
            '<dd>' +
              d.name +
            '</dd>' +
            '<dt>Cash:</dt>' +
            '<dd>' +
              d.cash +
            '</dd>' +
            '<dt>Extra info:</dt>' +
              '<dd>And any further details here (images etc)...</dd>' + 
            '<dt>Start Date:</dt>' +
              d.start_date +
          '</dl>'
      );
  }
  
  let table = new DataTable('#example', {
      ajax: '/objects.txt',
      columns: [
          {
              className: 'dt-control',
              orderable: false,
              data: null,
              defaultContent: ''
          },
          { data: 'name' },
          { data: 'time' },
          { data: 'sub_total' },
          { data: 'sub_total_non_trade' },
          { data: 'grand_total' }
      ],
      order: [[1, 'asc']]
  });
  
  // Add event listener for opening and closing details
  table.on('click', 'td.dt-control', function (e) {
      let tr = e.target.closest('tr');
      let row = table.row(tr);
  
      if (row.child.isShown()) {
          // This row is already open - close it
          row.child.hide();
      }
      else {
          // Open this row
          row.child(format(row.data())).show();
      }
  });
 

  </script>
    
</body>

</html>
