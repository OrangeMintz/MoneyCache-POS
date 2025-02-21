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
                                        <th>Shift</th>
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
                                    @foreach ($transactions as $transaction)
                                        <tr>
                                            <td class="border">{{ $transaction->cashier }}</td>
                                            <td class="border">{{ $transaction->time }}</td>
                                            <td class="border">{{ $transaction->cash }}</td>
                                            <td class="border">{{ $transaction->check }}</td>
                                            <td class="border">{{ $transaction->bpi_ccard }}</td>
                                            <td class="border">{{ $transaction->bpi_dcard }}</td>
                                            <td class="border">{{ $transaction->metro_ccard }}</td>
                                            <td class="border">{{ $transaction->metro_dcard }}</td>
                                            <td class="border">{{ $transaction->paymaya }}</td>
                                            <td class="border">{{ $transaction->aub_ccard }}</td>
                                            <td class="border">{{ $transaction->gcash }}</td>
                                            <td class="border">{{ $transaction->food_panda }}</td>
                                            <td class="border">{{ $transaction->streetby }}</td>
                                            <td class="border">{{ $transaction->grabfood }}</td>
                                            <td class="border">{{ $transaction->gc_claimed_others }}</td>
                                            <td class="border">{{ $transaction->gc_claimed_own }}</td>
                                            <td class="border border-gray-300 px-4">
                                                <div class="flex gap-2">
                                                    <button data-modal-target="crud-modal"
                                                        data-modal-toggle="crud-modal"
                                                        class="w-20 px-3 py-1 text-white bg-blue-500 rounded hover:bg-blue-600"
                                                        type="button">
                                                        Edit
                                                    </button>
                                                    <form
                                                        action="{{ route('transactions.softDelete', $transaction->id) }}"
                                                        method="POST" onsubmit="return confirmation(event)">
                                                        @csrf
                                                        @method('DELETE')
                                                        <button type="submit"
                                                            class="w-20 px-3 py-1 text-white bg-red-500 rounded hover:bg-red-600">Delete</button>
                                                    </form>
                                                </div>
                                            </td>
                                        </tr>
                                </tbody>
                                @endforeach
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</main>

<!-- Main modal -->
<div id="crud-modal" tabindex="-1" aria-hidden="true"
    class="bg-black bg-opacity-50 hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
    <div class="relative p-4 w-full max-w-3xl max-h-full">
        <!-- Modal content -->
        <div class="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">
            <!-- Modal header -->
            <div
                class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200">
                <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
                    Update the Transaction
                </h3>
                <button type="button"
                    class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                    data-modal-toggle="crud-modal">
                    <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                        viewBox="0 0 14 14">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                    </svg>
                    <span class="sr-only">Close modal</span>
                </button>
            </div>
            <!-- Modal body -->
            <form class="p-4 md:p-5">
                <div class="grid gap-4 mb-4 grid-cols-3 md:grid-cols-5">
                    <div class="col-span-2 sm:col-span-3">
                        <label for="name"
                            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                        <input type="text" name="name" id="name"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                            placeholder="Type product name" required="">
                    </div>
                    <div class="col-span-1 sm:col-span-2">
                        <label for=""
                            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Shift</label>
                        <select id=""
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                            <option selected="" value="AM">AM</option>
                            <option value="MID">MID</option>
                            <option value="PM">PM</option>
                        </select>
                    </div>
                    <div class="col-span-1 sm:col-span-1">
                        <label for=""
                            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Cash</label>
                        <input type="number" name="" id=""
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                            placeholder="$299" required="">
                    </div>
                    <div class="col-span-1 sm:col-span-1">
                        <label for=""
                            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Check</label>
                        <input type="number" name="" id=""
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                            placeholder="$299" required="">
                    </div>
                    <div class="col-span-1 sm:col-span-1">
                        <label for="" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">BPI
                            C. Card</label>
                        <input type="number" name="" id=""
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                            placeholder="$299" required="">
                    </div>
                    <div class="col-span-1 sm:col-span-1">
                        <label for="" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">BPI
                            D. Card</label>
                        <input type="number" name="" id=""
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                            placeholder="$299" required="">
                    </div>
                    <div class="col-span-1 sm:col-span-1">
                        <label for=""
                            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Metro C. Card</label>
                        <input type="number" name="" id=""
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                            placeholder="$299" required="">
                    </div>
                    <div class="col-span-1 sm:col-span-1">
                        <label for=""
                            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Metro D. Card</label>
                        <input type="number" name="" id=""
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                            placeholder="$299" required="">
                    </div>
                    <div class="col-span-1 sm:col-span-1">
                        <label for="" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Pay
                            Maya</label>
                        <input type="number" name="" id=""
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                            placeholder="$299" required="">
                    </div>
                    <div class="col-span-1 sm:col-span-1">
                        <label for="" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">AUB
                            C. Card</label>
                        <input type="number" name="" id=""
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                            placeholder="$299" required="">
                    </div>
                    <div class="col-span-1 sm:col-span-1">
                        <label for=""
                            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">GCash</label>
                        <input type="number" name="" id=""
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                            placeholder="$299" required="">
                    </div>
                    <div class="col-span-1 sm:col-span-1">
                        <label for=""
                            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Food Panda</label>
                        <input type="number" name="" id=""
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                            placeholder="$299" required="">
                    </div>
                    <div class="col-span-1 sm:col-span-1">
                        <label for=""
                            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">StreetBy</label>
                        <input type="number" name="" id=""
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                            placeholder="$299" required="">
                    </div>
                    <div class="col-span-1 sm:col-span-1">
                        <label for=""
                            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Grab food</label>
                        <input type="number" name="" id=""
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                            placeholder="$299" required="">
                    </div>
                    <div class="col-span-1 sm:col-span-1">
                        <label for="" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">GC
                            Otheres</label>
                        <input type="number" name="" id=""
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                            placeholder="$299" required="">
                    </div>
                    <div class="col-span-1 sm:col-span-1">
                        <label for="" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">GC
                            Own</label>
                        <input type="number" name="" id=""
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                            placeholder="$299" required="">
                    </div>

                </div>
                <button type="submit"
                    class="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    Update Transaction
                </button>
            </form>
        </div>
    </div>
</div>

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

<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
<script src="https://code.jquery.com/jquery-3.7.1.min.js"
    integrity="sha256-/JqT3SQfawRcv/BIHPThkBvs0OEvtFFmqPF/lYI/Cxo=" crossorigin="anonymous"></script>
<script src="https://cdn.datatables.net/2.2.2/js/dataTables.js"></script>

{{-- Initialize datatable --}}
<script type="text/javascript">
    $(document).ready(function() {
        $('.datatable').DataTable();
    })
</script>

{{-- modal toggle --}}
<script>
    document.addEventListener("DOMContentLoaded", function() {
        document.querySelectorAll("[data-modal-toggle]").forEach(button => {
            button.addEventListener("click", function() {
                const modalId = this.getAttribute("data-modal-toggle");
                const modal = document.getElementById(modalId);
                if (modal) {
                    modal.classList.toggle("hidden");
                    modal.classList.toggle("flex"); // Ensures proper display
                }
            });
        });
    });
</script>

</body>

</html>
