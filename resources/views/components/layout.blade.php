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
    <div class="px-10 flex-grow max-w-[986px] mx-auto w-full flex flex-col">
        <x-header />

        <main class="mt-10 flex-grow">
            {{ $slot }}
        </main>

        <x-footer />
    </div>
</body>
</html>
