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
                            <th class="px-6 py-3 bg-TableLYellow border-2 border-black">PARTICULARS</th>
                            <th class="px-6 py-3 bg-TableLYellow border-2 border-black">AM</th>
                            <th class="px-6 py-3 bg-TableLYellow border-2 border-black">MID</th>
                            <th class="px-6 py-3 bg-TableLYellow border-2 border-black">PM</th>
                            <th class="px-6 py-3 bg-TableLYellow border-2 border-black">GROSS TOTAL</th>
                            <th class="px-6 py-3 bg-TableYellow border-2 border-black">NET TOTAL</th>
                            <th class="px-6 py-3 bg-TableLYellow border-2 border-black">PARTICULARS</th>
                            <th class="px-6 py-3 bg-TableLYellow border-2 border-black">AM</th>
                            <th class="px-6 py-3 bg-TableLYellow border-2 border-black">MID</th>
                            <th class="px-6 py-3 bg-TableLYellow border-2 border-black">PM</th>
                            <th class="px-6 py-3 bg-TableLYellow border-2 border-black">GROSS TOTAL</th>
                            <th class="px-6 py-3 bg-TableYellow border-2 border-black">NET TOTAL</th>
                        </tr>
                    </thead>
                    <tbody>
                        @php
                            $interestRates = [
                                'cash' => 0,
                                'gcash' => 2,
                                'metro_dcard' => 5,
                            ];
                            $totals = ['AM' => [], 'MID' => [], 'PM' => [], 'GROSS' => []];
                        @endphp

                        @foreach (['cashier.name' => "CASHIER'S NAME", 'cash' => 'CASH', 'check' => 'CHECK', 'bpi_ccard' => 'BPI CREDIT CARD', 'bpi_dcard' => 'BPI DEBIT CARD', 'metro_ccard' => 'METRO CREDIT CARD', 'metro_dcard' => 'METRO DEBIT CARD', 'paymaya' => 'PAYMAYA', 'aub_ccard' => 'AUB DEBIT CARD', 'gcash' => 'GCASH', 'food_panda' => 'FOOD PANDA', 'streetby' => 'STREETBY', 'grabfood' => 'GRAB FOOD'] as $key => $label)
                            <tr class="text-TableBlue font-semibold uppercase border-2 border-black">
                                <th class="px-6 py-3 text-base bg-TableLYellow">{{ $label }}</th>
                                @foreach (['AM', 'MID', 'PM'] as $time)
                                    @php
                                        $value = $transactions
                                            ->where('time', $time)
                                            ->sum(function ($transaction) use ($key) {
                                                return data_get($transaction, $key, 0);
                                            });
                                        $totals[$time][$key] = $value;
                                        $totals['GROSS'][$key] = ($totals['GROSS'][$key] ?? 0) + $value;
                                    @endphp
                                    <td class="px-6 py-3 border-2 border-black text-center">
                                        {{ number_format($value, 2) }}</td>
                                @endforeach
                                <td class="px-6 py-3 border-2 border-black text-center font-bold bg-TableOrange">
                                    {{ number_format($totals['GROSS'][$key], 2) }}</td>
                                <td class="px-6 py-3 border-2 border-black text-center font-bold bg-TableYellow">
                                    @php
                                        $chargeRate = $interestRates[$key] ?? 0;
                                        $netTotal =
                                            $totals['GROSS'][$key] - $totals['GROSS'][$key] * ($chargeRate / 100);
                                    @endphp
                                    {{ number_format($netTotal, 2) }}
                                </td>
                            </tr>
                        @endforeach
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
