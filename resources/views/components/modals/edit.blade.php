<!-- Edit modal -->
<div id="crud-modal" tabindex="-1" aria-hidden="true" class="bg-black bg-opacity-50 hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
  <div class="relative p-4 w-full max-w-7xl max-h-full">
      <!-- Modal content -->
      <div class="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">
          <!-- Modal header -->
          <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200">
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
                  UPDATE TRANSACTION
              </h3>
              <button type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="crud-modal">
                  <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                  </svg>
                  <span class="sr-only">Close modal</span>
              </button>
          </div>
          <!-- Modal body -->

          <div class="bg-white p-4">
            <div class="container-transaction mx-auto">

                {{-- First column for Cashier Form --}}
                <div class="bg-white rounded-lg shadow-md">
                    {{-- <form method="POST" action="route('transaction.update', $id)" id="editForm"> --}}
                    {{-- <form method="POST" action="{{ route('transaction.update', $id) }}" id="editForm"> --}}
                    <form method="POST" action="" id="editForm">
                    @csrf
                    @method('PUT')
                        <!-- FIRST ROW -->
                        <h2 class="shadow-md font-semibold text-lg mb-4 p-4">Payment Details:</h2>
                        <div class="bg-white mb-4 shadow-md grid grid-cols-3 gap-2 justify-items-start p-4">
                            <div class="w-full">
                                <label for="cash" class="block text-sm font-medium">Cash:</label>
                                <input type="number" id="cash" name="cash"
                                    class="w-full p-2 border border-gray-300 rounded-md" step="0.01">
                            </div>
                            <div class="w-full">
                                <label for="check" class="block text-sm font-medium">Check:</label>
                                <input type="number" id="check" name="check"
                                    class="w-full p-2 border border-gray-300 rounded-md">
                            </div>
                            <div class="w-full">
                                <label for="bpi_credit_card" class="block text-sm font-medium">BPI Credit
                                    Card:</label>
                                <input type="number" id="bpi_ccard" name="bpi_ccard"
                                    class="w-full p-2 border border-gray-300 rounded-md" step="0.01">
                            </div>
                            <div class="w-full">
                                <label for="bpi_debit_card" class="block text-sm font-medium">BPI Debit
                                    Card:</label>
                                <input type="number" id="bpi_dcard" name="bpi_dcard"
                                    class="w-full p-2 border border-gray-300 rounded-md" step="0.01">
                            </div>
                            <div class="w-full">
                                <label for="metro_credit_card" class="block text-sm font-medium">Metro Credit
                                    Card:</label>
                                <input type="number" id="metro_ccard" name="metro_ccard"
                                    class="w-full p-2 border border-gray-300 rounded-md" step="0.01">
                            </div>
                            <div class="w-full">
                                <label for="metro_debit_card" class="block text-sm font-medium">Metro Debit
                                    Card:</label>
                                <input type="number" id="metro_dcard" name="metro_dcard"
                                    class="w-full p-2 border border-gray-300 rounded-md" step="0.01">
                            </div>
                            <div class="w-full">
                                <label for="pay_maya" class="block text-sm font-medium">Pay Maya:</label>
                                <input type="number" id="paymaya" name="paymaya"
                                    class="w-full p-2 border border-gray-300 rounded-md" step="0.01">
                            </div>
                            <div class="w-full">
                                <label for="aub_credit_card" class="block text-sm font-medium">AUB Credit
                                    Card:</label>
                                <input type="number" id="aub_ccard" name="aub_ccard"
                                    class="w-full p-2 border border-gray-300 rounded-md" step="0.01">
                            </div>
                            <div class="w-full">
                                <label for="gcash" class="block text-sm font-medium">GCash:</label>
                                <input type="number" id="gcash" name="gcash"
                                    class="w-full p-2 border border-gray-300 rounded-md" step="0.01">
                            </div>
                            <div class="w-full">
                                <label for="food_panda" class="block text-sm font-medium">Food Panda:</label>
                                <input type="number" id="food_panda" name="food_panda"
                                    class="w-full p-2 border border-gray-300 rounded-md" step="0.01">
                            </div>
                            <div class="w-full">
                                <label for="streetby" class="block text-sm font-medium">StreetBy:</label>
                                <input type="number" id="streetby" name="streetby"
                                    class="w-full p-2 border border-gray-300 rounded-md" step="0.01">
                            </div>
                            <div class="w-full">
                                <label for="grabfood" class="block text-sm font-medium">Grab Food:</label>
                                <input type="number" id="grabfood" name="grabfood"
                                    class="w-full p-2 border border-gray-300 rounded-md" step="0.01">
                            </div>
                            <div class="w-full">
                                <label for="gc_claimed_others" class="block text-sm font-medium">GC Claimed
                                    (Others)</label>
                                <input type="number" id="gc_claimed_others" name="gc_claimed_others"
                                    class="w-full p-2 border border-gray-300 rounded-md" step="0.01">
                            </div>
                            <div class="w-full">
                                <label for="gc_claimed_own" class="block text-sm font-medium">GC Claimed
                                    (OWN)</label>
                                <input type="number" id="gc_claimed_own" name="gc_claimed_own"
                                    class="w-full p-2 border border-gray-300 rounded-md" step="0.01">
                            </div>
                        </div>

                        <!-- SECOND ROW -->
                        <h2 class="shadow-md font-semibold text-lg mb-4 p-4">MM Details:</h2>
                        <div class="bg-white mb-4 shadow-md p-4">
                            <!-- First row: Two columns -->
                            <div class="grid grid-cols-2 gap-2 mb-2">
                                <div class="w-full">
                                    <label for="mm_head" class="block text-sm font-medium">MM-HEAD
                                        OFFICE:</label>
                                    <input type="text" id="mm_head" name="mm_head"
                                        class="w-full p-3 border border-gray-300 rounded-md">
                                </div>

                                <div class="w-full">
                                    <label for="mm_commissary"
                                        class="block text-sm font-medium">MM-COMMISSARY:</label>
                                    <input type="text" id="mm_commissary" name="mm_commissary"
                                        class="w-full p-3 border border-gray-300 rounded-md">
                                </div>
                            </div>

                            <!-- Second row: Three columns -->
                            <div class="grid grid-cols-4 gap-2">
                                <div class="w-full">
                                    <label for="mm_rm" class="block text-sm font-medium">MM-RM:</label>
                                    <input type="text" id="mm_rm" name="mm_rm"
                                        class="w-full p-3 border border-gray-300 rounded-md">
                                </div>
                                <div class="w-full">
                                    <label for="mm_dm" class="block text-sm font-medium">MM-DM:</label>
                                    <input type="text" id="mm_dm" name="mm_dm"
                                        class="w-full p-3 border border-gray-300 rounded-md">
                                </div>
                                <div class="w-full">
                                    <label for="mm_km" class="block text-sm font-medium">MM-KM:</label>
                                    <input type="text" id="mm_km" name="mm_km"
                                        class="w-full p-3 border border-gray-300 rounded-md">
                                </div>
                                <div class="w-full">
                                    <label for="food_charge" class="block text-sm font-medium">FOOD
                                        CHARGE:</label>
                                    <input type="text" id="food_charge" name="food_charge"
                                        class="w-full p-3 border border-gray-300 rounded-md">
                                </div>
                            </div>
                        </div>

                        <!-- THIRD ROW -->
                        <h2 class="shadow-md font-semibold text-lg mb-4 p-4">Z Reading POS:</h2>
                        <div class="bg-white mb-4 shadow-md grid grid-cols-3 gap-2 justify-items-start p-4">
                            <div class="w-full">
                                <label for="z_reading_pos" class="block text-sm font-medium">Z READING
                                    POS:</label>
                                <input type="text" id="z_reading_pos" name="z_reading_pos"
                                    class="w-full p-3 border border-gray-300 rounded-md">
                            </div>
                        </div>
                </div>

                <!-- Second column for Gross Total (now placed in 3rd column) -->
                <div class="bg-white rounded-lg shadow-md">
                    <h2 class="shadow-md font-semibold text-lg mb-4 p-4">Shift Time:</h2>
                    <div class="grid grid-cols-1 gap-2 justify-items-start p-4 mb-8">
                        <div class="w-full">
                            {{-- <label for="cashier" class="block text-sm font-medium">Cashier's
                                Name:</label> --}}
                            <input type="hidden" id="cashier" name="cashier" value="{{ auth()->user()->id }}">
                        </div>
                        <div class="w-full">
                            <label for="time" class="block text-sm font-medium">Shift Time:</label>
                            <select id="time" name="time"
                                class="w-full p-2 border border-gray-300 rounded-md">
                                <option value="AM">AM</option>
                                <option value="MID">MID</option>
                                <option value="PM">PM</option>
                            </select>
                        </div>
                    </div>
                  <div class="flex items-center justify-start m-4">

                    <button type="submit" class="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                      Update
                    </button>
                  </div>
                    </form>

                    {{-- TOTAL --}}
                    <h2 class="shadow-md font-semibold text-lg p-4 mb-4">Summary:</h2>
                    <div class="w-full">
                        <label for="payment-gross" class="block text-sm font-bold px-4">Subtotal Trade
                            POS:</label>
                        <p id="sub_total_trade" class="text-md w-full py-2 border-gray-300 rounded-md px-4">P 0.00
                        </p>
                    </div>
                    <div class="w-full">
                        <label for="payment-gro ss" class="block text-sm font-bold px-4">Subtotal Non-Trade
                            POS:</label>
                        <p id="sub_total_non_trade" class="text-md w-full py-2 border-gray-300 rounded-md px-4">P
                            0.00
                        </p>
                    </div>
                    <div class="w-full">
                        <label for="payment-gross" class="block text-sm font-extrabold px-4">GRAND TOTAL
                            POS:</label>
                        <p id="grand_total" class="text-md w-full py-2 border-gray-300 rounded-md px-4">P 0.00</p>
                    </div>
                </div>
            </div>
          </div>
      </div>
  </div>
</div>

{{-- <script>
    function openModal(transactionId) {
        fetch(`/transaction/edit/${transactionId}`)
            .then(response => response.json())
            .then(data => {
                if (data) {
                    // Populate fields if data exists
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
                    document.getElementById('sub_total_non_trade').textContent = `P ${data.sub_total_non_trade ?? '0.00'}`;
                    document.getElementById('grand_total').textContent = `P ${data.grand_total ?? '0.00'}`;
                    document.getElementById('crud-modal').classList.remove('hidden');
                }
            })
            .catch(error => console.error('Error fetching transaction:', error));
    }
</script> --}}

{{-- edit modal toggle --}}

{{-- <script>
  document.addEventListener("DOMContentLoaded", function () {
      document.querySelectorAll("[data-modal-toggle]").forEach(button => {
          button.addEventListener("click", function () {
              const modalId = this.getAttribute("data-modal-toggle");
              const modal = document.getElementById(modalId);
              if (modal) {
                  modal.classList.toggle("hidden");
                  modal.classList.toggle("flex"); // Ensures proper display
              }
          });
      });
  });
</script> --}}
