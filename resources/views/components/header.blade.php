<nav class="flex justify-between items-center py-4 border-b border-white/10">
    {{-- Logo --}}
    <div>
        <a href="/">
            <img src="{{ Vite::asset('resources/images/miku.gif') }}" alt="Logo" class="h-10">
            <span class="text-2xl font-bold text-white ml-2">Hiko Hub</span>
        </a>
    </div>

    {{-- Navigation Links --}}
    <div class="space-x-6 font-bold">
        <a href="/" class="hover:underline">Home</a>
        <a href="/events" class="hover:underline">Events</a>
        <a href="/spaces" class="hover:underline">Spaces</a>
        <a href="/contact" class="hover:underline">Contact Us</a>
    </div>

    {{-- Authenticated User --}}
    @auth
        <div class="space-x-6 font-bold flex items-center">
            <a href="/spaces/create" class="hover:underline">Post a new space</a>

            <form method="POST" action="/logout" class="inline">
                @csrf
                @method('DELETE')
                <button class="hover:underline">Log Out</button>
            </form>
        </div>
    @endauth

    {{-- Guest --}}
    @guest
        <div class="space-x-6 font-bold">
            <a href="/login" class="hover:underline">Log In</a>
        </div>
    @endguest
</nav>
