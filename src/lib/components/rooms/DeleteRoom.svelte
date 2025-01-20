<script lang="ts">
  import { onMount } from 'svelte';

  interface Room {
    id: number;
    name: string;
  }

  let rooms: Room[] = [];
  let error: string | null = null;
  let responseMessage: string | null = null;

  onMount(async () => {
    await fetchRooms();
  });

  async function fetchRooms() {
    try {
      const response = await fetch('https://backend.kebson.fun/rooms?page=0&size=20', {
        headers: {
          Accept: 'application/hal+json'
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch rooms');
      }

      const data: Room[] = await response.json();
      rooms = data;
    } catch (err: unknown) {
      if (err instanceof Error) {
        error = err.message;
      }
    }
  }

  async function deleteRoom(id: number) {
    try {
      const response = await fetch(`https://backend.kebson.fun/rooms/${id}`, {
        method: 'DELETE',
        headers: {
          Accept: 'application/hal+json'
        }
      });

      if (!response.ok) {
        throw new Error('Failed to delete room');
      }

      responseMessage = 'Room deleted successfully';
      await fetchRooms(); // Refresh the list of rooms
    } catch (err: unknown) {
      if (err instanceof Error) {
        error = err.message;
      }
    }
  }
</script>

<div class="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
  <h2 class="text-2xl font-bold mb-4">Delete Rooms</h2>
  {#if error}
    <p class="text-red-600">Error: {error}</p>
  {/if}

  {#if responseMessage}
    <p class="text-green-600">{responseMessage}</p>
  {/if}

  {#if rooms.length > 0}
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {#each rooms as room}
        <div class="p-4 bg-gray-100 rounded-md shadow-sm flex justify-between items-center">
          <span>{room.name}</span>
          <button on:click={() => deleteRoom(room.id)} class="text-red-600 hover:text-red-800">
            &#x2716; <!-- Unicode character for X -->
          </button>
        </div>
      {/each}
    </div>
  {:else}
    <p class="text-gray-600">No rooms available</p>
  {/if}
</div>