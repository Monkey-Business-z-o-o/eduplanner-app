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
  import type { Room, Schedule } from '$lib/types/types';

  export let data: {
    authtoken: string;
    username: string | null;
  };

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
      <Buttons {solving} {schedule} bind:showAnalysisModal />

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
      <div class="bg-white p-6 mb-8 rounded-lg shadow-lg">
        <Rooms {rooms} onAddRoom={addRoom} onDeleteRoom={deleteRoom} onUpdateRoom={updateRoom} />
      </div>
    </main>

    <!-- Footer -->
    <Footer />
  </div>
</div>

<!-- Score Analysis Modal -->
{#if showAnalysisModal}
  <ScoreModal analysis={schedule?.analysis} onClose={() => (showAnalysisModal = false)} />
{/if}