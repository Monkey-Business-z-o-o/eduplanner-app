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

<div
	class={`relative rounded-lg shadow border p-3 mb-2 transition-all hover:shadow-md ${getLessonColor()}`}
>
	<button
		on:click={deleteLesson}
		class="absolute top-2 right-2 w-6 h-6 flex items-center justify-center text-red-600 hover:text-red-800 hover:bg-red-100 rounded-full"
	>
		✕
	</button>
	<h5 class="font-bold text-gray-800 pr-8">{lesson.subject}</h5>
	<p class="text-sm text-gray-600 italic">by {lesson.teacher}</p>
	<p class="text-sm text-gray-700">{lesson.studentGroup}</p>
	<small class="text-gray-500 text-xs">{lesson.id}</small>
</div>
