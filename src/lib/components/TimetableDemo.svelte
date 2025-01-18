<script lang="ts">
	import UnassignedLessons from '$lib/components/UnassignedLessons.svelte';
	import LessonColor from '$lib/components/LessonColor.svelte';
	import { format } from 'date-fns';
	import { onMount } from 'svelte';

	interface Schedule {
		timeslots: Array<{ id: string; dayOfWeek: string; startTime: string; endTime: string }>;
		rooms: Array<{ id: string; name: string }>;
		lessons: Array<{
			timeslot: string;
			room: string;
			teacher: string;
			studentGroup: string;
			subject: string;
			id: string;
		}>;
	}

	interface Header {
		id: string;
		name: string;
	}

	export let schedule: Schedule;
	export let activeTab: 'byRoom' | 'byTeacher' | 'byStudentGroup';

	let showTimeslots = true;
	let showAddForm = false;

	// Stan dla nowej lekcji
	let newLesson = {
		subject: '',
		teacher: '',
		studentGroup: '',
		room: null,
		timeslot: null
	};

	$: view = getViewData(schedule, activeTab);

	function getViewData(schedule: Schedule, activeTab: 'byRoom' | 'byTeacher' | 'byStudentGroup') {
		const timeslots = schedule.timeslots;
		let headers: Header[] = [];

		if (activeTab === 'byRoom') {
			headers = schedule.rooms;
		} else if (activeTab === 'byTeacher') {
			headers = [...new Set(schedule.lessons.map((l) => l.teacher))].map((teacher) => ({
				id: btoa(teacher),
				name: teacher
			}));
		} else {
			headers = [...new Set(schedule.lessons.map((l) => l.studentGroup))].map((group) => ({
				id: btoa(group),
				name: group
			}));
		}

		return { timeslots, headers };
	}

	function mapActiveTabToRole(
		activeTab: 'byRoom' | 'byTeacher' | 'byStudentGroup'
	): 'Room' | 'Teacher' | 'Student' {
		if (activeTab === 'byRoom') return 'Room';
		if (activeTab === 'byTeacher') return 'Teacher';
		return 'Student';
	}

	function formatTime(time: string) {
		return format(new Date(`2024-01-01T${time}`), 'HH:mm');
	}

	async function handleDelete(id: string) {
		try {
			const response = await fetch(`${import.meta.env.VITE_API_URL}/lessons/${id}`, {
				method: 'DELETE',
				headers: {
					Accept: 'application/hal+json',
					'Content-Type': 'application/json'
				}
			});

			if (!response.ok) {
				throw new Error('Nie udało się usunąć lekcji');
			}

			// Aktualizacja stanu po usunięciu
			schedule.lessons = schedule.lessons.filter((lesson) => lesson.id !== id);
		} catch (err) {
			console.error('Błąd podczas usuwania lekcji:', err);
		}
	}

	async function handleAdd() {
		try {
			const response = await fetch(`${import.meta.env.VITE_API_URL}/lessons`, {
				method: 'POST',
				headers: {
					Accept: 'application/hal+json',
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(newLesson)
			});

			if (!response.ok) {
				throw new Error('Nie udało się dodać lekcji');
			}

			const addedLesson = await response.json();

			// Aktualizacja stanu po dodaniu
			schedule.lessons = [...schedule.lessons, addedLesson];

			// Reset formularza
			newLesson = {
				subject: '',
				teacher: '',
				studentGroup: '',
				room: null,
				timeslot: null
			};
			showAddForm = false;
		} catch (err) {
			console.error('Błąd podczas dodawania lekcji:', err);
		}
	}

	onMount(async () => {
		try {
			const response = await fetch(`${import.meta.env.VITE_API_URL}/demo-data/SMALL`);
			if (!response.ok) {
				throw new Error('Nie udało się pobrać planu zajęć');
			}
			const data: Schedule = await response.json();
			schedule = data;
		} catch (err: unknown) {
			if (err instanceof Error) {
				console.error(err.message);
			}
		}
	});
</script>

<!-- Przycisk dodawania nowej lekcji -->
<button
	class="mb-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
	on:click={() => (showAddForm = !showAddForm)}
>
	{showAddForm ? 'Anuluj dodawanie' : 'Dodaj nową lekcję'}
</button>

<!-- Formularz dodawania nowej lekcji -->
{#if showAddForm}
	<div class="mb-8 p-4 bg-gray-50 rounded-lg">
		<h3 class="text-lg font-bold mb-4">Dodaj nową lekcję</h3>
		<form on:submit|preventDefault={handleAdd} class="space-y-4">
			<div>
				<label for="subject" class="block text-sm font-medium text-gray-700">Przedmiot</label>
				<input
					id="subject"
					type="text"
					bind:value={newLesson.subject}
					class="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
					required
				/>

				<label for="teacher" class="block text-sm font-medium text-gray-700">Nauczyciel</label>
				<input
					id="teacher"
					type="text"
					bind:value={newLesson.teacher}
					class="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
					required
				/>

				<label for="studentGroup" class="block text-sm font-medium text-gray-700"
					>Grupa uczniów</label
				>
				<input
					id="studentGroup"
					type="text"
					bind:value={newLesson.studentGroup}
					class="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
					required
				/>
				<button
					type="submit"
					class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
				>
					Dodaj lekcję
				</button>
			</div>
		</form>
	</div>
{/if}

<!-- Sekcja Timeslots -->
<section class="mt-8">
	<button
		class="text-2xl font-semibold text-gray-800 mb-4 cursor-pointer flex items-center hover:text-blue-500"
		on:click={() => (showTimeslots = !showTimeslots)}
	>
		Timeslots
		<span class="ml-2">{showTimeslots ? '▼' : '▶'}</span>
	</button>
	{#if showTimeslots}
		<div class="overflow-x-auto">
			<table class="min-w-full border-collapse">
				<thead>
					<tr class="bg-gray-50">
						<th class="border border-gray-200 p-3 text-left">Timeslot</th>
						{#each view.headers as header}
							<th class="border border-gray-200 p-3 text-left">{header.name}</th>
						{/each}
					</tr>
				</thead>
				<tbody>
					{#each view.timeslots as timeslot}
						<tr>
							<th class="border border-gray-200 p-3 text-left bg-gray-50">
								{timeslot.dayOfWeek}
								{formatTime(timeslot.startTime)}-{formatTime(timeslot.endTime)}
							</th>
							{#each view.headers as header}
								<td class="border border-gray-200 p-3">
									{#each schedule.lessons.filter((lesson) => {
										if (activeTab === 'byRoom') {
											return lesson.timeslot === timeslot.id && lesson.room === header.id;
										} else if (activeTab === 'byTeacher') {
											return lesson.timeslot === timeslot.id && lesson.teacher === header.name;
										} else {
											return lesson.timeslot === timeslot.id && lesson.studentGroup === header.name;
										}
									}) as lesson}
										<LessonColor
											{lesson}
											selectedRole={mapActiveTabToRole(activeTab)}
											onDelete={handleDelete}
										/>
									{/each}
								</td>
							{/each}
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	{/if}
</section>

<!-- Sekcja Unassigned Lessons -->
<UnassignedLessons {schedule} {activeTab} />
