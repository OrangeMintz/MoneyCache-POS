@include('layouts.header')
<main>
    <div class="font-sans bg-gray-100 dark:bg-gray-800 dark:text-gray-100 p-6">
        <div class="bg-white dark:bg-gray-900 p-4">
            {{-- <h5 class="title font-semibold text-[26px]">Add Transaction</h5> --}}
            <div class="container-transaction mx-auto">
                {{-- First column for Cashier Form --}}
                <div class="bg-white dark:bg-gray-900 rounded-lg shadow-md">
                    <form method="POST" action="{{ route('transaction.store') }}" id="storeForm">
                        @csrf
                        <!-- FIRST ROW -->
                        <h2 class="shadow-md font-semibold text-lg mb-4 p-4">Payment Details:</h2>
                        <div
                            class="bg-white dark:bg-gray-900 mb-4 shadow-md grid grid-cols-4 gap-6 justify-items-start p-4">
                            <div class="w-full">
                                <label for="cash" class="block text-sm font-medium">Cash:</label>
                                <input type="number" id="cash" name="cash"
                                    class="w-full p-2 border dark:bg-gray-800 border-gray-300 dark:border-gray-700 rounded-md" step="0.01">
                            </div>
                            <div class="w-full">
                                <label for="check" class="block text-sm font-medium">Check:</label>
                                <input type="number" id="check" name="check"
                                    class="w-full p-2 border dark:bg-gray-800 border-gray-300 dark:border-gray-700 rounded-md">
                            </div>
                            <div class="w-full">
                                <label for="bpi_credit_card" class="block text-sm font-medium">BPI Credit
                                    Card:</label>
                                <input type="number" id="bpi_ccard" name="bpi_ccard"
                                    class="w-full p-2 border dark:bg-gray-800 border-gray-300 dark:border-gray-700 rounded-md"
                                    step="0.01">
                            </div>
                            <div class="w-full">
                                <label for="bpi_debit_card" class="block text-sm font-medium">BPI Debit
                                    Card:</label>
                                <input type="number" id="bpi_dcard" name="bpi_dcard"
                                    class="w-full p-2 border dark:bg-gray-800 border-gray-300 dark:border-gray-700 rounded-md"
                                    step="0.01">
                            </div>
                            <div class="w-full">
                                <label for="metro_credit_card" class="block text-sm font-medium">Metro Credit
                                    Card:</label>
                                <input type="number" id="metro_ccard" name="metro_ccard"
                                    class="w-full p-2 border dark:bg-gray-800 border-gray-300 dark:border-gray-700 rounded-md"
                                    step="0.01">
                            </div>
                            <div class="w-full">
                                <label for="metro_debit_card" class="block text-sm font-medium">Metro Debit
                                    Card:</label>
                                <input type="number" id="metro_dcard" name="metro_dcard"
                                    class="w-full p-2 border dark:bg-gray-800 border-gray-300 dark:border-gray-700 rounded-md"
                                    step="0.01">
                            </div>
                            <div class="w-full">
                                <label for="pay_maya" class="block text-sm font-medium">Pay Maya:</label>
                                <input type="number" id="paymaya" name="paymaya"
                                    class="w-full p-2 border dark:bg-gray-800 border-gray-300 dark:border-gray-700 rounded-md"
                                    step="0.01">
                            </div>
                            <div class="w-full">
                                <label for="aub_credit_card" class="block text-sm font-medium">AUB Credit
                                    Card:</label>
                                <input type="number" id="aub_ccard" name="aub_ccard"
                                    class="w-full p-2 border dark:bg-gray-800 border-gray-300 dark:border-gray-700 rounded-md"
                                    step="0.01">
                            </div>
                            <div class="w-full">
                                <label for="gcash" class="block text-sm font-medium">GCash:</label>
                                <input type="number" id="gcash" name="gcash"
                                    class="w-full p-2 border dark:bg-gray-800 border-gray-300 dark:border-gray-700 rounded-md"
                                    step="0.01">
                            </div>
                            <div class="w-full">
                                <label for="food_panda" class="block text-sm font-medium">Food Panda:</label>
                                <input type="number" id="food_panda" name="food_panda"
                                    class="w-full p-2 border dark:bg-gray-800 border-gray-300 dark:border-gray-700 rounded-md"
                                    step="0.01">
                            </div>
                            <div class="w-full">
                                <label for="streetby" class="block text-sm font-medium">StreetBy:</label>
                                <input type="number" id="streetby" name="streetby"
                                    class="w-full p-2 border dark:bg-gray-800 border-gray-300 dark:border-gray-700 rounded-md"
                                    step="0.01">
                            </div>
                            <div class="w-full">
                                <label for="grabfood" class="block text-sm font-medium">Grab Food:</label>
                                <input type="number" id="grabfood" name="grabfood"
                                    class="w-full p-2 border dark:bg-gray-800 border-gray-300 dark:border-gray-700 rounded-md"
                                    step="0.01">
                            </div>
                            <div class="w-full">
                                <label for="gc_claimed_others" class="block text-sm font-medium">GC Claimed
                                    (Others)</label>
                                <input type="number" id="gc_claimed_others" name="gc_claimed_others"
                                    class="w-full p-2 border dark:bg-gray-800 border-gray-300 dark:border-gray-700 rounded-md"
                                    step="0.01">
                            </div>
                            <div class="w-full">
                                <label for="gc_claimed_own" class="block text-sm font-medium">GC Claimed
                                    (OWN)</label>
                                <input type="number" id="gc_claimed_own" name="gc_claimed_own"
                                    class="w-full p-2 border dark:bg-gray-800 border-gray-300 dark:border-gray-700 rounded-md"
                                    step="0.01">
                            </div>
                        </div>

                        <!-- SECOND ROW -->
                        <h2 class="shadow-md font-semibold text-lg mb-4 p-4">MM Details:</h2>
                        <div class="bg-white dark:bg-gray-900 mb-4 shadow-md p-4">
                            <!-- First row: Two columns -->
                            <div class="grid grid-cols-2 mb-2 gap-6">
                                <div class="w-full">
                                    <label for="mm_head" class="block text-sm font-medium">MM-HEAD
                                        OFFICE:</label>
                                    <input type="text" id="mm_head" name="mm_head"
                                        class="w-full p-3 border dark:bg-gray-800 border-gray-300 dark:border-gray-700 rounded-md">
                                </div>

                                <div class="w-full">
                                    <label for="mm_commissary"
                                        class="block text-sm font-medium">MM-COMMISSARY:</label>
                                    <input type="text" id="mm_commissary" name="mm_commissary"
                                        class="w-full p-3 border dark:bg-gray-800 border-gray-300 dark:border-gray-700 rounded-md">
                                </div>
                            </div>

                            <!-- Second row: Three columns -->
                            <div class="grid grid-cols-4 gap-6">
                                <div class="w-full">
                                    <label for="mm_rm" class="block text-sm font-medium">MM-RM:</label>
                                    <input type="text" id="mm_rm" name="mm_rm"
                                        class="w-full p-3 border dark:bg-gray-800 border-gray-300 dark:border-gray-700 rounded-md">
                                </div>
                                <div class="w-full">
                                    <label for="mm_dm" class="block text-sm font-medium">MM-DM:</label>
                                    <input type="text" id="mm_dm" name="mm_dm"
                                        class="w-full p-3 border dark:bg-gray-800 border-gray-300 dark:border-gray-700 rounded-md">
                                </div>
                                <div class="w-full">
                                    <label for="mm_km" class="block text-sm font-medium">MM-KM:</label>
                                    <input type="text" id="mm_km" name="mm_km"
                                        class="w-full p-3 border dark:bg-gray-800 border-gray-300 dark:border-gray-700 rounded-md">
                                </div>
                                <div class="w-full">
                                    <label for="food_charge" class="block text-sm font-medium">FOOD
                                        CHARGE:</label>
                                    <input type="text" id="food_charge" name="food_charge"
                                        class="w-full p-3 border dark:bg-gray-800 border-gray-300 dark:border-gray-700 rounded-md">
                                </div>
                            </div>
                        </div>

                        <!-- THIRD ROW -->
                        <h2 class="shadow-md font-semibold text-lg mb-4 p-4">Z Reading POS:</h2>
                        <div
                            class="bg-white dark:bg-gray-900 mb-4 shadow-md grid grid-cols-3 gap-2 justify-items-start p-4">
                            <div class="w-full">
                                <label for="z_reading_pos" class="block text-sm font-medium">Z READING
                                    POS:</label>
                                <input type="text" id="z_reading_pos" name="z_reading_pos"
                                    class="w-full p-3 border dark:bg-gray-800 border-gray-300 dark:border-gray-700 rounded-md">
                            </div>
                        </div>
                </div>

                <!-- Second column for Gross Total (now placed in 3rd column) -->
                <div class="bg-white dark:bg-gray-900 rounded-lg shadow-md">
                    <h2 class="shadow-md font-semibold text-lg mb-4 p-4">Shift Time:</h2>
                    <div class="grid grid-cols-1 gap-2 justify-items-start p-4 mb-8">
                        <div class="w-full">
                            <label for="cashier_id" class="block text-sm font-medium">Cashier's
                                Name:</label>
                            <input type="hidden" id="cashier_id" name="cashier_id" value="{{ auth()->user()->id }}"
                                class="w-full p-3 border dark:bg-gray-800 border-gray-300 dark:border-gray-700 rounded-md">
                            <input type="text" value="{{ auth()->user()->name }}" disabled
                                class="w-full p-3 border bg-gray-200 dark:bg-gray-600 border-gray-300 dark:border-gray-700 rounded-md">
                        </div>
                        <div class="w-full">
                            <label for="time" class="block text-sm font-medium">Shift Time:</label>
                            <select id="time" name="time"
                                class="w-full p-2 border dark:bg-gray-800 border-gray-300 dark:border-gray-700 rounded-md">
                                @foreach (['AM', 'MID', 'PM'] as $shift)
                                    <option value="{{ $shift }}"
                                        {{ in_array($shift, $availableTimes) ? '' : 'disabled' }}>
                                        {{ $shift }}
                                    </option>
                                @endforeach
                            </select>
                        </div>
                    </div>
                    <div class="flex items-center justify-start m-4">
                        <button type="submit"
                            class="py-3 px-6 bg-green-600 text-white rounded-md hover:bg-green-500 transition">Submit</button>
                    </div>
                    </form>

                    {{-- TOTAL --}}
                    <h2 class="shadow-md font-semibold text-lg p-4 mb-4">Summary:</h2>
                    <div class="w-full">
                        <label for="payment-gross" class="block text-sm font-bold px-4">Subtotal Trade
                            POS:</label>
                        <p id="sub_total_trade"
                            class="text-md w-full py-2 border-gray-300 dark:border-gray-700 rounded-md px-4">P 0.00
                        </p>
                    </div>
                    <div class="w-full">
                        <label for="payment-gro ss" class="block text-sm font-bold px-4">Subtotal Non-Trade
                            POS:</label>
                        <p id="sub_total_non_trade"
                            class="text-md w-full py-2 border-gray-300 dark:border-gray-700 rounded-md px-4">P
                            0.00
                        </p>
                    </div>
                    <div class="w-full">
                        <label for="payment-gross" class="block text-sm font-extrabold px-4">GRAND TOTAL
                            POS:</label>
                        <p id="grand_total"
                            class="text-md w-full py-2 border-gray-300 dark:border-gray-700 rounded-md px-4">P 0.00</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</main>

