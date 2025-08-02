<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    @routes
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title inertia>{{ config('app.name', 'Laravel') }}</title>

    <!-- Vite CSS/JS assets -->
    @viteReactRefresh
    @vite('resources/js/app.jsx')

    <!-- Inertia Head -->
    @inertiaHead
</head>
<body class="font-sans antialiased">
    @inertia
</body>
</html>
