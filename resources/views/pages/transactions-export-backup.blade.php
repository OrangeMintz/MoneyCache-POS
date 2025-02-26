@include('layouts.header')
<main>
    <div class="font-sans bg-gray-100 p-6">
        <div class="bg-white p-4">
            <div class="py-2 flex justify-between items-center">
                <!-- Download Button -->
                <div>
                    <a href="{{ route('transactions.export') }}"
                        class="bg-emerald-700 hover:bg-emerald-900 rounded-lg text-white text-md text-center px-3 py-2">
                        Download CSV <i class="fas fa-file-csv ml-1"></i>
                    </a>
                </div>
                <div>
                    <div class="relative max-w-sm">
                        <input id="datepicker" type="text"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Select a date">
                    </div>
                </div>
            </div>
            <div class="relative overflow-x-auto my-4">
                <table class="w-full text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead
                        class="text-base text-center text-TableBlue uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
                        <tr class="border-4 border-black">
                            <th scope="col" class="px-6 py-3 bg-TableLYellow border-2 border-black">
                                PARTICULARS
                            </th>
                            <th scope="col" class="px-6 py-3 bg-TableLYellow border-2 border-black">
                                AM
                            </th>
                            <th scope="col" class="px-6 py-3 bg-TableLYellow border-2 border-black">
                                MID
                            </th>
                            <th scope="col" class="px-6 py-3 bg-TableLYellow border-2 border-black">
                                PM
                            </th>
                            <th scope="col" class="px-6 py-3 bg-TableLYellow border-2 border-black">
                                GROSS TOTAL
                            </th>
                            <th scope="col" class="px-6 py-3 bg-TableYellow border-2 border-black">
                                NET TOTAL
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {{-- PARTICULARS 1 --}}
                        <tr class=" text-TableBlue font-semibold uppercase">
                            <th scope="row" class="px-6 py-3 text-base border-2 border-black bg-TableLYellow">
                                CASHIER'S NAME</th>
                            <td scope="row" class="px-6 py-3 text-base border-2 border-black">Ramon Paulo</td>
                            <td scope="row" class="px-6 py-3 text-base border-2 border-black">Djeikuje Nickolai</td>
                            <td scope="row" class="px-6 py-3 text-base border-2 border-black">Djeikuje Nickolai</td>
                            {{-- Leave as SPACE --}}
                            <td scope="row" class="px-6 py-3 text-base border-2 border-black bg-TableLYellow"></td>
                            <td scope="row" class="px-6 py-3 text-base border-2 border-black bg-TableOrange"></td>

                        <tr class=" text-TableBlue font-semibold uppercase border-2 border-black">
                            <th scope="row" class="px-6 py-3 text-base bg-TableLYellow">CASH</th>
                            <td scope="row" class="px-6 py-3 text-base border-2 border-black">100</td>
                            <td scope="row" class="px-6 py-3 text-base border-2 border-black">100</td>
                            <td scope="row" class="px-6 py-3 text-base border-2 border-black">100</td>
                            <td scope="row" class="px-6 py-3 text-base border-2 border-black bg-TableLYellow">300
                            </td>
                            <td scope="row" class="px-6 py-3 text-base border-2 border-black bg-TableOrange">290</td>
                        </tr>
                        <tr class=" text-TableBlue font-semibold uppercase border-2 border-black">
                            <th scope="row" class="px-6 py-3 text-base bg-TableLYellow">CHECK</th>
                            <td scope="row" class="px-6 py-3 text-base border-2 border-black">100</td>
                            <td scope="row" class="px-6 py-3 text-base border-2 border-black">100</td>
                            <td scope="row" class="px-6 py-3 text-base border-2 border-black">100</td>
                            <td scope="row" class="px-6 py-3 text-base border-2 border-black bg-TableLYellow">300
                            </td>
                            <td scope="row" class="px-6 py-3 text-base border-2 border-black bg-TableOrange">290</td>
                        </tr>
                        <tr class=" text-TableBlue font-semibold uppercase border-2 border-black">
                            <th scope="row" class="px-6 py-3 text-base bg-TableLYellow">BPI CREDIT CARD</th>
                            <td scope="row" class="px-6 py-3 text-base border-2 border-black">100</td>
                            <td scope="row" class="px-6 py-3 text-base border-2 border-black">100</td>
                            <td scope="row" class="px-6 py-3 text-base border-2 border-black">100</td>
                            <td scope="row" class="px-6 py-3 text-base border-2 border-black bg-TableLYellow">300
                            </td>
                            <td scope="row" class="px-6 py-3 text-base border-2 border-black bg-TableOrange">290</td>
                        </tr>
                        <tr class=" text-TableBlue font-semibold uppercase border-2 border-black">
                            <th scope="row" class="px-6 py-3 text-base  bg-TableLYellow">BPI DEBIT CARD</th>
                            <td scope="row" class="px-6 py-3 text-base border-2 border-black">100</td>
                            <td scope="row" class="px-6 py-3 text-base border-2 border-black">100</td>
                            <td scope="row" class="px-6 py-3 text-base border-2 border-black">100</td>
                            <td scope="row" class="px-6 py-3 text-base border-2 border-black bg-TableLYellow">300
                            </td>
                            <td scope="row" class="px-6 py-3 text-base border-2 border-black bg-TableOrange">290
                            </td>
                        </tr>
                        <tr class=" text-TableBlue font-semibold uppercase border-2 border-black">
                            <th scope="row" class="px-6 py-3 text-base  bg-TableLYellow">METRO CREDIT CARD</th>
                            <td scope="row" class="px-6 py-3 text-base border-2 border-black">100</td>
                            <td scope="row" class="px-6 py-3 text-base border-2 border-black">100</td>
                            <td scope="row" class="px-6 py-3 text-base border-2 border-black">100</td>
                            <td scope="row" class="px-6 py-3 text-base border-2 border-black bg-TableLYellow">300
                            </td>
                            <td scope="row" class="px-6 py-3 text-base border-2 border-black bg-TableOrange">290
                            </td>
                        </tr>
                        <tr class=" text-TableBlue font-semibold uppercase border-2 border-black">
                            <th scope="row" class="px-6 py-3 text-base  bg-TableLYellow">METRO DEBIT CARD</th>
                            <td scope="row" class="px-6 py-3 text-base border-2 border-black">100</td>
                            <td scope="row" class="px-6 py-3 text-base border-2 border-black">100</td>
                            <td scope="row" class="px-6 py-3 text-base border-2 border-black">100</td>
                            <td scope="row" class="px-6 py-3 text-base border-2 border-black bg-TableLYellow">300
                            </td>
                            <td scope="row" class="px-6 py-3 text-base border-2 border-black bg-TableOrange">290
                            </td>
                        </tr>
                        <tr class=" text-TableBlue font-semibold uppercase border-2 border-black">
                            <th scope="row" class="px-6 py-3 text-base  bg-TableLYellow">PAYMAYA</th>
                            <td scope="row" class="px-6 py-3 text-base border-2 border-black">100</td>
                            <td scope="row" class="px-6 py-3 text-base border-2 border-black">100</td>
                            <td scope="row" class="px-6 py-3 text-base border-2 border-black">100</td>
                            <td scope="row" class="px-6 py-3 text-base border-2 border-black bg-TableLYellow">300
                            </td>
                            <td scope="row" class="px-6 py-3 text-base border-2 border-black bg-TableOrange">290
                            </td>
                        </tr>
                        <tr class=" text-TableBlue font-semibold uppercase border-2 border-black">
                            <th scope="row" class="px-6 py-3 text-base  bg-TableLYellow">AUB DEBIT CARD</th>
                            <td scope="row" class="px-6 py-3 text-base border-2 border-black">100</td>
                            <td scope="row" class="px-6 py-3 text-base border-2 border-black">100</td>
                            <td scope="row" class="px-6 py-3 text-base border-2 border-black">100</td>
                            <td scope="row" class="px-6 py-3 text-base border-2 border-black bg-TableLYellow">300
                            </td>
                            <td scope="row" class="px-6 py-3 text-base border-2 border-black bg-TableOrange">290
                            </td>
                        </tr>
                        <tr class=" text-TableBlue font-semibold uppercase border-2 border-black">
                            <th scope="row" class="px-6 py-3 text-base  bg-TableLYellow">GCASH</th>
                            <td scope="row" class="px-6 py-3 text-base border-2 border-black">100</td>
                            <td scope="row" class="px-6 py-3 text-base border-2 border-black">100</td>
                            <td scope="row" class="px-6 py-3 text-base border-2 border-black">100</td>
                            <td scope="row" class="px-6 py-3 text-base border-2 border-black bg-TableLYellow">300
                            </td>
                            <td scope="row" class="px-6 py-3 text-base border-2 border-black bg-TableOrange">290
                            </td>
                        </tr>
                        <tr class=" text-TableBlue font-semibold uppercase border-2 border-black">
                            <th scope="row" class="px-6 py-3 text-base  bg-TableLYellow">FOOD PANDA</th>
                            <td scope="row" class="px-6 py-3 text-base border-2 border-black">100</td>
                            <td scope="row" class="px-6 py-3 text-base border-2 border-black">100</td>
                            <td scope="row" class="px-6 py-3 text-base border-2 border-black">100</td>
                            <td scope="row" class="px-6 py-3 text-base border-2 border-black bg-TableLYellow">300
                            </td>
                            <td scope="row" class="px-6 py-3 text-base border-2 border-black bg-TableOrange">290
                            </td>
                        </tr>
                        <tr class=" text-TableBlue font-semibold uppercase border-2 border-black">
                            <th scope="row" class="px-6 py-3 text-base  bg-TableLYellow">STREETBY</th>
                            <td scope="row" class="px-6 py-3 text-base border-2 border-black">100</td>
                            <td scope="row" class="px-6 py-3 text-base border-2 border-black">100</td>
                            <td scope="row" class="px-6 py-3 text-base border-2 border-black">100</td>
                            <td scope="row" class="px-6 py-3 text-base border-2 border-black bg-TableLYellow">300
                            </td>
                            <td scope="row" class="px-6 py-3 text-base border-2 border-black bg-TableOrange">290
                            </td>
                        </tr>
                        <tr class=" text-TableBlue font-semibold uppercase border-2 border-black">
                            <th scope="row" class="px-6 py-3 text-base  bg-TableLYellow">GRAB FOOD</th>
                            <td scope="row" class="px-6 py-3 text-base border-2 border-black">100</td>
                            <td scope="row" class="px-6 py-3 text-base border-2 border-black">100</td>
                            <td scope="row" class="px-6 py-3 text-base border-2 border-black">100</td>
                            <td scope="row" class="px-6 py-3 text-base border-2 border-black bg-TableLYellow">300
                            </td>
                            <td scope="row" class="px-6 py-3 text-base border-2 border-black bg-TableOrange">290
                            </td>
                        </tr>

                        {{-- Sub Total Trade --}}
                        <tr class=" bg-TableOrange text-black font-bold uppercase border-2 border-black">
                            <th scope="row" class="px-6 py-3 text-base border-2 border-black ">SUB TOTAL TRADE POS
                            </th>
                            <td class="px-6 py-3 border-2 border-black">3</td>
                            <td class="px-6 py-3 border-2 border-black">21,000</td>
                            <td class="px-6 py-3 border-2 border-black">21,000</td>
                            <td scope="row" class="px-6 py-3 text-base border-2 border-black">300</td>
                            <td scope="row" class="px-6 py-3 text-base border-2 border-black">290</td>
                        </tr>

                        {{-- Particulars 2 --}}
                        <tr class=" text-TableBlue font-semibold uppercase border-2 border-black">
                            <th scope="row" class="px-6 py-3 text-base  bg-TableLYellow">MM HEAD OFFICE</th>
                            <td scope="row" class="px-6 py-3 text-base border-2 border-black">100</td>
                            <td scope="row" class="px-6 py-3 text-base border-2 border-black">100</td>
                            <td scope="row" class="px-6 py-3 text-base border-2 border-black">100</td>
                            <td scope="row" class="px-6 py-3 text-base border-2 border-black bg-TableLYellow">300
                            </td>
                            <td scope="row" class="px-6 py-3 text-base border-2 border-black bg-TableOrange">290
                            </td>
                        </tr>
                        <tr class=" text-TableBlue font-semibold uppercase border-2 border-black">
                            <th scope="row" class="px-6 py-3 text-base  bg-TableLYellow">MM COMMISSARY</th>
                            <td scope="row" class="px-6 py-3 text-base border-2 border-black">100</td>
                            <td scope="row" class="px-6 py-3 text-base border-2 border-black">100</td>
                            <td scope="row" class="px-6 py-3 text-base border-2 border-black">100</td>
                            <td scope="row" class="px-6 py-3 text-base border-2 border-black bg-TableLYellow">300
                            </td>
                            <td scope="row" class="px-6 py-3 text-base border-2 border-black bg-TableOrange">290
                            </td>
                        </tr>
                        <tr class=" text-TableBlue font-semibold uppercase border-2 border-black">
                            <th scope="row" class="px-6 py-3 text-base  bg-TableLYellow">MM-RM</th>
                            <td scope="row" class="px-6 py-3 text-base border-2 border-black">100</td>
                            <td scope="row" class="px-6 py-3 text-base border-2 border-black">100</td>
                            <td scope="row" class="px-6 py-3 text-base border-2 border-black">100</td>
                            <td scope="row" class="px-6 py-3 text-base border-2 border-black bg-TableLYellow">300
                            </td>
                            <td scope="row" class="px-6 py-3 text-base border-2 border-black bg-TableOrange">290
                            </td>
                        </tr>
                        <tr class=" text-TableBlue font-semibold uppercase border-2 border-black">
                            <th scope="row" class="px-6 py-3 text-base  bg-TableLYellow">MM-DM</th>
                            <td scope="row" class="px-6 py-3 text-base border-2 border-black">100</td>
                            <td scope="row" class="px-6 py-3 text-base border-2 border-black">100</td>
                            <td scope="row" class="px-6 py-3 text-base border-2 border-black">100</td>
                            <td scope="row" class="px-6 py-3 text-base border-2 border-black bg-TableLYellow">300
                            </td>
                            <td scope="row" class="px-6 py-3 text-base border-2 border-black bg-TableOrange">290
                            </td>
                        </tr>
                        <tr class=" text-TableBlue font-semibold uppercase border-2 border-black">
                            <th scope="row" class="px-6 py-3 text-base  bg-TableLYellow">MM-KM</th>
                            <td scope="row" class="px-6 py-3 text-base border-2 border-black">100</td>
                            <td scope="row" class="px-6 py-3 text-base border-2 border-black">100</td>
                            <td scope="row" class="px-6 py-3 text-base border-2 border-black">100</td>
                            <td scope="row" class="px-6 py-3 text-base border-2 border-black bg-TableLYellow">300
                            </td>
                            <td scope="row" class="px-6 py-3 text-base border-2 border-black bg-TableOrange">290
                            </td>
                        </tr>
                        <tr class=" text-TableBlue font-semibold uppercase border-2 border-black">
                            <th scope="row" class="px-6 py-3 text-base  bg-TableLYellow">FOOD CHARGE</th>
                            <td scope="row" class="px-6 py-3 text-base border-2 border-black">100</td>
                            <td scope="row" class="px-6 py-3 text-base border-2 border-black">100</td>
                            <td scope="row" class="px-6 py-3 text-base border-2 border-black">100</td>
                            <td scope="row" class="px-6 py-3 text-base border-2 border-black bg-TableLYellow">300
                            </td>
                            <td scope="row" class="px-6 py-3 text-base border-2 border-black bg-TableOrange">290
                            </td>
                        </tr>

                        {{-- Sub Total Non-Trade --}}
                        <tr class="bg-TableOrange text-black font-bold uppercase">
                            <th scope="row" class="px-6 py-3 text-base border-2 border-black ">SUB TOTAL NON-TRADE
                                POS</th>
                            <td class="px-6 py-3 border-2 border-black">3</td>
                            <td class="px-6 py-3 border-2 border-black">21,000</td>
                            <td class="px-6 py-3 border-2 border-black">21,000</td>
                            <td scope="row" class="px-6 py-3 text-base border-2 border-black">300</td>
                            <td scope="row" class="px-6 py-3 text-base border-2 border-black">290</td>
                        </tr>

                        <tr class="bg-TableDOrange text-lg text-black font-bold uppercase">
                            <th scope="row" class="px-6 py-3 text-base border-2 border-black ">GRAND TOTAL</th>
                            <td class="px-6 py-3 border-2 border-black">3</td>
                            <td class="px-6 py-3 border-2 border-black">21,000</td>
                            <td class="px-6 py-3 border-2 border-black">21,000</td>
                            <td scope="row" class="px-6 py-3 text-base border-2 border-black">300</td>
                            <td scope="row" class="px-6 py-3 text-base border-2 border-black">290</td>
                        </tr>
                    </tbody>

                </table>
            </div>
        </div>
    </div>
</main>

<script>
    document.addEventListener("DOMContentLoaded", function() {
        flatpickr("#datepicker", {
            dateFormat: "Y-m-d", // Format: YYYY-MM-DD
            enableTime: false, // Set to true if you need time selection
            onChange: function(selectedDates, dateStr, instance) {
                if (dateStr) {
                    window.location.href = `/export?${dateStr}`;
                }
            }
        });
    });
</script>

@include('layouts.footer')
