@props(['label', 'name'])

@php
    $defaults = [
        'type' => 'checkbox',
        'id' => $name,
        'name' => $name,
        'value' => old($name)
    ];
@endphp

<x-forms.field :label="$label" :name="$name">
    <div class="rounded-xl bg-white/10 border border-white/10 px-5 py-4 w-full">
        <input {{ $attributes->merge($defaults) }}>
        <span class="pl-1">{{ $label }}</span>
    </div>
</x-forms.field>
