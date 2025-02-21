@include('layouts.header')
@include('components.modals.edit')

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
                            <th>Actions</th>
                        </tr>
                    </thead>
                </table>
                {{-- <button data-modal-target="crud-modal" data-modal-toggle="crud-modal"
                    class="w-20 px-3 py-1 text-white bg-blue-500 rounded hover:bg-blue-600" type="button">
                    Edit
                </button> --}}
                {{-- <button class="w-20 px-3 py-1 text-white bg-red-500 rounded hover:bg-red-600"
                    onclick="confirmation(event)">
                    Delete
                </button> --}}

            </div>
        </div>
    </div>
</main>


<script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>
<script src="https://cdn.datatables.net/2.2.2/js/dataTables.js"></script>



<script>
    // Formatting function for row details - modify as you need
    function format(d) {
        let details = "<dl>";

        // Define the fields you want to check dynamically
        let tradeFields = {
            "Cash": d.cash,
            "Check": d.check,
            "BPI Credit Card": d.bpi_ccard,
            "BPI Debit Card": d.bpi_dcard,
            "Metro Credit Card": d.metro_ccard,
            "Metro Debit Card": d.metro_dcard,
            "PayMaya": d.paymaya,
            "AUB Credit Card": d.aub_ccard,
            "GCash": d.gcash,
            "Food Panda": d.food_panda,
            "StreetBy": d.streetby,
            "Grab Food": d.grabfood,
            "GC Claimed (Others)": d.gc_claimed_others,
            "GC Claimed (Own)": d.gc_claimed_own
        };

        let nonTradeFields = {
            "MM Head Office": d.mm_head,
            "MM Commissary": d.mm_commissary,
            "MM RM": d.mm_rm,
            "MM DM": d.mm_dm,
            "MM KM": d.mm_km,
            "Food Charge": d.food_charge
        };

        // Function to format and display only fields with values
        function formatFields(fields) {
            return Object.entries(fields)
                .filter(([key, value]) => value && value != 0) // Show only non-empty values
                .map(([key, value]) => `<p>${key}: ${value}</p>`)
                .join("");
        }

        // Build the final details output
        let tradeDetails = formatFields(tradeFields);
        let nonTradeDetails = formatFields(nonTradeFields);

        if (tradeDetails) {
            details += `<strong>Trade Transactions:</strong> ${tradeDetails}`;
        }
        if (nonTradeDetails) {
            details += `<strong>Non-Trade Transactions:</strong> ${nonTradeDetails}`;
        }

        return details || "<p>No additional transaction details available.</p>";
    }

    let table = new DataTable('#example', {
        ajax: '/transactions', // Fetch data from your Laravel route
        columns: [{
                className: 'dt-control',
                orderable: false,
                data: null,
                defaultContent: ''
            },
            {
                data: 'cashier.name'

            },
            {
                data: 'time'
            },
            {
                data: 'sub_total_trade'
            },
            {
                data: 'sub_total_non_trade'
            },
            {
                data: 'grand_total'
            },

            {
                data: 'id',
                // <button class="delete-btn px-3 py-1 text-white bg-red-500 rounded hover:bg-red-600" data-id="">Delete</button>
                // <button class="delete-btn px-3 py-1 text-white bg-red-500 rounded hover:bg-red-600" onclick="return confirmation(event)" data-id="${data}">Delete</button>
                render: function(data, type, row) {
                    return `
                    <div style="display: flex; gap: 0.5rem; justify-content: center;">
                        <button data-modal-target="crud-modal"  class="w-20 px-3 py-1 text-white bg-blue-500 rounded hover:bg-blue-600" 
                            onclick="openModal('${data}')"
                            data-id="${data}"
                            data-modal-toggle="crud-modal">Edit</button>
                        <form method="POST" class="delete-form" action="/transactions/${data}" onsubmit="return confirmation(event)">
                            @csrf
                            @method('DELETE')
                            <button type="submit" class="w-20 px-3 py-1 text-white bg-red-500 rounded hover:bg-red-600">Delete</button>
                        </form>
                    </div>

                `;
                }
            }
        ],
        order: [
            [1, 'asc']
        ]
    });

    // Add event listener for opening and closing details
    table.on('click', 'td.dt-control', function(e) {
        let tr = e.target.closest('tr');
        let row = table.row(tr);

        if (row.child.isShown()) {
            // This row is already open - close it
            row.child.hide();
        } else {
            // Open this row
            row.child(format(row.data())).show();
        }
    });
</script>

<script>
    document.querySelectorAll('.delete-form').forEach(form => {
    let transactionId = "${data}";
    form.action = "{{ route('transactions.softDelete', '__id__') }}".replace('__id__', transactionId);
    });

</script>

<script>
    function confirmation(event) {
        event.preventDefault();
        swal({
                title: "Are you sure you want to delete this?",
                text: "You won't be able to revert this action!",
                icon: "warning",
                buttons: true,
                dangerMode: true,
            })
            .then((willDelete) => {
                if (willDelete) {
                    event.target.closest("form").submit(); // Submit the form
                }
            });
    }
</script>

{{--  --}}
<script>

    
// Function to open the modal
function openModal(transactionId) {
    console.log("Opening modal for ID:", transactionId);
    const modal = document.getElementById("crud-modal");
    modal.classList.remove("hidden");
    modal.classList.add("flex");
}

// Function to close the modal when clicking outside or close button
document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll("[data-modal-toggle]").forEach(button => {
        button.addEventListener("click", function () {
            const modal = document.getElementById("crud-modal");
            modal.classList.add("hidden");
            modal.classList.remove("flex");
        });
    });

    // Close modal when clicking outside modal content
    document.getElementById("crud-modal").addEventListener("click", function (e) {
        if (e.target === this) {
            this.classList.add("hidden");
            this.classList.remove("flex");
        }
    });
});



</script>
</body>
