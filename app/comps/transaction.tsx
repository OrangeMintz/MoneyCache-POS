
export default function CashierForm() {
    return (
        <main className="font-sans bg-gray-100 p-6 text-black">
            <div className="bg-white p-4">
                
                <div className="container mx-auto">


                    {/* payment Details ni */}
                    <form method="POST" className="bg-white rounded-lg shadow-md p-4">
                    <div className="grid grid-cols-1 gap-4 p-4 mb-8">
                    <h2 className="shadow-md font-semibold text-lg mb-4 p-4">Shift Time:</h2>
                            <div className="w-full">
                                <label className="block text-sm font-medium">Cashier&apos;s Name:</label>
                                <input type="text" className="w-full p-2 border border-gray-300 rounded-md" name="cashier_name" required />
                            </div>
                            <div className="w-full">
                                <label className="block text-sm font-medium">Shift Time:</label>
                                <select className="w-full p-2 border  border-gray-300 rounded-md" name="shift_time">
                                    <option value="AM">AM</option>
                                    <option value="MID">MID</option>
                                    <option value="PM">PM</option>
                                </select>
                            </div>
                        </div>
                        <h2 className="shadow-md font-semibold text-lg mb-4 p-4">Payment Methods:</h2>
                        <div className="bg-white mb-4 shadow-md grid md:grid-cols-3 sm:grid-cols-2 gap-4 p-4">
                           
                            <div className="w-full">
                                <label className="block text-sm font-medium">Cash:</label>
                                <input type="number" name="cash" className="w-full p-2 border border-gray-300 rounded-md" step="0.01" />
                            </div>

                            <div className="w-full">
                                <label className="block text-sm font-medium">Check:</label>
                                <input type="number"  name="check" className="w-full p-2 border border-gray-300 rounded-md" step="0.01" />
                            </div>

                            <div className="w-full">
                                <label className="block text-sm font-medium">BPI Credit Card:</label>
                                <input type="number" name="bpi_ccard" className="w-full p-2 border border-gray-300 rounded-md" step="0.01" />
                            </div>

                            <div className="w-full">
                                <label className="block text-sm font-medium">BPI Debit Card:</label>
                                <input type="number" name="bpi_dcard" className="w-full p-2 border border-gray-300 rounded-md" step="0.01" />
                            </div>

                            <div className="w-full">
                                <label className="block text-sm font-medium">Metro Credit Card:</label>
                                <input type="number" name="metro_ccard" className="w-full p-2 border border-gray-300 rounded-md" step="0.01" />
                            </div>

                            <div className="w-full">
                                <label className="block text-sm font-medium">Metro Debit Card:</label>
                                <input type="number" name="metro_dcard" className="w-full p-2 border border-gray-300 rounded-md" step="0.01" />
                            </div>

                            <div className="w-full">
                                <label className="block text-sm font-medium">Pay Maya:</label>
                                <input type="number" name="paymaya" className="w-full p-2 border border-gray-300 rounded-md" step="0.01" />
                            </div>

                            <div className="w-full">
                                <label className="block text-sm font-medium">AUB Credit Card:</label>
                                <input type="number" name="aub_ccard" className="w-full p-2 border border-gray-300 rounded-md" step="0.01" />
                            </div>

                            <div className="w-full">
                                <label className="block text-sm font-medium">GCash:</label>
                                <input type="number" name="gcash" className="w-full p-2 border border-gray-300 rounded-md" step="0.01" />
                            </div>

                            <div className="w-full">
                                <label className="block text-sm font-medium">Food Panda:</label>
                                <input type="number" name="foodpanda" className="w-full p-2 border border-gray-300 rounded-md" step="0.01" />
                            </div>

                            <div className="w-full">
                                <label className="block text-sm font-medium">StreetBy:</label>
                                <input type="number" name="streetby" className="w-full p-2 border border-gray-300 rounded-md" step="0.01" />
                            </div>

                            <div className="w-full">
                                <label className="block text-sm font-medium">Grab Food:</label>
                                <input type="number" name="grabfood" className="w-full p-2 border border-gray-300 rounded-md" step="0.01" />
                            </div>

                            <div className="w-full">
                                <label className="block text-sm font-medium">GC Claimed (Others):</label>
                                <input type="number" name="gc_claimed_others" className="w-full p-2 border border-gray-300 rounded-md" step="0.01" />
                            </div>

                            <div className="w-full">
                                <label className="block text-sm font-medium">GC Claimed (OWN):</label>
                                <input type="number" name="gc_claimed_own" className="w-full p-2 border border-gray-300 rounded-md" step="0.01" />
                            </div>
                        </div>

                        <h2 className="shadow-md font-semibold text-lg mb-4 p-4">MM Details:</h2>
                            <div className="bg-white mb-4 shadow-md p-4 grid md:grid-cols-2 gap-4">
                                <div className="w-full">
                                    <label className="block text-sm font-medium">MM-HEAD OFFICE:</label>
                                    <input type="text" className="w-full p-3 border  border-gray-300 rounded-md" name="mm_head_office" />
                                </div>

                                <div className="w-full">
                                    <label className="block text-sm font-medium">MM-COMMISSARY:</label>
                                    <input type="text" className="w-full p-3 border border-gray-300 rounded-md"  name="mm_commissary" />
                                </div>

                                <div className="w-full">
                                    <label className="block text-sm font-medium">MM-RM:</label>
                                    <input type="text" className="w-full p-3 border border-gray-300 rounded-md"  name="mm_rm" />
                                </div>

                                <div className="w-full">
                                    <label className="block text-sm font-medium">MM-DM:</label>
                                    <input type="text" className="w-full p-3 border border-gray-300 rounded-md" name="mm_dm" />
                                </div>

                                <div className="w-full">
                                    <label className="block text-sm font-medium">FOOD CHARGE:</label>
                                    <input type="text" className="w-full p-3 border border-gray-300 rounded-md"  name="food_charge"/>
                                </div>
                            </div>


                        <h2 className="shadow-md font-semibold text-lg mb-4 p-4">Z Reading POS:</h2>
                        <div className="bg-white mb-4 shadow-md p-4">
                            <label className="block text-sm font-medium">Z READING POS:</label>
                            <input type="text" className="w-full p-3 border border-gray-300 rounded-md" name="z_reading_pos" />
                        </div>

                        <div className="flex items-center justify-start m-4">
                            <button type="submit" className="py-3 px-6 bg-green-600 text-white rounded-md hover:bg-green-500 transition">
                                Submit
                            </button>
                        </div>
                    </form>
                        {/* End payment Details ni */}


                    <div className="bg-white rounded-lg shadow-md p-4 mt-6">
                        <h2 className="shadow-md font-semibold text-lg p-4 mb-4">Summary:</h2>
                        <div className="w-full p-4">
                            {["Subtotal Trade POS", "Subtotal Non-Trade POS", "GRAND TOTAL POS"].map((label, index) => (
                                <div key={index} className="mb-2">
                                    <label className="block text-sm font-bold">{label}:</label>
                                    <p className="text-md w-full py-2 border-gray-300 rounded-md">P 0.00</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
