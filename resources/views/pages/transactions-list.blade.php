@include('layouts.header')
@include('components.modals.edit')

<main>
    <div class="font-sans bg-gray-100 dark:bg-gray-800 dark:text-gray-100 p-6">
        <div class="bg-white dark:bg-gray-900 p-4 mb-4">
            <div class="card-header flex justify-between items-center">
                <h5 class="title font-semibold text-[26px]">Manage Transactions</h5>

                @if (auth()->user()->role === 'admin')
                    <div class="flex flex-wrap justify-center">
                        <a href="{{ route('transactions.sheet', ['date' => now()->format('Y-m-d')]) }}"
                            class="bg-amber-500 hover:bg-amber-600 rounded-lg text-white text-md text-center self-center px-4 py-2">
                            Sheets
                            <i class="fas fa-file-export"></i>
                        </a>
                    </div>
                @endif
            </div>
            <div class="overflow-x-auto">
                <table id="example" class="display" style="width:100%">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Date</th>
                            <th>Time</th>
                            <th>Sub-Total</th>
                            <th>Sub-Total Non Trade</th>
                            <th>Grand total</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                </table>
            </div>
        </div>
    </div>
    <div style="background: rgb(0, 235, 235)"></div>
</main>
@include('layouts.footer')

<script>
    // Formatting function for row details - modify as you need
    function format(d) {
        let details = `<div class="px-3 py-4 bg-white dark:bg-gray-800 dark:text-white">`;

        let formatCurrency = (amount) => `₱${parseFloat(amount).toLocaleString('en-PH', { minimumFractionDigits: 2 })}`;

        let tradeFields = {};
        let data = {
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

        // Loop through each field and add only non-empty values
        for (let key in data) {
            if (data[key]) { // If value is not null, undefined, or 0
                tradeFields[key] = formatCurrency(data[key]);
            }
        }

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
                .map(([key, value]) => `<p style="margin: .4rem 0;">${key}: ${value}</p>`)
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
                data: 'cashier.name',
                render: function(data) {
                    return data ? data : '-';
                }
            },
            {
                data: 'created_at',
                render: function(data) {
                    if (!data) return '';
                    let date = new Date(data);
                    return date.toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                    });
                }
            },
            {
                data: 'time'
            },
            {
                data: 'sub_total_trade',
                render: function(data) {
                    return data ?
                        `₱ ${parseFloat(data).toLocaleString('en-PH', { minimumFractionDigits: 2 })}` :
                        '₱ 0.00';
                }
            },
            {
                data: 'sub_total_non_trade',
                render: function(data) {
                    return data ?
                        `₱ ${parseFloat(data).toLocaleString('en-PH', { minimumFractionDigits: 2 })}` :
                        '₱ 0.00';
                }
            },
            {
                data: 'grand_total',
                render: function(data) {
                    return data ?
                        `₱ ${parseFloat(data).toLocaleString('en-PH', { minimumFractionDigits: 2 })}` :
                        '₱ 0.00';
                }
            },
            {
                data: 'id',
                render: function(data, type, row) {
                    return `
                    <div style="display: flex; gap: 0.5rem; justify-content: center;">
                        <button data-modal-target="crud-modal" class="w-20 px-3 py-1 text-white bg-blue-500 rounded hover:bg-blue-600"
                            onclick="openModal('${data}')"
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
            [2, 'desc']
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

{{-- DELETE FUNCTIONS --}}
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

{{-- CALCULATE TOTAL --}}
<script>
    // Function to open the modal

    function openModal(id) {
        console.log("Opening modal for ID:", id);
        const modal = document.getElementById("crud-modal");
        modal.classList.remove("hidden");
        modal.classList.add("flex");

        // Update form action dynamically
        document.getElementById('editForm').action = `/transaction/${id}`;

        // Fetch transaction data via AJAX
        fetch(`/transaction/edit/${id}`)
            .then(response => response.json())
            .then(data => {
                if (data) {
                    document.getElementById('cash').value = data.cash ?? '';
                    document.getElementById('check').value = data.check ?? '';
                    document.getElementById('bpi_ccard').value = data.bpi_ccard ?? '';
                    document.getElementById('bpi_dcard').value = data.bpi_dcard ?? '';
                    document.getElementById('metro_ccard').value = data.metro_ccard ?? '';
                    document.getElementById('metro_dcard').value = data.metro_dcard ?? '';
                    document.getElementById('paymaya').value = data.paymaya ?? '';
                    document.getElementById('aub_ccard').value = data.aub_ccard ?? '';
                    document.getElementById('gcash').value = data.gcash ?? '';
                    document.getElementById('food_panda').value = data.food_panda ?? '';
                    document.getElementById('streetby').value = data.streetby ?? '';
                    document.getElementById('grabfood').value = data.grabfood ?? '';
                    document.getElementById('gc_claimed_others').value = data.gc_claimed_others ?? '';
                    document.getElementById('gc_claimed_own').value = data.gc_claimed_own ?? '';
                    document.getElementById('mm_head').value = data.mm_head ?? '';
                    document.getElementById('mm_commissary').value = data.mm_commissary ?? '';
                    document.getElementById('mm_rm').value = data.mm_rm ?? '';
                    document.getElementById('mm_dm').value = data.mm_dm ?? '';
                    document.getElementById('mm_km').value = data.mm_km ?? '';
                    document.getElementById('food_charge').value = data.food_charge ?? '';
                    document.getElementById('z_reading_pos').value = data.z_reading_pos ?? '';
                    document.getElementById('time').value = data.time ?? 'AM';
                    document.getElementById('sub_total_trade').textContent = `P ${data.sub_total_trade ?? '0.00'}`;
                    document.getElementById('sub_total_non_trade').textContent =
                        `P ${data.sub_total_non_trade ?? '0.00'}`;
                    document.getElementById('grand_total').textContent = `P ${data.grand_total ?? '0.00'}`;
                }
            })
            .catch(error => console.error('Error fetching transaction:', error));
    }


    // Function to close the modal when clicking outside or close button
    document.addEventListener("DOMContentLoaded", function() {
        document.querySelectorAll("[data-modal-toggle]").forEach(button => {
            button.addEventListener("click", function() {
                const modal = document.getElementById("crud-modal");
                modal.classList.add("hidden");
                modal.classList.remove("flex");
            });
        });

        // Close modal when clicking outside modal content
        document.getElementById("crud-modal").addEventListener("click", function(e) {
            if (e.target === this) {
                this.classList.add("hidden");
                this.classList.remove("flex");
            }
        });
    });
</script>

{{-- toaster for update notification --}}
<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/toastr.min.js"></script>
<script>
    document.addEventListener("DOMContentLoaded", function() {
        const tradeFields = [
            "cash", "check", "bpi_ccard", "bpi_dcard", "metro_ccard",
            "metro_dcard", "paymaya", "aub_ccard", "gcash",
            "food_panda", "streetby", "grabfood", "gc_claimed_others", "gc_claimed_own"
        ];

        const nonTradeFields = [
            "mm_rm", "mm_dm", "mm_km", "food_charge"
        ];

        function calculateTotal(fields) {
            return fields.reduce((total, id) => {
                const input = document.getElementById(id);
                return total + (input && input.value ? parseFloat(input.value) : 0);
            }, 0);
        }

        function updateTotals() {
            const subTotalTrade = calculateTotal(tradeFields);
            const subTotalNonTrade = calculateTotal(nonTradeFields);
            const grandTotal = subTotalTrade + subTotalNonTrade;

            document.getElementById("sub_total_trade").textContent =
                `P ${subTotalTrade.toLocaleString('en-PH', { minimumFractionDigits: 2 })}`;
            document.getElementById("sub_total_non_trade").textContent =
                `P ${subTotalNonTrade.toLocaleString('en-PH', { minimumFractionDigits: 2 })}`;
            document.getElementById("grand_total").textContent =
                `P ${grandTotal.toLocaleString('en-PH', { minimumFractionDigits: 2 })}`;
        }

        [...tradeFields, ...nonTradeFields].forEach(id => {
            const input = document.getElementById(id);
            if (input) {
                input.addEventListener("input", updateTotals);
            }
        });

        updateTotals();
    });
</script>
</body>
