<script lang="ts">
	import LessonColor from '$lib/components/LessonColor.svelte';

	export let schedule: {
		lessons: Array<{
			timeslot: string | null;
			room: string | null;
			subject: string;
			teacher: string;
			studentGroup: string;
			id: string;
		}>;
	};
	export let activeTab: 'byRoom' | 'byTeacher' | 'byStudentGroup';

	let showUnassignedLessons = true;

	let newLesson = {
		timeslot: null,
		room: null,
		subject: '',
		teacher: '',
		studentGroup: '',
		id: ''
	};

	// Dynamiczne pobieranie URL z zmiennej środowiskowej
	const apiUrl = import.meta.env.VITE_API_URL;

	async function addLesson() {
		try {
			const response = await fetch(`${apiUrl}/lessons`, {
				method: 'POST',
				headers: {
					Accept: 'application/hal+json',
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(newLesson)
			});

			if (!response.ok) {
				throw new Error('Failed to add lesson');
			}

			const addedLesson = await response.json();
			schedule.lessons = [...schedule.lessons, addedLesson];
			newLesson = {
				timeslot: null,
				room: null,
				subject: '',
				teacher: '',
				studentGroup: '',
				id: ''
			};
		} catch (err: unknown) {
			if (err instanceof Error) {
				console.error(err.message);
			}
		}
	}

	function mapActiveTabToRole(
		activeTab: 'byRoom' | 'byTeacher' | 'byStudentGroup'
	): 'Room' | 'Teacher' | 'Student' {
		if (activeTab === 'byRoom') return 'Room';
		if (activeTab === 'byTeacher') return 'Teacher';
		return 'Student';
	}

	function handleDelete(id: string) {
		schedule.lessons = schedule.lessons.filter((lesson) => lesson.id !== id);
	}
</script>

<!-- Sekcja Unassigned Lessons -->
<section class="mt-8">
	<button
		class="text-2xl font-semibold text-gray-800 mb-4 cursor-pointer flex items-center hover:text-blue-500"
		on:click={() => (showUnassignedLessons = !showUnassignedLessons)}
	>
		Unassigned Lessons
		<span class="ml-2">{showUnassignedLessons ? '▼' : '▶'}</span>
	</button>
	{#if showUnassignedLessons}
		<div class="overflow-x-auto">
			<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
				{#each schedule.lessons.filter((lesson) => lesson.timeslot == null || lesson.room == null) as lesson}
					<div class="bg-gray-50 rounded p-2">
						<LessonColor
							{lesson}
							selectedRole={mapActiveTabToRole(activeTab)}
							onDelete={handleDelete}
						/>
					</div>
				{/each}
			</div>
		</div>
	{/if}
</section>

<!-- Form to add a new lesson -->
<section class="mt-8">
	<h3 class="text-lg font-bold mb-2">Add a new lesson</h3>
	<form on:submit|preventDefault={addLesson}>
		<div class="mb-2">
			<label for="subject" class="block text-sm font-medium text-gray-700">Subject</label>
			<input
				id="subject"
				type="text"
				bind:value={newLesson.subject}
				class="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
				required
			/>
		</div>
		<div class="mb-2">
			<label for="teacher" class="block text-sm font-medium text-gray-700">Teacher</label>
			<input
				id="teacher"
				type="text"
				bind:value={newLesson.teacher}
				class="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
				required
			/>
		</div>
		<div class="mb-2">
			<label for="studentGroup" class="block text-sm font-medium text-gray-700">Student Group</label
			>
			<input
				id="studentGroup"
				type="text"
				bind:value={newLesson.studentGroup}
				class="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
				required
			/>
		</div>
		<button type="submit" class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
			>Add Lesson</button
		>
	</form>
</section>
