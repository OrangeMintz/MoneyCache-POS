@include('layouts.header')
@include('components.modals.add-user')
@include('components.modals.edit-user')
@include('components.modals.archive')

<main>
    <div class="font-sans bg-gray-100 dark:bg-gray-800  dark:text-gray-100 p-6">
        <div class="bg-white dark:bg-gray-900 p-4 mb-4">
            <div class="card-header flex justify-between items-center">
                <h5 class="title font-semibold text-[26px]">Manage Users</h5>
                <div class="flex flex-wrap justify-center">

                    <button data-modal-target="add-user-modal" data-modal-toggle="add-user-modal"
                        class="block bg-emerald-700 hover:bg-emerald-800 rounded-lg text-white text-center self-center md:px-6 py-2 my-2 mx-2">Add
                        User
                        <i class="fa-solid fa-user-plus"></i></i>
                    </button>

                    <!-- 3 Dots Dropdown -->
                    <button id="dropdownMenuIconButton" data-dropdown-toggle="dropdownDots"
                        class="inline-flex items-center px-1 text-sm font-medium text-center text-gray-900 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none dark:text-white dark:bg-gray-900 dark:hover:bg-gray-700"
                        type="button">
                        <svg class="w-4 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor"
                            viewBox="0 0 4 15">
                            <path
                                d="M3.5 1.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 6.041a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 5.959a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z" />
                        </svg>
                    </button>

                    <div id="dropdownDots"
                        class="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44 dark:bg-gray-700 dark:divide-gray-600">
                        <ul class="p-2 text-sm text-gray-700 dark:text-gray-200 border border-gray-500"
                            aria-labelledby="dropdownMenuIconButton">
                            <li>
                                <button
                                    class="w-full block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                    type="button" data-modal-target="archive-modal" data-modal-toggle="archive-modal">
                                    Archived List
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="overflow-x-auto">
                <table id="usersTable" class="stripe" style="width:100%">
                    <thead>
                        <tr>
                            <th>Role</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Rate</th>
                            <th>Created At</th>
                            <th>Updated At</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        @foreach ($users as $user)
                            <tr>
                                <td class="capitalize">{{ $user->role }}</td>
                                <td>{{ $user->name }}</td>
                                <td>{{ $user->email }}</td>
                                <td>₱ {{ $user->rate ?? 0 }}</td>
                                <td>{{ $user->created_at }}</td>
                                <td>{{ $user->updated_at }}</td>
                                <td>
                                    <div style="display: flex; gap: 0.5rem; justify-content: center;">
                                        <button class="w-20 px-3 py-1 text-white bg-blue-500 rounded hover:bg-blue-600"
                                            data-modal-target="updateModal{{ $user->id }}"
                                            data-modal-toggle="updateModal{{ $user->id }}">Edit</button>

                                        <form action="{{ route('admin.softDelete', $user->id) }}" method="POST"
                                            onsubmit="confirmation(event)">
                                            @csrf
                                            @method('DELETE')
                                            <button type="submit"
                                                class="w-20 px-3 py-1 text-white bg-red-500 rounded hover:bg-red-600">
                                                Delete
                                            </button>
                                        </form>
                                    </div>
                                </td>
                            </tr>
                        @endforeach
                    </tbody>
                </table>
            </div>
        </div>
    </div>
    @include('layouts.footer')
    <script>
        //DataTable
        new DataTable('#usersTable');

        //Delete Sweet Alert
        function confirmation(event) {
            event.preventDefault();
            swal({
                title: "Are you sure you want to delete this?",
                text: "You won't be able to revert this action!",
                icon: "warning",
                buttons: true,
                dangerMode: true,
            }).then((willDelete) => {
                if (willDelete) {
                    event.target.closest("form").submit(); // Submit the form
                }
            });
        }
    </script>

    </body>

    </html>
