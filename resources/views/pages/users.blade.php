@include('layouts.header')

<main>
    <div class="font-sans bg-gray-100 p-6">
        <div class="bg-white p-4 mb-4">
            <div class="card-header flex justify-between items-center">
                <h5 class="title font-semibold text-[26px]">Manage Users</h5>
                <div class="flex flex-wrap justify-center">
                    <a href="{{ route('pdf') }}"
                        class="bg-emerald-700 hover:bg-emerald-900 rounded-lg text-white text-md text-center self-center px-3 py-2 my-2 mx-2">Add
                        User</a>
                </div>
            </div>
            <div class="overflow-x-auto">
                <table id="usersTable" class="stripe" style="width:100%">
                    <thead>
                        <tr>
                            <th>Role</th>
                            <th>Name</th>
                            <th>Email</th>
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
                                <td>{{ $user->created_at }}</td>
                                <td>{{ $user->updated_at }}</td>
                                <td>
                                    <div style="display: flex; gap: 0.5rem; justify-content: center;">
                                        <button data-modal-target="edit-modal"
                                            class="w-20 px-3 py-1 text-white bg-blue-500 rounded hover:bg-blue-600"
                                            data-modal-toggle="add-modal">Edit</button>
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
        new DataTable('#usersTable');

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
