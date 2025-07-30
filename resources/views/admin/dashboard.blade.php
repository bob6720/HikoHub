<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Admin Dashboard</title>
    <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
</head>
<body class="bg-gray-100 min-h-screen">

    <nav class="bg-white shadow p-4 flex justify-between items-center">
        <h1 class="text-2xl font-bold">Admin Dashboard</h1>
        <form method="POST" action="{{ route('logout') }}">
            @csrf
            <button class="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
                Logout
            </button>
        </form>
    </nav>

    <div class="p-8">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="bg-white p-6 rounded shadow">
                <h2 class="text-xl font-semibold mb-2">Welcome, {{ Auth::user()->name }}</h2>
                <p class="text-gray-600">You are logged in as an admin.</p>
            </div>

            <div class="bg-white p-6 rounded shadow">
                <h2 class="text-xl font-semibold mb-2">System Info</h2>
                <ul class="text-gray-700 list-disc pl-5">
                    <li>Laravel Version: {{ app()->version() }}</li>
                    <li>PHP Version: {{ phpversion() }}</li>
                    <li>Database: PostgreSQL</li>
                </ul>
            </div>
        </div>

        <div class="mt-8 bg-white p-6 rounded shadow">
            <h2 class="text-xl font-semibold mb-4">Actions</h2>
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <button class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Manage Users</button>
                <button class="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">View Reports</button>
                <button class="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600">Settings</button>
            </div>
        </div>
    </div>

</body>
</html>
