<script lang="ts">
	import LessonCard from '$lib/components/LessonCard.svelte';

	interface Lesson {
		timeslot: string | null;
		room: string | null;
		subject: string;
		teacher: string;
		studentGroup: string;
		id: string;
	}

	interface Schedule {
		lessons: Lesson[];
	}

	export let schedule: Schedule;

	$: unassignedLessons = schedule.lessons.filter((lesson: Lesson) =>
		lesson.timeslot == null || lesson.room == null
	);
</script>

<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
 {#each unassignedLessons as lesson}
  <div class="bg-gray-50 rounded p-2">
   <LessonCard {lesson} />
  </div>
 {/each}
</div>