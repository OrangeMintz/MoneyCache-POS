@include('layouts.header')
<main>
    <div class="font-sans bg-gray-100 p-6">
        <div class="bg-white p-4">
            <div class="py-2 flex justify-between items-center">
                <div>
                    <a href="{{ route('transactions.export.csv') }}"
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
            <div class="relative overflow-x-auto my-4 sm:rounded-lg">
                <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead class="text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr class="border-2 text-center">
                            <th class="px-6 py-3">PARTICULARS</th>
                            <th class="px-6 py-3">AM</th>
                            <th class="px-6 py-3">MID</th>
                            <th class="px-6 py-3">PM</th>
                            <th class="px-6 py-3">GROSS TOTAL</th>
                            <th class="px-6 py-3">NET TOTAL</th>
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

                        @foreach ([
        'cashier.name' => "CASHIER'S NAME",
        'cash' => 'CASH',
        'check' => 'CHECK',
        'bpi_ccard' => 'BPI CREDIT CARD',
        'bpi_dcard' => 'BPI DEBIT CARD',
        'metro_ccard' => 'METRO CREDIT CARD',
        'metro_dcard' => 'METRO DEBIT CARD',
        'paymaya' => 'PAYMAYA',
        'aub_ccard' => 'AUB DEBIT CARD',
        'gcash' => 'GCASH',
        'food_panda' => 'FOOD PANDA',
        'streetby' => 'STREETBY',
        'grabfood' => 'GRAB FOOD',
        'gc_claimed_others' => 'GC Claimed (Others)',
        'gc_claimed_own' => 'GC Claimed (Own)',
        'sub_total_trade' => 'Sub Total Trade',
        'mm_head' => 'MM-Head',
        'mm_commissary' => 'MM-Commissary',
        'mm_rm' => 'MM-RM',
        'mm_dm' => 'MM-DM',
        'mm_km' => 'MM-KM',
        'food_charge' => 'Food Charge',
        'sub_total_non_trade' => 'Sub Total Non Trade',
        'grand_total' => 'Grand Total',
    ] as $key => $label)
                            <tr
                                class="text-TableBlue font-semibold uppercase border-2 odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800">
                                <th
                                    class="px-6 py-3 text-sm
                                    {{ in_array($key, ['sub_total_trade', 'sub_total_non_trade']) ? 'bg-yellow-200' : '' }}
                                    {{ $key === 'grand_total' ? 'bg-yellow-300' : '' }}">
                                    {{ $label }}
                                </th>
                                @foreach (['AM', 'MID', 'PM'] as $time)
                                    @php
                                        $value = '-';
                                        if ($key === 'cashier.name') {
                                            $cashier = $transactions->where('time', $time)->first();
                                            $value = $cashier ? $cashier->cashier->name : '-';
                                        } else {
                                            $value = $transactions->where('time', $time)->pluck($key)->first() ?? '-';
                                            if (is_numeric($value)) {
                                                $totals[$time][$key] = $value;
                                                $totals['GROSS'][$key] = ($totals['GROSS'][$key] ?? 0) + $value;
                                            }
                                        }
                                    @endphp
                                    <td
                                        class="px-6 py-3 border-2 text-center
                                        {{ in_array($key, ['sub_total_trade', 'sub_total_non_trade']) ? 'bg-yellow-200' : '' }}
                                        {{ $key === 'grand_total' ? 'bg-yellow-300' : '' }}">
                                        {{ is_numeric($value) ? '₱' . number_format($value, 2) : $value }}
                                    </td>
                                @endforeach
                                <td
                                    class="px-6 py-3 border-2 text-center font-bold
                                    {{ in_array($key, ['sub_total_trade', 'sub_total_non_trade']) ? 'bg-yellow-200' : ($key === 'grand_total' ? 'bg-yellow-300' : 'bg-blue-200') }}">
                                    {{ isset($totals['GROSS'][$key]) ? '₱' . number_format($totals['GROSS'][$key], 2) : '-' }}
                                </td>
                                <td
                                    class="px-6 py-3 border-2 text-center font-bold
                                    {{ in_array($key, ['sub_total_trade', 'sub_total_non_trade']) ? 'bg-yellow-200' : ($key === 'grand_total' ? 'bg-yellow-300' : 'bg-green-200') }}">
                                    @php
                                        $chargeRate = $interestRates[$key] ?? 0;
                                        $netTotal = isset($totals['GROSS'][$key])
                                            ? $totals['GROSS'][$key] - $totals['GROSS'][$key] * ($chargeRate / 100)
                                            : '-';
                                    @endphp
                                    {{ is_numeric($netTotal) ? '₱' . number_format($netTotal, 2) : $netTotal }}
                                </td>
                            </tr>
                        @endforeach
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</main>

@include('layouts.footer')

<script>
    document.addEventListener("DOMContentLoaded", function() {
        const availableDates = @json($availableDates);

        flatpickr("#datepicker", {
            dateFormat: "Y-m-d",
            enable: availableDates,
            defaultDate: null,
            onChange: function(selectedDates, dateStr) {
                if (dateStr) {
                    window.location.href = `/export?date=${dateStr}`;
                }
            }
        });
    });
</script>

@include('layouts.footer')
