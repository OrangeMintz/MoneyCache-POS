<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="csrf-token" content="{{ csrf_token() }}">

        <title>{{ config('app.name', 'MoneyCache') }}</title>

        {{-- fav icon --}}
        <link rel="icon" type="image/png" href="{{ asset('img/LogoIcon.png') }}">

        <!-- Fonts -->
        <link rel="preconnect" href="https://fonts.bunny.net">
        <link href="https://fonts.bunny.net/css?family=figtree:400,500,600&display=swap" rel="stylesheet" />
        
         <!-- fontawesome cdn -->
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.13.1/css/all.min.css">

        <!-- Scripts -->
        @vite(['resources/css/app.css', 'resources/js/app.js'])
        
        <style>
            /* pre-loader animation  */
            .animated-mc {
                animation: fadeInOut 0.6s infinite; /* 2s duration, infinite loop */
            }

            @keyframes fadeInOut {
                0%, 100% { opacity: 0; }  /* Start & End with invisible */
                50% { opacity: 1; }       /* Fully visible at 50% of animation */
            }
        </style>
    </head>
    <body class="font-sans text-gray-900 antialiased">
        @include('components.loader')

        {{-- <div class="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-gray-100 dark:bg-gray-900">
            <div>
                <a href="/">
                    <x-application-logo class="w-20 h-20 fill-current text-gray-500" />
                </a>
            </div>

            <div class="w-full sm:max-w-md mt-6 px-6 py-4 bg-white dark:bg-gray-800 shadow-md overflow-hidden sm:rounded-lg">
                {{ $slot }}
            </div>
        </div> --}}
        {{ $slot }}

        <script src="https://kit.fontawesome.com/da305c7c97.js" crossorigin="anonymous"></script>

        <script src="{{asset('js/darkmode.js')}}"></script>


    </body>
</html>
