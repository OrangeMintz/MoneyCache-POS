<!-- Main modal -->
<div id="archive-modal" tabindex="-1" aria-hidden="true"
    class="bg-black bg-opacity-50 h-full hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
    <div class="relative p-4 w-full max-w-md max-h-full">
        <!-- Modal content -->
        <div class="relative bg-white rounded-lg shadow-sm dark:bg-gray-700 h-[500px]">
            <!-- Modal header -->
            <div
                class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200">
                <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
                    Archived List
                </h3>
                <button type="button"
                    class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm h-8 w-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                    data-modal-toggle="archive-modal">
                    <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                        viewBox="0 0 14 14">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                    </svg>
                    <span class="sr-only">Close modal</span>
                </button>
            </div>
            <!-- Modal body -->
            <div class="h-[420px] p-4 md:p-5 relative overflow-y-auto">
                <ol class="relative border-s border-gray-200 dark:border-gray-600 ms-3.5 mb-4 md:mb-5">
                    @foreach ($deletedUsers as $user)
                        <li class="mb-10 ms-8">
                            <span
                                class="absolute flex items-center justify-center w-6 h-6 bg-gray-100 rounded-full -start-3.5 ring-8 ring-white dark:ring-gray-700 dark:bg-gray-600">
                                <i class="fa-solid fa-person-circle-minus"></i>
                            </span>
                            <div class="flex justify-between">
                                <div class="left-side">
                                    <h3
                                        class="flex items-start mb-1 text-lg font-semibold text-gray-900 dark:text-white">
                                        {{ $user->name }}</h3>
                                    <p
                                        class="block mb-3 text-sm font-normal leading-none text-gray-500 dark:text-gray-400">
                                        {{ $user->email }}</p>
                                    <p
                                        class="block mb-3 text-sm font-normal leading-none text-gray-500 dark:text-gray-400">
                                        Archived on {{ \Carbon\Carbon::parse($user->deleted_at)->format('M jS, Y') }}
                                    </p>
                                </div>
                                <div class="right-side">
                                    <form action="{{ route('admin.restoreUser', $user->id) }}" method="POST">
                                        @csrf
                                        <button type="submit"
                                            class="py-2 px-3 inline-flex items-center text-sm font-medium text-gray-700 focus:outline-none bg-green-300 hover:bg-green-400 rounded-lg border border-gray-200 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white">
                                            <i class="fas fa-undo mr-2"></i>
                                            Restore
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </li>
                    @endforeach
                </ol>
            </div>
        </div>
    </div>
</div>
