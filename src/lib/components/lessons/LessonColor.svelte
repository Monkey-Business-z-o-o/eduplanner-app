<script lang="ts">
	interface Lesson {
		subject: string;
		teacher: string;
		studentGroup: string;
		room: string;
		id: string;
	}

	export let lesson: Lesson;
	export let selectedRole: 'Room' | 'Teacher' | 'Student';
	export let onDelete: (id: string) => void;
	export let onEdit: () => void;
	export let isEditing: boolean = false;
	export let onUpdate: (lesson: Lesson) => void;
	export let onCancelEdit: () => void;

	let editedLesson = { ...lesson };

	const teacherColors: Record<string, string> = {
		'A. Turing': 'bg-green-200 border-green-400',
		'M. Curie': 'bg-blue-200 border-blue-400',
		'C. Darwin': 'bg-purple-200 border-purple-400',
		'I. Jones': 'bg-red-200 border-red-400',
		'P. Cruz': 'bg-teal-200 border-teal-400'
	};

	const studentColors: Record<string, string> = {
		'9th grade': 'bg-yellow-200 border-yellow-400',
		'10th grade': 'bg-orange-200 border-orange-400',
		'11th grade': 'bg-pink-200 border-pink-400'
	};

	const roomColors: Record<string, string> = {
		'Room A': 'bg-gray-200 border-gray-400',
		'Room B': 'bg-indigo-200 border-indigo-400',
		'Room C': 'bg-lime-200 border-lime-400'
	};

	const getLessonColor = () => {
		switch (selectedRole) {
			case 'Teacher':
				return teacherColors[lesson.teacher] || 'bg-gray-100 border-gray-300';
			case 'Student':
				return studentColors[lesson.studentGroup] || 'bg-gray-100 border-gray-300';
			case 'Room':
				return roomColors[lesson.room] || 'bg-gray-100 border-gray-300';
			default:
				return 'bg-gray-100 border-gray-300';
		}
	};

	function handleSubmit() {
		onUpdate(editedLesson);
		onCancelEdit();
	}

	// Dynamiczne pobieranie URL z zmiennej środowiskowej
	const apiUrl = import.meta.env.VITE_API_URL;

	async function deleteLesson() {
		try {
			const response = await fetch(`${apiUrl}/lessons/${lesson.id}`, {
				method: 'DELETE',
				headers: {
					Accept: 'application/hal+json',
					'Content-Type': 'application/json'
				}
			});

			if (!response.ok) {
				throw new Error('Failed to delete lesson');
			}

			onDelete(lesson.id);
		} catch (err: unknown) {
			if (err instanceof Error) {
				console.error(err.message);
			}
		}
	}
</script>

<div class={`relative rounded-lg shadow border p-3 mb-2 transition-all hover:shadow-md ${getLessonColor()}`}>
	{#if isEditing}
		<form on:submit|preventDefault={handleSubmit} class="space-y-2">
			<!-- Pola formularza do edycji lekcji -->
			<div>
				<label for="subject" class="text-sm text-gray-600">Przedmiot</label>
				<input
				    id="subject"
						type="text"
						bind:value={editedLesson.subject}
						class="w-full px-2 py-1 border rounded"
				/>
			</div>
			<div>
				<label for="teacher" class="text-sm text-gray-600">Nauczyciel</label>
				<input
				    id="teacher"
						type="text"
						bind:value={editedLesson.teacher}
						class="w-full px-2 py-1 border rounded"
				/>
			</div>
			<div>
				<label for="studentGroup" class="text-sm text-gray-600">Grupa</label>
				<input
				    id="studentGroup"
						type="text"
						bind:value={editedLesson.studentGroup}
						class="w-full px-2 py-1 border rounded"
				/>
			</div>
			<div>
				<label for="room" class="text-sm text-gray-600">Pokój</label>
				<input
				    id="room"
						type="text"
						bind:value={editedLesson.room}
						class="w-full px-2 py-1 border rounded"
				/>
			</div>
			<div class="flex gap-2 mt-2">
				<button
						type="submit"
						class="px-2 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
				>
					Zapisz
				</button>
				<button
						type="button"
						class="px-2 py-1 text-sm bg-gray-600 text-white rounded hover:bg-gray-700"
						on:click={onCancelEdit}
				>
					Anuluj
				</button>
			</div>
		</form>
	{:else}
		<div class="flex justify-between items-start">
			<div>
				<div class="font-semibold">{lesson.subject}</div>
				<div class="text-sm text-gray-600 italic">by {lesson.teacher}</div>
				<div class="text-sm text-gray-700">{lesson.studentGroup}</div>
				<small class="text-gray-500 text-xs">{lesson.id}</small>
			</div>
			<div class="flex gap-1">
				<button
						class="text-blue-600 hover:text-blue-800"
						on:click={onEdit}
				>
					✎
				</button>
				<button
						class="text-red-600 hover:text-red-800"
						on:click={deleteLesson}
				>
					&#x2716;
				</button>
			</div>
		</div>
	{/if}
</div>
