<script lang="ts">
	import { onMount } from 'svelte';

	interface Lesson {
		subject: string;
		teacher: string;
		studentGroup: string;
		room: { name: string };
		timeslot: {
			dayOfWeek: string;
			startTime: { hour: number; minute: number };
			endTime: { hour: number; minute: number };
		};
	}

	let lessons: Lesson[] | null = null; // Zmienione na null, aby pokazać, że dane jeszcze nie zostały załadowane
	let loading: boolean = true;
	let error: string | null = null;

	// Fetch lessons from the API
	onMount(async () => {
		try {
			const response = await fetch('https://backend.kebson.fun/lessons?page=0&size=20', {
				headers: {
					Accept: 'application/json' // Jeśli API zwraca dane w formacie JSON
				}
			});
			if (!response.ok) {
				throw new Error('Failed to fetch lessons');
			}
			const data: Lesson[] = await response.json();
			lessons = data;
		} catch (err: unknown) {
			if (err instanceof Error) {
				error = err.message;
			} else {
				error = 'An unknown error occurred';
			}
		} finally {
			loading = false;
		}
	});
</script>

{#if loading}
	<p>Wczytywanie lekcji...</p>
{:else if error}
	<p>Error: {error}</p>
{:else if lessons}
	<ul>
		{#each lessons as lesson}
			<li>
				<div>
					<strong>{lesson.subject}</strong> - {lesson.teacher}
				</div>
				<div>Group: {lesson.studentGroup}</div>
				<div>Room: {lesson.room.name}</div>
				<div>
					{lesson.timeslot.dayOfWeek}, {lesson.timeslot.startTime.hour}:{lesson.timeslot.startTime
						.minute} - {lesson.timeslot.endTime.hour}:{lesson.timeslot.endTime.minute}
				</div>
			</li>
		{/each}
	</ul>
{/if}
