<x-layout>
    <div class="max-w-md mx-auto mt-10">
        <h2 class="text-xl font-bold mb-4">Login</h2>

        <form method="POST" action="{{ route('login') }}">
            @csrf

            <div class="mb-4">
                <label>Email</label>
                <input type="email" name="email" class="w-full border p-2 rounded text-black" required autofocus>
            </div>

            <div class="mb-4">
                <label>Password</label>
                <input type="password" name="password" class="w-full border p-2 rounded text-black" required>
            </div>

            <button type="submit" class="bg-blue-600 text-white px-4 py-2 rounded">Login</button>
        </form>
    </div>
</x-layout>
