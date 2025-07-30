@props(['tag', 'size' => 'base'])

<span class="text-white text-sm bg-blue-600 rounded-full px-2 py-1 text-{{ $size }}">
    {{ $tag->name }}
</span>
