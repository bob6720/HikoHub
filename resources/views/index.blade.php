<x-layout>
    <main class="flex-grow container mx-auto px-4 py-12 text-center">
        <h2 class="text-4xl font-bold mb-4">Welcome to Your New Laravel App</h2>
        <p class="text-lg text-gray-600 mb-6">This is a basic landing page. You can customize it however you'd like.</p>
        <a href="{{ route('login') }}" class="inline-block bg-blue-500 text-white px-6 py-3 rounded hover:bg-blue-600">
            Get Started
        </a>
    </main>
</x-layout>
