<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>{{ config('app.name', 'MoneyCache POS') }}</title>

    {{-- fav icon --}}
    <link rel="icon" type="image/png" href="{{ asset('img/LogoIcon.png') }}">

    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.bunny.net">
    <link href="https://fonts.bunny.net/css?family=figtree:400,500,600&display=swap" rel="stylesheet" />

    <!-- Scripts -->
    @vite(['resources/css/app.css', 'resources/js/app.js'])

    {{-- datatable css --}}
    <link rel="stylesheet" href="https://cdn.datatables.net/2.2.2/css/dataTables.dataTables.css" />
</head>

<body class="font-sans antialiased dark:bg-gray-950">
    <div class="min-h-screen bg-gray-100 dark:bg-gray-900">
        @include('layouts.header')

        <!-- Page Content -->
        <main>
            {{ $slot }}
        </main>
    </div>

    <script src="{{ asset('js/darkmode.js') }}"></script>

    {{-- dashboard User log datatable --}}
    <script>
        new DataTable('#userLog', {
            paging: false,
            scrollCollapse: true,
            scrollY: '200px'
        });
    </script>

    {{-- Jquery cdn for datatable and toaster to work --}}
    <script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>

    {{-- datatable cdn --}}
    <script src="https://cdn.datatables.net/2.2.2/js/dataTables.js"></script>

</body>

</html>
