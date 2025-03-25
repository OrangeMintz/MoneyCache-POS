<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>{{ ucfirst(request()->segment(1) ?? 'Home') }}</title>
    {{-- favicon --}}
    <link rel="icon" type="image/png" href="{{ asset('img/LogoIcon.png') }}">

    @vite(['resources/css/app.css', 'resources/js/app.js'])

    <style>
        /* Styling for the layout to create 3 columns */
        .container-transaction {
            display: grid;
            grid-template-columns: minmax(300px, 3fr) 1fr;
            gap: 10px;
            /* margin: 0 auto; */
        }

        .form-column {
            grid-column: span 1;
        }

        .total-column {
            grid-column: span 1;
            padding: 20px;
            background-color: white;
            border-radius: 8px;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }

        @layer base {

            input[type="number"]::-webkit-inner-spin-button,
            input[type="number"]::-webkit-outer-spin-button {
                -webkit-appearance: none;
                margin: 0;
            }

            input[type="number"] {
                -moz-appearance: textfield;
            }
        }
    </style>

    {{-- datatable css --}}
    <link rel="stylesheet" href="https://cdn.datatables.net/2.2.2/css/dataTables.dataTables.css" />

    {{-- sweet alert cdn --}}
    <script src="https://cdnjs.cloudflare.com/ajax/libs/sweetalert/2.1.2/sweetalert.min.js"
        integrity="sha512-AA1Bzp5Q0K1KanKKmvN/4d3IRKVlv9PYgwFPvm32nPO6QS8yH1HO7LbgB1pgiOxPtfeg5zEn2ba64MUcqJx6CA=="
        crossorigin="anonymous" referrerpolicy="no-referrer"></script>

    {{-- fontawesome cdn --}}
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.13.1/css/all.min.css">
    <script src="https://kit.fontawesome.com/da305c7c97.js" crossorigin="anonymous"></script>

    {{-- toaster cdn --}}
    <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/toastr.css">

    {{-- Flatpickr CSS --}}
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/flatpickr/dist/flatpickr.min.css">

</head>

<!-- Spinner (Initially Visible) -->
<div id="spinner" class="flex justify-center items-center h-screen">
    @include('components.spinner')
</div>
<body class="dark:bg-gray-950">
    @include('layouts.navigation')

    @include('components.modals.lock')

    <script>
        document.addEventListener("DOMContentLoaded", function() {
            if (sessionStorage.getItem("locked") === "true") {
                document.getElementById("lockscreen").classList.remove("hidden");
            }
        });

        window.onload = function () {
            document.getElementById('spinner').style.display = 'none';
        };

    </script>
