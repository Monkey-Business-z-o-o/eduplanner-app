<script lang="ts">
  import LessonColor from '$lib/components/lessons/LessonColor.svelte';
  import SectionHeader from '../SectionHeader.svelte';
  import AddLesson from './AddLesson.svelte';  // Zaimportuj komponent formularza dodawania lekcji
  import type { Schedule, Lesson } from '$lib/types/types.ts';

  export let schedule: Schedule;
  export let activeTab: 'byRoom' | 'byTeacher' | 'byStudentGroup';
  export let onUpdateLesson: (lesson: Lesson) => void;

  let isOpen = true;
  let error: string | null = null;
  let editingLessonId: string | null = null; // Dla śledzenia edytowanej lekcji

  const roleMap = {
    byRoom: 'Room',
    byTeacher: 'Teacher',
    byStudentGroup: 'Student'
  } as const;

  async function handleDelete(id: string) {
    try {
      schedule.lessons = schedule.lessons.filter(lesson => lesson.id !== id);
    } catch (err) {
      error = err instanceof Error ? err.message : 'Failed to delete lesson';
      console.error('Error deleting lesson:', err);
    }
  }

  function startEditing(lesson: Lesson) {
    editingLessonId = lesson.id;
  }

  function cancelEditing() {
    editingLessonId = null;
  }

  $: unassignedLessons = schedule.lessons.filter(
          lesson => !lesson.timeslot || !lesson.room
  );
</script>

{#if error}
  <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
    <strong class="font-bold">Error!</strong>
    <span class="block sm:inline"> {error}</span>
  </div>
{/if}

<section class="mt-8">
  <div class="bg-white rounded-lg shadow-lg overflow-hidden">
    <SectionHeader
            title="Nieprzypisane lekcje"
            bind:isOpen
            textColor="text-red-600"
    />

    {#if isOpen}
      <div class="p-4">
        <!-- Formularz dodawania lekcji -->
        <AddLesson schedule={schedule} />

        <!-- Lista nieprzypisanych lekcji -->
        <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-2 mt-4">
          {#each unassignedLessons as lesson (lesson.id)}
            <div class="bg-gray-50 rounded p-2">
              <LessonColor
                      lesson={lesson}
                      selectedRole={roleMap[activeTab]}
                      onDelete={handleDelete}
                      onEdit={() => startEditing(lesson)}
                      isEditing={editingLessonId === lesson.id}
                      onUpdate={onUpdateLesson}
                      onCancelEdit={cancelEditing}
              />
            </div>
          {/each}
        </div>
      </div>
    {/if}
  </div>
</section>
