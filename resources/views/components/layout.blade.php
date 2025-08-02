<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Hiko Hub</title>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Hanken+Grotesk:wght@400;500;600&display=swap" rel="stylesheet" />
    @vite(['resources/css/app.css', 'resources/js/app.js'])
</head>
<body class="bg-black text-white font-hanken-grotesk min-h-screen flex flex-col">

    {{-- Header spans full width --}}
    <x-header />

    {{-- Main content area centered and width-constrained --}}
    <main class="flex-grow px-10 mt-10 w-full max-w-[986px] mx-auto">
        {{ $slot }}
    </main>

    {{-- Footer spans full width --}}
    <x-footer />

</body>
</html>
