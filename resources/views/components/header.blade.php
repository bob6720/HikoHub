<nav class="sticky top-0 z-50 bg-black/90 backdrop-blur-lg border-b border-purple-700/50 px-6 md:px-10">
    <div class="flex justify-between items-center py-4 container mx-auto max-w-[1200px]">

        {{-- Logo --}}
        <div class="flex items-center space-x-3">
            <a href="/" class="flex items-center space-x-3 group">
                <img src="{{ Vite::asset('resources/images/miku.gif') }}" alt="Logo" class="h-12 logo-bounce">
                <span class="text-3xl font-extrabold text-purple-400 group-hover:text-pink-400 transition-colors duration-300 neon-text">Hiko Hub</span>
            </a>
        </div>

        {{-- Navigation Links --}}
        <div class="space-x-8 font-semibold text-lg text-purple-300 flex items-center">
            <a href="/" class="hover:text-pink-400 hover:underline neon-text transition">Home</a>
            <a href="/events" class="hover:text-pink-400 hover:underline neon-text transition">Events</a>
            <a href="/spaces" class="hover:text-pink-400 hover:underline neon-text transition">Spaces</a>
            <a href="/contact" class="hover:text-pink-400 hover:underline neon-text transition">Contact Us</a>
        </div>

        {{-- Authenticated User --}}
        @auth
            <div class="space-x-8 font-semibold flex items-center text-purple-400">
                <a href="/spaces/create" class="hover:text-pink-400 neon-text transition">Post a new space</a>

                <form method="POST" action="{{ route('logout') }}">
                    @csrf
                    <button class="hover:text-pink-400 neon-text transition">Log Out</button>
                </form>
            </div>
        @endauth

        {{-- Guest --}}
        @guest
            <div class="space-x-8 font-semibold text-purple-400">
                <a href="/login" class="hover:text-pink-400 neon-text transition">Log In</a>
            </div>
        @endguest

    </div>
</nav>
