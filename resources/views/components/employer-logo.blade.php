@props(['employer', 'width' => 64])

<img src="{{ $employer->logo }}" alt="{{ $employer->name }}" width="{{ $width }}" height="{{ $width }}" class="rounded" />