@include('layouts.footer')


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
{{-- STORE Transaction validation: no negative, atleast one field is filled --}}
<script>
    document.addEventListener("DOMContentLoaded", function() {
        const form = document.getElementById("storeForm");

        form.addEventListener("submit", function(event) {
            let isValid = true;
            let hasValidPayment = false;
            const paymentFields = [
                "cash", "check", "bpi_ccard", "bpi_dcard", "metro_ccard", "metro_dcard", "paymaya",
                "aub_ccard", "gcash", "food_panda", "streetby", "grabfood", "gc_claimed_others",
                "gc_claimed_own"
            ];
            paymentFields.forEach((field) => {
                let input = document.getElementById(field);
                let value = input.value.trim();
                let errorElement = input.nextElementSibling;

                if (!errorElement || !errorElement.classList.contains("error-message")) {
                    errorElement = document.createElement("div");
                    errorElement.classList.add("error-message");
                    errorElement.style.color = "red";
                    errorElement.style.fontSize = "12px";
                    input.after(errorElement);
                }

                //if value is filled
                if (value !== "") {
                    if (isNaN(value) || Number(value) <= 0) {
                        errorElement.textContent = "Please enter a positive number.";
                        input.classList.add("border-red-500");
                        isValid = false;
                    } else {
                        errorElement.textContent = "";
                        input.classList.remove("border-red-500");
                        hasValidPayment = true;
                    }
                } else {
                    errorElement.textContent = "";
                    input.classList.remove("border-red-500");
                }
            });

            if (!hasValidPayment) {
                event.preventDefault(); // Stop form submission
                toastr.error("Please enter at least one valid payment amount.");
            }

            // If there are any invalid inputs, stop form submission
            if (!isValid) {
                event.preventDefault();
            }
        });
    });
</script>
</body>

</html>
