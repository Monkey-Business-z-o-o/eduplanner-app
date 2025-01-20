<script lang="ts">
  import { onMount } from 'svelte';
  import TimetableView from '$lib/components/TimetableDemo.svelte';
  import Footer from '$lib/components/layout/Footer.svelte';
  import ScoreAnalysisModal from '../lib/components/ScoreAnalysisModal.svelte';
  import { scheduleSolver } from '$lib/stores/scheduleStore';
  import Sidebar from '$lib/components/layout/Sidebar.svelte';
  import Navbar from '$lib/components/layout/Navbar.svelte';
  import UnassignedLessons from '$lib/components/lessons/UnassignedLessons.svelte';
  import Rooms from '$lib/components/rooms/Rooms.svelte';
  import type { Room, Schedule } from '$lib/types/types';

  export let data: { authtoken: string };
  let showAnalysisModal = false;
  let activeTab: 'byRoom' | 'byTeacher' | 'byStudentGroup' = 'byRoom';
  let rooms: Room[] = [];
  let error: string | null = null;

  onMount(() => {
    scheduleSolver.initialize(data.authtoken);
    fetchRooms();
  });

  $: solving = $scheduleSolver.solving;
  $: schedule = $scheduleSolver.schedule as Schedule | null;

  async function fetchRooms() {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/rooms?page=0&size=20`, {
        headers: { Accept: 'application/hal+json' },
      });
      if (!response.ok) throw new Error('Failed to fetch rooms');
      rooms = await response.json();
    } catch (err: unknown) {
      error = err instanceof Error ? err.message : 'Unknown error';
    }
  }

  async function addRoom(newRoom: Room) {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/rooms`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/hal+json',
        },
        body: JSON.stringify(newRoom),
      });
      if (!response.ok) throw new Error('Failed to add room');
      const addedRoom = await response.json();
      rooms = [...rooms, addedRoom];
    } catch (err: unknown) {
      error = err instanceof Error ? err.message : 'Unknown error';
    }
  }

  async function deleteRoom(id: number) {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/rooms/${id}`, {
        method: 'DELETE',
        headers: { Accept: 'application/hal+json' },
      });
      if (!response.ok) throw new Error('Failed to delete room');
      rooms = rooms.filter((room) => room.id !== id);
    } catch (err: unknown) {
      error = err instanceof Error ? err.message : 'Unknown error';
    }
  }

  async function updateRoom(updatedRoom: Room) {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/rooms/${updatedRoom.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/hal+json',
        },
        body: JSON.stringify({ name: updatedRoom.name })
      });
      if (!response.ok) throw new Error('Failed to update room');
      rooms = rooms.map(room => room.id === updatedRoom.id ? updatedRoom : room);
    } catch (err: unknown) {
      error = err instanceof Error ? err.message : 'Unknown error';
    }
  }
</script>

<div class="min-h-screen flex">
  <!-- Sidebar -->
  <Sidebar />

  <div class="flex-1 flex flex-col bg-gray-50">
    <!-- Navbar -->
    <Navbar />

    <!-- Main Content -->
    <main class="flex-1 container mx-auto px-4 py-8">
      <!-- Control Buttons -->
      <div class="mb-6 flex flex-wrap items-center gap-4">
        <button
                class="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50 transition-colors"
                on:click={() => scheduleSolver.solve()}
                disabled={solving}
                aria-label="Solve"
        >
          <i class="fas fa-play mr-2"></i> Solve
        </button>

        <button
                class="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 disabled:opacity-50 transition-colors"
                on:click={() => scheduleSolver.stopSolving()}
                disabled={!solving}
                aria-label="Stop solving"
        >
          <i class="fas fa-stop mr-2"></i> Stop solving
        </button>

        <div class="font-bold px-4 py-2 bg-white rounded shadow">
          Score: {schedule?.score ?? '?'}
        </div>

        <button
                class="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors"
                on:click={() => (showAnalysisModal = true)}
                aria-label="Analyze"
        >
          <i class="fas fa-chart-bar mr-2"></i> Analyze
        </button>
      </div>

      <!-- Navigation Tabs -->
      <div class="mb-6">
        <nav class="flex gap-4">
          {#each ['byRoom', 'byTeacher', 'byStudentGroup'] as tab}
            <button
                    class="px-4 py-2 rounded transition-colors {activeTab === tab ? 'bg-blue-600 text-white' : 'bg-gray-200 hover:bg-gray-300'}"
                    on:click={() => (activeTab = tab)}
            >
              {tab.replace('by', 'By ')}
            </button>
          {/each}
        </nav>
      </div>

      <!-- Timetable View -->
      {#if schedule}
        <div class="bg-blue-50 p-6 mb-8 rounded-lg shadow-lg">
          <TimetableView {schedule} {activeTab} />
        </div>
      {/if}

      <!-- Unassigned lessons Section -->
      {#if schedule}
        <div class="bg-yellow-50 p-6 mb-8 rounded-lg shadow-lg">
          <UnassignedLessons {schedule} />
        </div>
      {/if}

      <!-- rooms Section -->
      <div class="bg-green-50 p-6 mb-8 rounded-lg shadow-lg">
        <Rooms {rooms} onAddRoom={addRoom} onDeleteRoom={deleteRoom} onUpdateRoom={updateRoom} />
      </div>
    </main>

    <!-- Footer -->
    <Footer />
  </div>
</div>

<!-- Score Analysis Modal -->
{#if showAnalysisModal}
  <ScoreAnalysisModal analysis={schedule?.analysis} onClose={() => (showAnalysisModal = false)} />
{/if}