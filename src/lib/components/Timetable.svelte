<script lang="ts">
  import { onMount } from 'svelte';

  // Typy danych
  interface Timeslot {
    dayOfWeek: string;
    startTime: string;
    endTime: string;
  }

  interface Lesson {
    subject: string;
    teacher: string;
    studentGroup: string;
    timeslot?: string; // ID slotu czasowego
    room?: string; // Nazwa sali
  }

  interface ScheduleData {
    name: string;
    timeslots: Timeslot[];
    rooms: { name: string }[];
    lessons: Lesson[];
  }

  // Stan komponentu
  let scheduleData: ScheduleData | null = null;
  let loading = true;
  let error: string | null = null;

  // Wybór roli
  const roles = ['Teacher', 'Student', 'Room'] as const;
  let selectedRole: typeof roles[number] = 'Teacher'; // Domyślnie widok nauczyciela

  // Pobranie danych z serwera
  const fetchScheduleData = async (): Promise<ScheduleData> => {
    try {
      const response = await fetch('http://localhost:8080/demo-data/SMALL');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      } else {
        let data: ScheduleData;
        data = await response.json();
        return data;
      }
    } catch (err) {
      console.error('Error fetching data:', err);
      throw err;
    }
  };

  // Godziny i dni tygodnia
  const hours = Array.from({ length: 15 }, (_, i) => `${7 + i}:00`);
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  // Kolory dla nauczycieli
  const teacherColors: Record<string, string> = {
    'A. Turing': 'bg-green-200 border-green-400',
    'M. Curie': 'bg-blue-200 border-blue-400',
    'C. Darwin': 'bg-purple-200 border-purple-400',
    'I. Jones': 'bg-red-200 border-red-400',
    'P. Cruz': 'bg-teal-200 border-teal-400',
  };

  // Kolory dla grup studenckich
  const studentColors: Record<string, string> = {
    '9th grade': 'bg-yellow-200 border-yellow-400',
    '10th grade': 'bg-orange-200 border-orange-400',
    '11th grade': 'bg-pink-200 border-pink-400',
  };

  // Kolory dla sal
  const roomColors: Record<string, string> = {
    'Room A': 'bg-gray-200 border-gray-400',
    'Room B': 'bg-indigo-200 border-indigo-400',
    'Room C': 'bg-lime-200 border-lime-400',
  };

  // Funkcje pomocnicze
  const getLessonColor = (lesson: Lesson) => {
    switch (selectedRole) {
      case 'Teacher':
        return teacherColors[lesson.teacher] || 'bg-gray-100 border-gray-300';
      case 'Student':
        return studentColors[lesson.studentGroup] || 'bg-gray-100 border-gray-300';
      case 'Room':
        return lesson.room ? roomColors[lesson.room] : 'bg-gray-100 border-gray-300';
      default:
        return 'bg-gray-100 border-gray-300';
    }
  };

  // Filtracja zajęć bez przypisanych slotów czasowych lub sal
  const getFilteredUnassignedLessons = () => {
    if (!scheduleData) return [];
    return scheduleData.lessons.filter((lesson) => !lesson.timeslot || !lesson.room);
  };

  // Widoczność sekcji
  let showTimeslots = true;
  let showUnassignedLessons = true;

  // Efekt pobrania danych
  onMount(async () => {
    try {
      scheduleData = await fetchScheduleData();
    } catch {
      error = 'Failed to load schedule data.';
    } finally {
      loading = false;
    }
  });
</script>

<!-- Widok harmonogramu -->
<div class="container mx-auto p-6 bg-gray-50 shadow-lg rounded-lg">
  <!-- Nagłówek -->
  <h1 class="text-3xl font-bold text-red-600 mb-6 text-center">
    Schedule: {scheduleData?.name || 'Loading...'}
  </h1>

  <!-- Wybór widoku -->
  <div class="flex justify-center gap-4 mb-6">
    {#each roles as role}
      <button
        class={`px-4 py-2 font-medium rounded transition ${selectedRole === role ? 'bg-red-600 text-white' : 'bg-gray-200 hover:bg-gray-300'}`}
        on:click={() => (selectedRole = role)}
      >
        View by {role}
      </button>
    {/each}
  </div>

  <!-- Komunikaty -->
  {#if loading}
    <p class="text-gray-500 text-lg font-medium text-center">Loading schedule data...</p>
  {:else if error}
    <p class="text-red-600 font-bold text-center">{error}</p>
  {:else if scheduleData}

    <!-- Harmonogram Timeslots -->
    <section>
      <!-- Przycisk rozwijania sekcji Timeslots -->
      <button class="text-2xl font-semibold text-gray-800 mb-4 cursor-pointer flex items-center hover:text-blue-500" on:click={() => (showTimeslots = !showTimeslots)}>
        Timeslots
        <span class="ml-2">{showTimeslots ? '▼' : '▶'}</span>
      </button>

      {#if showTimeslots}
        <div class="overflow-auto">
          <div class="grid grid-cols-8 gap-0 border border-gray-300 rounded-lg">
            <div class="p-2 bg-blue-600 text-white font-bold text-center">Time</div>
            {#each days as day}
              <div class="p-2 bg-blue-600 text-white font-bold text-center">{day}</div>
            {/each}
            {#each hours as hour}
              <div class="p-2 bg-gray-100 text-center font-medium border border-gray-300">{hour}</div>
              {#each days as day}
                <div
                  class={`p-2 h-20 border border-gray-300 text-gray-700 flex items-center justify-center ${scheduleData.lessons.some(
                    (lesson) =>
                      lesson.timeslot === hour && scheduleData.timeslots.some((slot) => slot.dayOfWeek === day && slot.startTime === hour)
                  )
                    ? 'bg-blue-50'
                    : ''}`}
                >
                  {#each scheduleData.lessons as lesson}
                    {#if lesson.timeslot === hour && scheduleData.timeslots.some((slot) => slot.dayOfWeek === day && slot.startTime === hour)}
                      <div class={`p-2 m-1 rounded-md shadow-sm ${getLessonColor(lesson)}`}>
                        <p class="font-bold">{lesson.subject}</p>
                        <p class="text-xs">{lesson.teacher}</p>
                        <p class="text-xs">{lesson.studentGroup}</p>
                      </div>
                    {/if}
                  {/each}
                </div>
              {/each}
            {/each}
          </div>
        </div>
      {/if}
    </section>

    <!-- Sekcja Unassigned Lessons -->
    <section class="mt-8">
      <!-- Przycisk rozwijania sekcji Unassigned Lessons-->
      <button class="text-2xl font-semibold text-gray-800 mb-4 cursor-pointer flex items-center hover:text-blue-500" on:click={() => (showUnassignedLessons = !showUnassignedLessons)}>
        Unassigned Lessons
        <span class="ml-2 text-gray-800 hover:text-blue-500">{showUnassignedLessons ? '▼' : '▶'}</span>
      </button>

      {#if showUnassignedLessons}
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {#each getFilteredUnassignedLessons() as lesson}
            <div class={`p-4 rounded-md shadow-sm ${getLessonColor(lesson)}`}>
              <p class="text-blue-700 font-bold">{lesson.subject}</p>
              <p class="text-gray-700 text-sm">
                Teacher: <span class="font-medium">{lesson.teacher}</span>
              </p>
              <p class="text-gray-700 text-sm">
                Group: <span class="font-medium">{lesson.studentGroup}</span>
              </p>
            </div>
          {/each}
        </div>
      {/if}
    </section>
  {:else}
    <p class="text-gray-500 text-center">No data available.</p>
  {/if}
</div>
