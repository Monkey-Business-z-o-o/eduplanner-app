<script lang="ts">
  import LessonColor from '$lib/components/LessonColor.svelte';
  import { format } from 'date-fns';

  // Interfejsy dla modelu danych
  interface Schedule {
    timeslots: Array<{ id: string; dayOfWeek: string; startTime: string; endTime: string }>;
    rooms: Array<{ id: string; name: string }>;
    lessons: Array<{ timeslot: string; room: string; teacher: string; studentGroup: string; subject: string; id: string }>;
  }

  interface Header {
    id: string;
    name: string;
  }

  // Eksportowane zmienne
  export let schedule: Schedule;
  export let activeTab: 'byRoom' | 'byTeacher' | 'byStudentGroup';

  // Zmienne do kontrolowania widoczności sekcji
  let showTimeslots = true;
  let showUnassignedLessons = true;

  // Aktualizacja widoku na podstawie harmonogramu i aktywnej zakładki
  $: view = getViewData(schedule, activeTab);

  // Funkcja do pobierania danych widoku
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

  // Funkcja do mapowania wartości activeTab na odpowiedni typ dla LessonColor
  function mapActiveTabToRole(activeTab: 'byRoom' | 'byTeacher' | 'byStudentGroup'): 'Room' | 'Teacher' | 'Student' {
    if (activeTab === 'byRoom') return 'Room';
    if (activeTab === 'byTeacher') return 'Teacher';
    return 'Student'; // dla 'byStudentGroup'
  }

  // Funkcja do formatowania czasu
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
                  <LessonColor {lesson} selectedRole={mapActiveTabToRole(activeTab)} />
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
<section class="mt-8">
  <button class="text-2xl font-semibold text-gray-800 mb-4 cursor-pointer flex items-center hover:text-blue-500" on:click={() => (showUnassignedLessons = !showUnassignedLessons)}>
    Unassigned Lessons
    <span class="ml-2">{showUnassignedLessons ? '▼' : '▶'}</span>
  </button>
  {#if showUnassignedLessons}
    <div class="overflow-x-auto">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {#each schedule.lessons.filter(lesson => lesson.timeslot == null || lesson.room == null) as lesson}
          <div class="bg-gray-50 rounded p-2">
            <LessonColor {lesson} selectedRole={mapActiveTabToRole(activeTab)}>
            </LessonColor>
          </div>
        {/each}
      </div>
    </div>
  {/if}
</section>
