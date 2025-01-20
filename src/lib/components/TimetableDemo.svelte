<script lang="ts">
  import LessonColor from '$lib/components/lessons/LessonColor.svelte';
  import { format } from 'date-fns';
  import { onMount } from 'svelte';

  export let schedule: Schedule;
  export let activeTab: 'byRoom' | 'byTeacher' | 'byStudentGroup';

  let showTimeslots = true;

  $: view = getViewData(schedule, activeTab);

  function getViewData(schedule: Schedule, activeTab: 'byRoom' | 'byTeacher' | 'byStudentGroup') {
    const timeslots = schedule.timeslots;
    let headers: Header[] = [];

    if (activeTab === 'byRoom') {
      headers = schedule.rooms;
    } else if (activeTab === 'byTeacher') {
      headers = [...new Set(schedule.lessons.map(l => l.teacher))].map(teacher => ({
        id: btoa(teacher),
        name: teacher
      }));
    } else {
      headers = [...new Set(schedule.lessons.map(l => l.studentGroup))].map(group => ({
        id: btoa(group),
        name: group
      }));
    }

    return { timeslots, headers };
  }

  function mapActiveTabToRole(activeTab: 'byRoom' | 'byTeacher' | 'byStudentGroup'): 'Room' | 'Teacher' | 'Student' {
    if (activeTab === 'byRoom') return 'Room';
    if (activeTab === 'byTeacher') return 'Teacher';
    return 'Student';
  }

  function formatTime(time: string) {
    return format(new Date(`2024-01-01T${time}`), 'HH:mm');
  }
</script>

<!-- Sekcja Timeslots -->
<section class="mt-8">
  <button class="text-2xl font-semibold text-gray-800 mb-4 cursor-pointer flex items-center hover:text-blue-500" on:click={() => (showTimeslots = !showTimeslots)}>
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
              {timeslot.dayOfWeek} {formatTime(timeslot.startTime)}-{formatTime(timeslot.endTime)}
            </th>
            {#each view.headers as header}
              <td class="border border-gray-200 p-3">
                {#each schedule.lessons.filter(lesson => {
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
                          onDelete={() => {}}
                          onEdit={() => {}}
                          onUpdate={() => {}}
                          onCancelEdit={() => {}}
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
