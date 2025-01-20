<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import type { Room } from '$lib/types/types';

  export let room: Room;
  let updatedRoom: Room = { ...room };
  let error: string | null = null;
  let responseMessage: string | null = null;

  const apiUrl = import.meta.env.VITE_API_URL;
  const dispatch = createEventDispatcher();

  // Funkcja do aktualizacji pokoju
  async function updateRoom() {
    try {
      const response = await fetch(`${apiUrl}/rooms/${room.id}`, {
        method: 'PUT',
        headers: {
          Accept: 'application/hal+json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedRoom),
      });

      if (!response.ok) {
        throw new Error('Failed to update room');
      }

      responseMessage = 'Room updated successfully';
      dispatch('update', updatedRoom);
    } catch (err: unknown) {
      if (err instanceof Error) {
        error = err.message;
      }
    }
  }

  // Funkcja do usunięcia pokoju
  async function deleteRoom(id: number) {
    try {
      const response = await fetch(`${apiUrl}/rooms/${id}`, {
        method: 'DELETE',
        headers: { Accept: 'application/hal+json' },
      });

      if (!response.ok) throw new Error('Failed to delete room');
      dispatch('delete', id);
    } catch (err: unknown) {
      if (err instanceof Error) {
        error = err.message;
      }
    }
  }
</script>

<section class="mt-8">
  <h2 class="text-lg font-bold mb-4">Manage Room</h2>

  {#if error}
    <p class="text-red-600">Error: {error}</p>
  {/if}

  {#if responseMessage}
    <p class="text-green-600">{responseMessage}</p>
  {/if}

  <div class="flex justify-between items-center mb-4">
    <!-- Ikona Ołówka (Update) -->
    <button
            class="px-2 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600 flex items-center gap-2"
            on:click={() => updateRoom()}
    >
      <i class="fas fa-pencil-alt"></i> Update
    </button>

    <!-- Ikona X (Delete) -->
    <button
            class="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 flex items-center gap-2"
            on:click={() => deleteRoom(room.id)}
    >
      <i class="fas fa-times"></i> Delete
    </button>
  </div>

  <form on:submit|preventDefault={updateRoom}>
    <div class="mb-2">
      <label for="name" class="block text-sm font-medium text-gray-700">Room Name</label>
      <input
              id="name"
              type="text"
              bind:value={updatedRoom.name}
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              required
      />
    </div>
    <button type="submit" class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
      Update Room
    </button>
  </form>
</section>
