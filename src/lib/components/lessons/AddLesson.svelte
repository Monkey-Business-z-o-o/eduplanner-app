<script lang="ts">
    import SectionHeader from '../common/SectionHeader.svelte';
    import type { Schedule } from '$lib/types/types.ts';

    export let schedule: Schedule;

    let isOpen = false;

    let newLesson = {
        subject: '',
        teacher: '',
        studentGroup: '',
        room: null,
        timeslot: null,
    };

    async function handleAdd() {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/lessons`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/hal+json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newLesson),
            });

            if (!response.ok) {
                throw new Error('Nie udało się dodać lekcji');
            }

            const addedLesson = await response.json();
            schedule.lessons = [...schedule.lessons, addedLesson];

            // Reset formularza
            newLesson = {
                subject: '',
                teacher: '',
                studentGroup: '',
                room: null,
                timeslot: null,
            };
            isOpen = false;
        } catch (err) {
            console.error('Błąd podczas dodawania lekcji:', err);
        }
    }
</script>

<div class="max-w-md mt-10 p-6 bg-gray-300 rounded-lg shadow-md">
    <SectionHeader title="Dodaj nową lekcję" bind:isOpen />

    {#if isOpen}
        <div class="bg-red-50 p-4 rounded-lg shadow-sm mt-4"> <!-- Tło dla rozwijanego formularza -->
            <form on:submit|preventDefault={handleAdd} class="space-y-4">
                <div>
                    <label for="subject" class="block text-sm font-medium text-gray-700">Przedmiot</label>
                    <input
                            id="subject"
                            type="text"
                            bind:value={newLesson.subject}
                            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            required
                    />
                </div>
                <div>
                    <label for="teacher" class="block text-sm font-medium text-gray-700">Nauczyciel</label>
                    <input
                            id="teacher"
                            type="text"
                            bind:value={newLesson.teacher}
                            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            required
                    />
                </div>
                <div>
                    <label for="studentGroup" class="block text-sm font-medium text-gray-700">Grupa uczniów</label>
                    <input
                            id="studentGroup"
                            type="text"
                            bind:value={newLesson.studentGroup}
                            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            required
                    />
                </div>
                <button
                        type="submit"
                        class="w-full py-2 px-4 bg-red-900 text-white font-semibold rounded-md shadow hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                >
                    Dodaj lekcję
                </button>
            </form>
        </div>
    {/if}
</div>
