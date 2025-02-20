<main>
    <div className="font-sans bg-gray-100 p-6">
        <div className="bg-white p-4">
            <div className="container mx-auto">

                {{-- First column for Cashier Form --}}
                <form action="" method="POST" className="bg-white rounded-lg shadow-md">


                    <!-- FIRST ROW -->
                    <h2 className="shadow-md font-semibold text-lg mb-4 p-4">Payment Details:</h2>
                    <div className="bg-white mb-4 shadow-md grid grid-cols-3 gap-2 justify-items-start p-4">
                        {{-- <div className="w-full col-span-3">
                            <label for="cashier_name" className="block text-sm font-medium">Cashier's Name:</label>
                            <input type="text" id="cashier_name" name="cashier_name"
                                className="w-full p-2 border border-gray-300 rounded-md" required>
                        </div> --}}

                        <div className="w-full">
                            <label for="cash" className="block text-sm font-medium">Cash:</label>
                            <input type="number" id="cash" name="cash"
                                className="w-full p-2 border border-gray-300 rounded-md" step="0.01">
                        </div>

                        <div className="w-full">
                            <label for="check" className="block text-sm font-medium">Check:</label>
                            <input type="text" id="check" name="check"
                                className="w-full p-2 border border-gray-300 rounded-md">
                        </div>

                        <div className="w-full">
                            <label for="bpi_credit_card" className="block text-sm font-medium">BPI Credit Card:</label>
                            <input type="number" id="bpi_ccard" name="bpi_ccard"
                                className="w-full p-2 border border-gray-300 rounded-md" step="0.01">
                        </div>

                        <div className="w-full">
                            <label for="bpi_debit_card" className="block text-sm font-medium">BPI Debit Card:</label>
                            <input type="number" id="bpi_dcard" name="bpi_dcard"
                                className="w-full p-2 border border-gray-300 rounded-md" step="0.01">
                        </div>

                        <div className="w-full">
                            <label for="metro_credit_card" className="block text-sm font-medium">Metro Credit Card:</label>
                            <input type="number" id="metro_ccard" name="metro_ccard"
                                className="w-full p-2 border border-gray-300 rounded-md" step="0.01">
                        </div>

                        <div className="w-full">
                            <label for="metro_debit_card" className="block text-sm font-medium">Metro Debit Card:</label>
                            <input type="number" id="metro_dcard" name="metro_dcard"
                                className="w-full p-2 border border-gray-300 rounded-md" step="0.01">
                        </div>

                        <div className="w-full">
                            <label for="pay_maya" className="block text-sm font-medium">Pay Maya:</label>
                            <input type="number" id="paymaya" name="paymaya"
                                className="w-full p-2 border border-gray-300 rounded-md" step="0.01">
                        </div>

                        <div className="w-full">
                            <label for="aub_credit_card" className="block text-sm font-medium">AUB Credit Card:</label>
                            <input type="number" id="aub_ccard" name="aub_ccard"
                                className="w-full p-2 border border-gray-300 rounded-md" step="0.01">
                        </div>

                        <div className="w-full">
                            <label for="gcash" className="block text-sm font-medium">GCash:</label>
                            <input type="number" id="gcash" name="gcash"
                                className="w-full p-2 border border-gray-300 rounded-md" step="0.01">
                        </div>

                        <div className="w-full">
                            <label for="food_panda" className="block text-sm font-medium">Food Panda:</label>
                            <input type="number" id="foodpanda" name="foodpanda"
                                className="w-full p-2 border border-gray-300 rounded-md" step="0.01">
                        </div>

                        <div className="w-full">
                            <label for="food_panda" className="block text-sm font-medium">StreetBy:</label>
                            <input type="number" id="streetby" name="streetby"
                                className="w-full p-2 border border-gray-300 rounded-md" step="0.01">
                        </div>

                        <div className="w-full">
                            <label for="food_panda" className="block text-sm font-medium">Grab Food:</label>
                            <input type="number" id="grabfood" name="grabfood"
                                className="w-full p-2 border border-gray-300 rounded-md" step="0.01">
                        </div>

                        <div className="w-full">
                            <label for="food_panda" className="block text-sm font-medium">GC Claimed (Others)</label>
                            <input type="number" id="gc_claimed_others" name="gc_claimed_others"
                                className="w-full p-2 border border-gray-300 rounded-md" step="0.01">
                        </div>

                        <div className="w-full">
                            <label for="food_panda" className="block text-sm font-medium">GC Claimed (OWN)</label>
                            <input type="number" id="gc_claimed_own" name="gc_claimed_own"
                                className="w-full p-2 border border-gray-300 rounded-md" step="0.01">
                        </div>

                    </div>

                    <!-- SECOND ROW -->
                    <h2 className="shadow-md font-semibold text-lg mb-4 p-4">MM Details:</h2>
                    <div className="bg-white mb-4 shadow-md p-4">
                        <!-- First row: Two columns -->
                        <div className="grid grid-cols-2 gap-2 mb-2">
                            <div className="w-full">
                                <label for="mm_head_office" className="block text-sm font-medium">MM-HEAD OFFICE:</label>
                                <input type="text" id="mm_head_office" name="mm_head_office"
                                    className="w-full p-3 border border-gray-300 rounded-md">
                            </div>

                            <div className="w-full">
                                <label for="mm_commissary" className="block text-sm font-medium">MM-COMMISSARY:</label>
                                <input type="text" id="mm_commissary" name="mm_commissary"
                                    className="w-full p-3 border border-gray-300 rounded-md">
                            </div>
                        </div>

                        <!-- Second row: Three columns -->
                        <div className="grid grid-cols-3 gap-2">
                            <div className="w-full">
                                <label for="mm_rm" className="block text-sm font-medium">MM-RM:</label>
                                <input type="text" id="mm_rm" name="mm_rm"
                                    className="w-full p-3 border border-gray-300 rounded-md">
                            </div>

                            <div className="w-full">
                                <label for="mm_dm" className="block text-sm font-medium">MM-DM:</label>
                                <input type="text" id="mm_dm" name="mm_dm"
                                    className="w-full p-3 border border-gray-300 rounded-md">
                            </div>

                            <div className="w-full">
                                <label for="food_charge" className="block text-sm font-medium">FOOD CHARGE:</label>
                                <input type="text" id="food_charge" name="food_charge"
                                    className="w-full p-3 border border-gray-300 rounded-md">
                            </div>
                        </div>
                    </div>

                    <!-- THIRD ROW -->
                    <h2 className="shadow-md font-semibold text-lg mb-4 p-4">Z Reading POS:</h2>
                    <div className="bg-white mb-4 shadow-md grid grid-cols-3 gap-2 justify-items-start p-4">
                        <div className="w-full">
                            <label for="z_reading_pos" className="block text-sm font-medium">Z READING POS:</label>
                            <input type="text" id="z_reading_pos" name="z_reading_pos"
                                className="w-full p-3 border border-gray-300 rounded-md">
                        </div>
                    </div>

                    <div className="flex items-center justify-start m-4">
                        <button type="submit"
                            className="py-3 px-6 bg-green-600 text-white rounded-md hover:bg-green-500 transition">Submit</button>
                    </div>

                </form>


                <!-- Second column for Gross Total (now placed in 3rd column) -->
                <div className="bg-white rounded-lg shadow-md">

                    <h2 className="shadow-md font-semibold text-lg mb-4 p-4">Shift Time:</h2>
                    <div className="grid grid-cols-1 gap-2 justify-items-start p-4 mb-8">
                        <div className="w-full">
                            <label for="shift_time" className="block text-sm font-medium">Shift Time:</label>
                            <select id="shift_time" name="shift_time"
                                className="w-full p-2 border border-gray-300 rounded-md">
                                <option value="AM">AM</option>
                                <option value="MID">MID</option>
                                <option value="PM">PM</option>
                            </select>
                        </div>

                        <div className="w-full">
                            <label for="cashier_name" className="block text-sm font-medium">Cashier's Name:</label>
                            <input type="text" id="cashier_name" name="cashier_name"
                                className="w-full p-2 border border-gray-300 rounded-md" required>
                        </div>
                    </div>

                    <h2 className="shadow-md font-semibold text-lg p-4 mb-4">Summary:</h2>
                    <div className="w-full">
                        <label for="payment-gross" className="block text-sm font-bold px-4">Subtotal Trade POS:</label>
                        <p id="sub_total_trade" className="text-md w-full py-2 border-gray-300 rounded-md px-4">P 0.00</p>
                    </div>
                    <div className="w-full">
                        <label for="payment-gross" className="block text-sm font-bold px-4">Subtotal Non-Trade
                            POS:</label>
                        <p id="sub_total_non_trade" className="text-md w-full py-2 border-gray-300 rounded-md px-4">P 0.00
                        </p>
                    </div>
                    <div className="w-full">
                        <label for="payment-gross" className="block text-sm font-extrabold px-4">GRAND TOTAL POS:</label>
                        <p id="grand_total" className="text-md w-full py-2 border-gray-300 rounded-md px-4">P 0.00</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</main>
