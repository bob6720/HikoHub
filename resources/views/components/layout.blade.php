<!doctype html>
<html lang="en" class="scroll-smooth">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Hiko Hub</title>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Hanken+Grotesk:wght@400;500;600&display=swap" rel="stylesheet" />
    @vite(['resources/css/app.css', 'resources/js/app.js'])
</head>
<body class="bg-gradient-to-br from-black via-purple-900 to-black text-white font-hanken-grotesk min-h-screen flex flex-col">

    {{-- Header spans full width --}}
    <x-header />

    {{-- Main content area centered and width-constrained --}}
    <main class="flex-grow px-6 md:px-10 mt-12 w-full max-w-[986px] mx-auto text-center">
        {{ $slot }}
    </main>

    {{-- Footer spans full width --}}
    <x-footer />

</body>
</html>
