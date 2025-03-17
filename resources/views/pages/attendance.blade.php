@include('layouts.header')
@include('components.modals.camera')

<main>
    <div class="font-sans bg-gray-100 dark:bg-gray-800 dark:text-gray-100 p-6">
        <div class="bg-white dark:bg-gray-900 p-4 mb-4">
            <div class="">
                <div class="flex justify-between items-center mb-2">
                    <h5 class="title font-semibold text-[26px]">Attendance Record</h5>
                    <div class="flex justify-center space-x-3">
                        <!-- Capture button -->
                        <button id="capture-button" data-modal-target="capture-modal"   data-modal-toggle="capture-modal" class="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">
                                Time in
                        </button>
                          
                        {{-- <a id="timeIn" href="{{ route('attendance.timeIn') }}"
                            class="w-28 text-center px-2 py-2 text-sm rounded-lg bg-green-100 dark:bg-green-300 text-green-700 dark:text-green-900 hover:bg-green-200">
                            <i class="fa-solid fa-right-to-bracket"></i> Time in
                        </a> --}}

                        <a id="timeOut" href="{{ route('attendance.timeOut') }}"
                            class="w-28 text-center px-2 text-sm py-2 rounded-lg bg-red-100 dark:bg-red-300 text-red-700 dark:text-red-900 hover:bg-red-200">
                            <i class="fa-solid fa-arrow-right-from-bracket"></i> Time Out
                        </a>
                    </div>
                </div>
                <table id="attendanceTable" class="display" style="width:100%">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Role</th>
                            <th>Time in</th>
                            <th>Time out</th>
                            <th>Status</th>
                            <th>Date</th>
                            <th>Details</th>
                        </tr>
                    </thead>
                    <tbody>
                        @foreach ($attendance as $record)
                            <tr>
                                <td>{{ $record->user->name }}</td>
                                <td class="capitalize">{{ $record->user->role }}</td>
                                <td>
                                    <span
                                        class="font-medium text-sm px-2 py-1 rounded-xl uppercase text-white bg-indigo-300 inline-block">
                                        {{ \Carbon\Carbon::parse($record->timeIn)->format('g:i A') }}
                                    </span>
                                </td>
                                <td>
                                    <span
                                        class="font-medium text-sm px-2 py-1 rounded-xl uppercase inline-block
                                        {{ $record->timeOut ? 'text-white bg-orange-300' : 'text-gray-500' }}">
                                        {{ $record->timeOut ? \Carbon\Carbon::parse($record->timeOut)->format('g:i A') : '---' }}
                                    </span>
                                </td>
                                <td>
                                    <span
                                        class="inline-flex items-center justify-center text-sm font-medium px-2 py-1 rounded-xl text-white uppercase
                                            @if ($record->status === 'Late') bg-red-500
                                            @elseif($record->status === 'On-time') bg-blue-500
                                            @elseif($record->status === 'Early') bg-green-400 @endif">
                                        {{ ucfirst($record->status) }}
                                    </span>
                                </td>
                                <td>{{ \Carbon\Carbon::parse($record->created_at)->format('l j, Y') }}</td>
                                <td>
                                    <button data-popover-target="view-details-{{ $record->id }}" type="button"
                                        class="cursor-default px-3 py-1 text-blue-500 hover:text-blue-600">View Rate
                                    </button>

                                    <div data-popover id="view-details-{{ $record->id }}" role="tooltip"
                                        class="absolute z-10 invisible inline-block w-64 text-sm text-gray-500 transition-opacity duration-300 bg-white border border-gray-200 rounded-lg shadow-xs opacity-0 dark:text-gray-400 dark:border-gray-600 dark:bg-gray-800">
                                        <div
                                            class="px-3 py-2 bg-gray-100 border-b border-gray-200 rounded-t-lg dark:border-gray-600 dark:bg-gray-700">
                                            <h3 class="font-semibold text-gray-900 dark:text-white">Work Summary</h3>
                                        </div>
                                        <div class="flex justify-evenly px-3 py-2">
                                            <p class="font-medium text-gray-900 dark:text-white">Total Hours:
                                                <span class="font-normal">{{ $record->totalHours ?? 0 }}</span>
                                            </p>
                                            <p class="font-medium text-gray-900 dark:text-white">Total Rate:
                                                <span class="font-normal">₱
                                                    {{ number_format($record->totalRate ?? 0) }}</span>
                                            </p>
                                        </div>
                                        <div data-popper-arrow></div>
                                    </div>
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
    //DataTable
    new DataTable('#attendanceTable', {
        order: [
            [5, 'desc']
        ],
        searching: false,
        paging: false,
        info: false
    });

</script>

