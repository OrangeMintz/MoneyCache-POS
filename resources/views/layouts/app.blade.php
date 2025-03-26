

    @include('layouts.header')

    <!-- Page Content -->
    <main>
        {{ $slot }}
    </main>

    @include('layouts.footer')
    
