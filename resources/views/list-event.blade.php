<x-layout>
    <div class="max-w-6xl mx-auto">
        <h1 class="text-3xl font-bold mb-6">Booked Events</h1>

        @if(session('success'))
            <div class="bg-green-100 text-green-800 p-3 rounded mb-4">
                {{ session('success') }}
            </div>
        @endif

        @if($events->isEmpty())
            <p class="text-gray-400">No events booked yet.</p>
        @else
            <div class="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                @foreach($events as $event)
                    <div class="rounded-xl bg-white/10 border border-white/10 backdrop-blur p-6 shadow-md">
                        <h2 class="text-xl font-semibold text-white mb-2">{{ $event->event_name }}</h2>
                        <p class="text-sm text-gray-300">Organised by: <strong>{{ $event->organiser }}</strong></p>
                        <p class="text-sm text-gray-300">Date: {{ \Carbon\Carbon::parse($event->event_date)->format('d M Y') }}</p>
                        <p class="text-sm text-gray-300">Time: {{ $event->start_time }} - {{ $event->end_time }}</p>
                        <p class="text-sm text-gray-300">People: {{ $event->number_of_people }}</p>
                    </div>
                @endforeach
            </div>
        @endif
    </div>
</x-layout>
