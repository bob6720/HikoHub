{{-- resources/views/book-event.blade.php --}}
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Book an Event</title>
    <script defer>
        document.addEventListener('DOMContentLoaded', () => {
            const toggleSection = (checkboxId, sectionId) => {
                const checkbox = document.getElementById(checkboxId);
                const section = document.getElementById(sectionId);
                const toggle = () => {
                    section.style.display = checkbox.checked ? 'block' : 'none';
                };
                checkbox.addEventListener('change', toggle);
                toggle(); // Initial toggle
            };

            toggleSection('catering_toggle', 'catering_section');
            toggleSection('equipment_toggle', 'equipment_section');
            toggleSection('extras_toggle', 'extras_section');
        });
    </script>
    <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
</head>
<body class="bg-gray-100 p-8">

    <div class="max-w-4xl mx-auto bg-white shadow rounded p-6">
        <h1 class="text-2xl font-bold mb-6">Book an Event</h1>

        <x-forms.form action="{{ route('book.event.submit') }}" method="POST">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <x-forms.input name="event_name" label="Event Name" />
                <x-forms.input name="organiser" label="Organiser" />
                <x-forms.input name="business" label="Business" />
                <x-forms.input name="contact_number" label="Contact Number" />
                <x-forms.input name="contact_email" label="Contact Email" type="email" />
                <x-forms.input name="event_date" label="Date of Event" type="date" />
                <x-forms.input name="start_time" label="Start Time" type="time" />
                <x-forms.input name="end_time" label="End Time" type="time" />
                <x-forms.input name="number_of_people" label="Number of People" type="number" />
                <x-forms.input name="parking" label="Parking" />
                <x-forms.input name="access_required" label="Access Required (From - To)" placeholder="e.g. 08:00 - 17:00" class="md:col-span-2" />
                <x-forms.input name="aircon_time" label="Air Conditioning (From - To)" placeholder="e.g. 09:00 - 16:00" class="md:col-span-2" />
            </div>

            <x-forms.separator />

            <x-forms.checkbox name="catering_toggle" label="Catering Required?" id="catering_toggle" />

            <div id="catering_section" class="mt-4 hidden space-y-4">
                <h2 class="text-xl font-semibold">Catering Details</h2>
                <x-forms.input name="catering_required" label="Catering Required" />
                <x-forms.input name="caterer" label="Caterer" />
                <x-forms.input name="catering_organiser" label="Catering Organiser" />
                <x-forms.input name="alcohol" label="Alcohol" />
                <x-forms.input name="catering_time_required" label="Time Required" />
                <x-forms.input name="catering_gl_code" label="GL Code" />
                <x-forms.input name="dietary_requirements" label="Dietary Requirements" />
            </div>

            <x-forms.separator />

            <x-forms.checkbox name="equipment_toggle" label="Equipment Required?" id="equipment_toggle" />

            <div id="equipment_section" class="mt-4 hidden space-y-4">
                <h2 class="text-xl font-semibold">Equipment Details</h2>
                <x-forms.input name="av_equipment" label="AV Equipment" />
                <x-forms.input name="chairs" label="Chairs" />
                <x-forms.input name="tables" label="Tables" />
                <x-forms.input name="displays" label="Displays" />
                <x-forms.input name="marketing_signage" label="Marketing Signage" />
                <x-forms.input name="equipment_gl_code" label="GL Code" />
            </div>

            <x-forms.separator />

            <x-forms.checkbox name="extras_toggle" label="Extras?" id="extras_toggle" />

            <div id="extras_section" class="mt-4 hidden space-y-4">
                <h2 class="text-xl font-semibold">Extras</h2>
                <x-forms.input name="boards" label="Boards" />
                <x-forms.input name="furniture" label="Furniture" />
                <x-forms.input name="comms" label="Comms" />
                <x-forms.input name="for_visitors" label="For Visitors" />
                <x-forms.input name="music" label="Music" />
                <x-forms.input name="arriving" label="Arriving" />
            </div>

            <div class="mt-6">
                <x-button type="submit">Submit</x-button>
            </div>
        </x-forms.form>
    </div>

</body>
</html>
