<style>
    /* Ensure child rows expand properly */
    /* Ensure child rows expand properly */
    .child-row {
        display: flex;
        flex-wrap: wrap;
        gap: 1rem;
        padding: 1rem;
    }

    /* Allow details-card to expand naturally */
    .details-card {
        flex: 1 1 auto;
        /* Allow dynamic expansion */
        max-width: 100%;
        min-width: 280px;
        /* Prevent overly narrow cards */
        overflow-wrap: break-word;
        word-wrap: break-word;
        word-break: break-word;
        white-space: normal;
    }

    #logsTable td {
        text-transform: capitalize;
    }

    /* Ensure even layout on larger screens */
    @media (min-width: 768px) {
        .details-card {
            flex: 1 1 45%;
            /* Allows each card to take half width but still dynamic */
        }
    }
</style>


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
                    <th>Log Type</th>
                    <th>Action</th>
                    <th>Activity Description</th>
                    <th>Date & Time</th>
                </tr>
            </thead>
        </table>
    </div>
</div>

<script>
    document.addEventListener("DOMContentLoaded", function() {
        let logsTable = new DataTable('#logsTable', {
            ajax: '/dashboard/logs/fetch',
            columns: [{
                    className: 'dt-control',
                    orderable: false,
                    data: null,
                    defaultContent: ''
                },
                {
                    data: 'user.name'
                },
                {
                    data: 'category',
                    render: function(data) {
                        let colorClass = {
                            'update': 'text-blue-500',
                            'delete': 'text-red-500',
                            'add': 'text-green-500',
                            'restore': 'text-yellow-500',

                        } [data.toLowerCase()] || 'text-black'; // Default color

                        return `<span class="${colorClass} text-sm">${data}</span>`;
                    }
                },
                {
                    data: 'message'
                },
                {
                    data: 'type',
                    render: function(data) {
                        let bgClass = {
                            'user': 'bg-blue-500',
                            'transaction': 'bg-green-500',
                            'attendance': 'bg-gray-500'
                        } [data.toLowerCase()] || 'bg-gray-500';
                        return `<span class="px-1 text-sm rounded-lg text-white ${bgClass}">${data}</span>`;
                    }
                },
                {
                    data: 'created_at',
                    type: 'datetime', // Ensure DataTables recognizes it as a date
                    render: function(data, type, row) {
                        let date = new Date(data);
                        if (type === 'display') {
                            return date.toLocaleString('en-US', {
                                year: 'numeric',
                                month: '2-digit',
                                day: '2-digit',
                                hour: '2-digit',
                                minute: '2-digit',
                                second: '2-digit',
                                hour12: true
                            }).replace(',', '');
                        }
                        return date.getTime(); // Return timestamp for correct sorting
                    }
                }
            ],
            order: [
                [5, 'desc']
            ]
        });

        let userPlaceholderImage = "{{ asset('img/user.png') }}";

        function format(d) {
            return `
            <div class="child-row">
                <div class="details-card bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm rounded-lg p-5">
                    <h2 class="text-md font-semibold text-gray-900 dark:text-white mb-2">User Details</h2>
                    <div class="relative bg-gray-50 dark:bg-gray-700 dark:border-gray-600 p-4 rounded-lg border border-gray-200 grid grid-cols-2">
                        <div class="text-sm space-y-1 text-gray-500 dark:text-gray-400 leading-loose hidden sm:block">
                            Name <br> Email <br> Role
                        </div>
                        <div class="text-sm space-y-1 text-gray-900 dark:text-white font-medium normal-case leading-loose">
                            ${d.user.name} <br>
                            ${d.user.email} <br>
                            ${d.user.role}
                        </div>
                    </div>
                </div>

                <div class="details-card bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm rounded-lg p-5">
                    <h2 class="text-md font-semibold text-gray-900 dark:text-white mb-2">
                        ${d.type.toLowerCase() === 'attendance' ? 'Attendance Details' : d.type.toLowerCase() === 'transaction' ? 'Transaction Details' : 'Activity User Details'}
                    </h2>
                    <div class="relative bg-gray-50 dark:bg-gray-700 dark:border-gray-600 p-4 rounded-lg border border-gray-200 ${d.type.toLowerCase() === 'attendance' ? 'grid grid-cols-3' : 'grid grid-cols-2'}">
                        ${d.type.toLowerCase() === 'attendance' ? `
                        <!-- User Image Column -->
                        <div class="flex justify-start items-center">
                            <img src="${d.attendance.photo ? d.attendance.photo : userPlaceholderImage}" alt="Attendance Photo" class="w-24 h-24 object-cover rounded-full border-2 border-gray-300 shadow-sm">
                        </div>` : ''}
                        <div class="text-sm space-y-1 text-gray-500 dark:text-gray-400 leading-loose hidden sm:block">
                            ${getFieldLabels(d)}
                        </div>
                        <div class="text-sm space-y-1 text-gray-900 dark:text-white font-medium leading-loose normal-case">
                            ${getFieldValues(d)}
                        </div>
                    </div>
                </div>
            </div>`;
        }

        function getFieldLabels(d) {
            if (d.type.toLowerCase() === 'user') {
                return 'Name <br> Email <br> Rate <br> Role';
            } else if (d.type.toLowerCase() === 'transaction') {
                return 'Sub Total Trade <br> Sub Total Non-trade <br> Grand Total <br> Shift';
            } else if (d.type.toLowerCase() === 'attendance') {
                return 'Action <br> Activity <br> Time';
            }
            return '';
        }

        function getFieldValues(d) {
            if (d.type.toLowerCase() === 'user' && d.activity_user) {
                return `${d.activity_user.name} <br> ${d.activity_user.email} <br> ${d.activity_user.rate} <br> ${d.activity_user.role}`;
            } else if (d.type.toLowerCase() === 'transaction' && d.transaction) {
                return `${d.transaction.sub_total_trade} <br> ${d.transaction.sub_total_non_trade} <br> ${d.transaction.grand_total} <br> ${d.transaction.time}`;
            } else if (d.type.toLowerCase() === 'attendance') {
                return `${d.category} <br> ${d.message} <br> ${new Date(d.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })}`;
            }
            return '';
        }

        document.querySelector("#logsTable tbody").addEventListener("click", function(e) {
            let td = e.target.closest("td.dt-control");
            if (!td) return;

            let tr = td.closest("tr");
            let row = logsTable.row(tr);

            if (row.child.isShown()) {
                row.child.hide();
                tr.classList.remove("details-expanded");
            } else {
                row.child(format(row.data())).show();
                tr.classList.add("details-expanded");
            }
        });
    });
</script>
