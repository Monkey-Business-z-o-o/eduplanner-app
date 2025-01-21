<script lang="ts">
  import { onMount } from 'svelte';
  import { page } from '$app/stores';
  import Timetable from '$lib/components/timetable/Timetable.svelte';
  import Footer from '$lib/components/layout/Footer.svelte';
  import ScoreModal from '$lib/components/modals/ScoreModal.svelte';
  import { scheduleSolver } from '$lib/stores/scheduleStore';
  import Navbar from '$lib/components/layout/Navbar.svelte';
  import Buttons from '../lib/components/layout/Buttons.svelte';
  import UnassignedLessons from '$lib/components/lessons/UnassignedLessons.svelte';
  import Rooms from '$lib/components/rooms/Rooms.svelte';
  import type { Schedule } from '$lib/types/types';

  export let data: {
    authtoken: string;
    username: string | null;
  };

  let showAnalysisModal = false;
  let activeTab: 'byRoom' | 'byTeacher' | 'byStudentGroup' = 'byRoom';

  onMount(() => {
    scheduleSolver.initialize(data.authtoken);
  });

  $: solving = $scheduleSolver.solving;
  $: schedule = $scheduleSolver.schedule as Schedule | null;

  // Sprawdź, czy użytkownik właśnie się wylogował
  $: isLoggedOut = $page.url.searchParams.get('logout') === 'true';
</script>

<div class="min-h-screen flex">
  <div class="flex-1 flex flex-col bg-gray-50">
    <!-- Navbar -->
    <Navbar {data} {isLoggedOut} />

    <!-- Main Content -->
    <main class="flex-1 container mx-auto px-4 py-8">

      <!-- Control Buttons -->
      {#if data.username || data.authtoken}
      <Buttons {solving} {schedule} bind:showAnalysisModal />
      {/if}

      <!-- Timetable View -->
      {#if schedule}
        <div class="bg-white p-6 mb-8 rounded-lg shadow-lg">
          <Timetable {schedule} {activeTab} />
        </div>
      {/if}

      <!-- Unassigned lessons Section -->
      {#if schedule}
        <div class="bg-white p-6 mb-8 rounded-lg shadow-lg">
          <UnassignedLessons {schedule} />
        </div>
      {/if}

      <!-- Rooms Section -->
      {#if data.username || data.authtoken}
        <div class="bg-white p-6 mb-8 rounded-lg shadow-lg">
          <Rooms />
        </div>
      {/if}

    </main>

    <!-- Footer -->
    <Footer />
  </div>
</div>

<!-- Score Analysis Modal -->
{#if showAnalysisModal}
  <ScoreModal analysis={schedule?.analysis} onClose={() => (showAnalysisModal = false)} />
{/if}