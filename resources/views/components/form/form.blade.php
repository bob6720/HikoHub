@props(['method' => 'GET'])

<form {{ $attributes->merge(['class' => 'max-w-2xl mx-auto space-y-6', 'method' => $method]) }}>
    @if (strtoupper($method) !== 'GET')
        @csrf
        @method($method)
    @endif

    {{ $slot }}
</form>
