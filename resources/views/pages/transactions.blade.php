@include('layouts.header')
<main>
    <div class="font-sans bg-gray-100 p-6">
        <div class="bg-white p-4">
            <div class="container mx-auto">

                {{-- First column for Cashier Form --}}
                <form action="" method="POST" class="bg-white rounded-lg shadow-md">


                    <!-- FIRST ROW -->
                    <h2 class="shadow-md font-semibold text-lg mb-4 p-4">Payment Details:</h2>
                    <div class="bg-white mb-4 shadow-md grid grid-cols-3 gap-2 justify-items-start p-4">

                        <div class="w-full col-span-3">
                            <label for="cashier_name" class="block text-sm font-medium">Cashier's Name:</label>
                            <input type="text" id="cashier_name" name="cashier_name"
                                class="w-full p-2 border border-gray-300 rounded-md" required>
                        </div>

                        <div class="w-full">
                            <label for="cash" class="block text-sm font-medium">Cash:</label>
                            <input type="number" id="cash" name="cash"
                                class="w-full p-2 border border-gray-300 rounded-md" step="0.01">
                        </div>

                        <div class="w-full">
                            <label for="check" class="block text-sm font-medium">Check:</label>
                            <input type="text" id="check" name="check"
                                class="w-full p-2 border border-gray-300 rounded-md">
                        </div>

                        <div class="w-full">
                            <label for="bpi_credit_card" class="block text-sm font-medium">BPI Credit Card:</label>
                            <input type="number" id="bpi_credit_card" name="bpi_credit_card"
                                class="w-full p-2 border border-gray-300 rounded-md" step="0.01">
                        </div>

                        <div class="w-full">
                            <label for="bpi_debit_card" class="block text-sm font-medium">BPI Debit Card:</label>
                            <input type="number" id="bpi_debit_card" name="bpi_debit_card"
                                class="w-full p-2 border border-gray-300 rounded-md" step="0.01">
                        </div>

                        <div class="w-full">
                            <label for="metro_credit_card" class="block text-sm font-medium">Metro Credit Card:</label>
                            <input type="number" id="metro_credit_card" name="metro_credit_card"
                                class="w-full p-2 border border-gray-300 rounded-md" step="0.01">
                        </div>

                        <div class="w-full">
                            <label for="metro_debit_card" class="block text-sm font-medium">Metro Debit Card:</label>
                            <input type="number" id="metro_debit_card" name="metro_debit_card"
                                class="w-full p-2 border border-gray-300 rounded-md" step="0.01">
                        </div>

                        <div class="w-full">
                            <label for="pay_maya" class="block text-sm font-medium">Pay Maya:</label>
                            <input type="number" id="pay_maya" name="pay_maya"
                                class="w-full p-2 border border-gray-300 rounded-md" step="0.01">
                        </div>

                        <div class="w-full">
                            <label for="aub_credit_card" class="block text-sm font-medium">AUB Credit Card:</label>
                            <input type="number" id="aub_credit_card" name="aub_credit_card"
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
                            <label for="food_panda" class="block text-sm font-medium">StreetBy:</label>
                            <input type="number" id="street_by" name="street_by"
                                class="w-full p-2 border border-gray-300 rounded-md" step="0.01">
                        </div>

                        <div class="w-full">
                            <label for="food_panda" class="block text-sm font-medium">Grab Food:</label>
                            <input type="number" id="grab_food" name="grab_food"
                                class="w-full p-2 border border-gray-300 rounded-md" step="0.01">
                        </div>

                    </div>

                    <!-- SECOND ROW -->
                    <h2 class="shadow-md font-semibold text-lg mb-4 p-4">MM Details:</h2>
                    <div class="bg-white mb-4 shadow-md grid grid-cols-3 gap-2 justify-items-start p-4">
                        <div class="w-full">
                            <label for="mm_head_office" class="block text-sm font-medium">MM-HEAD OFFICE:</label>
                            <input type="text" id="mm_head_office" name="mm_head_office"
                                class="w-full p-3 border border-gray-300 rounded-md">
                        </div>

                        <div class="w-full">
                            <label for="mm_commissary" class="block text-sm font-medium">MM-COMMISSARY:</label>
                            <input type="text" id="mm_commissary" name="mm_commissary"
                                class="w-full p-3 border border-gray-300 rounded-md">
                        </div>

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
                            <label for="food_change" class="block text-sm font-medium">FOOD CHANGE:</label>
                            <input type="text" id="food_change" name="food_change"
                                class="w-full p-3 border border-gray-300 rounded-md">
                        </div>
                    </div>

                    <!-- THIRD ROW -->
                    <h2 class="shadow-md font-semibold text-lg mb-4 p-4">Z Reading POS:</h2>
                    <div class="bg-white mb-4 shadow-md grid grid-cols-3 gap-2 justify-items-start p-4">
                        <div class="w-full">
                            <label for="z_reading_pos" class="block text-sm font-medium">Z READING POS:</label>
                            <input type="text" id="z_reading_pos" name="z_reading_pos"
                                class="w-full p-3 border border-gray-300 rounded-md">
                        </div>
                    </div>

                    <div class="flex items-center justify-start m-4">
                        <button type="submit"
                            class="py-3 px-6 bg-green-600 text-white rounded-md hover:bg-green-500 transition">Submit</button>
                    </div>

                </form>


                <!-- Second column for Gross Total (now placed in 3rd column) -->
                <div class="bg-white rounded-lg shadow-md">

                    <h2 class="shadow-md font-semibold text-lg mb-4 p-4">Shift Time:</h2>
                    <div class="grid grid-cols-1 gap-2 justify-items-start p-4 mb-8">
                        <div class="w-full">
                            <label for="shift_time" class="block text-sm font-medium">Shift Time:</label>
                            <select id="shift_time" name="shift_time"
                                class="w-full p-2 border border-gray-300 rounded-md">
                                <option value="AM">AM</option>
                                <option value="MID">MID</option>
                                <option value="PM">PM</option>
                            </select>
                        </div>

                        <div class="w-full">
                            <label for="cashier_name" class="block text-sm font-medium">Cashier's Name:</label>
                            <input type="text" id="cashier_name" name="cashier_name"
                                class="w-full p-2 border border-gray-300 rounded-md" required>
                        </div>
                    </div>

                    <h2 class="shadow-md font-semibold text-lg p-4 mb-4">Summary:</h2>
                    <div class="grid grid-cols-1 gap-2 justify-items-start p-4 mb-2">
                        <div class="w-full">
                            <label for="payment-gross" class="block text-sm font-bold">Subtotal Trade POS:</label>
                            <p id="payment-gross" name="payment-gross"
                                class="text-md w-full py-2 border-gray-300 rounded-md">
                                P 107,105.00</p>
                        </div>
                        <div class="w-full">
                            <label for="payment-gross" class="block text-sm font-bold">Subtotal Non-Trade POS:</label>
                            <p id="payment-gross" name="payment-gross"
                                class="text-md w-full py-2 border-gray-300 rounded-md">
                                P 107,105.00</p>
                        </div>

                        <div class="w-full">
                            <label for="payment-gross" class="block text-sm font-extrabold">GRAND TOTAL POS:</label>
                            <p id="payment-gross" name="payment-gross"
                                class="text-md w-full py-2 border-gray-300 rounded-md">
                                P 107,105.00</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</main>
