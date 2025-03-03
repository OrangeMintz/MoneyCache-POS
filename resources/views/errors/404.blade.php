<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>404 Not Found</title>
  <!-- Scripts -->
  @vite(['resources/css/app.css', 'resources/js/app.js'])
</head>
<body>
  <section class="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900">
    <div class="text-center max-w-screen-md px-6">
        <h1 class="mb-4 text-4xl font-extrabold text-primary-600 dark:text-primary-500">404</h1>
        <p class="mb-4 text-4xl font-bold text-gray-900 dark:text-white">Something's missing.</p>
        <p class="mb-6 text-lg font-light text-gray-500 dark:text-gray-400">
            Sorry, we can't find that page. You'll find lots to explore on the home page.
        </p>
        <a href="{{route('dashboard')}}" class="inline-flex items-center px-6 py-3 text-lg font-medium text-white bg-primary-600 rounded-lg hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 dark:focus:ring-primary-900">
            Back to Homepage
        </a>
    </div>
  </section>
</body>
</html>
