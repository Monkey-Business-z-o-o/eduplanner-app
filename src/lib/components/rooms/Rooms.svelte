<script lang="ts">
  import { onMount } from 'svelte';
  import SectionHeader from '../common/SectionHeader.svelte';
  import AddRoom from './AddRoom.svelte';
  import type { Room } from '$lib/types/types';

  let rooms: Room[] = [];
  let isOpen = true;
  let editingRoomId: number | null = null;
  let editedRoomName: string = '';
  let error: string | null = null;

  onMount(() => {
    fetchRooms();
  });

  async function fetchRooms() {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/rooms?page=0&size=20`, {
        headers: { Accept: 'application/hal+json' },
      });
      if (!response.ok) throw new Error('Nie udało się pobrać pokoi');
      rooms = await response.json();
    } catch (err: unknown) {
      error = err instanceof Error ? err.message : 'Nieznany błąd';
    }
  }

  async function handleAddRoom(event: CustomEvent<Room>) {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/rooms`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/hal+json',
        },
        body: JSON.stringify(event.detail),
      });
      if (!response.ok) throw new Error('Nie udało się dodać pokoju');
      const addedRoom = await response.json();
      rooms = [...rooms, addedRoom];
    } catch (err: unknown) {
      error = err instanceof Error ? err.message : 'Nieznany błąd';
    }
  }

  async function handleDeleteRoom(id: number) {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/rooms/${id}`, {
        method: 'DELETE',
        headers: { Accept: 'application/hal+json' },
      });
      if (!response.ok) throw new Error('Nie udało się usunąć pokoju');
      rooms = rooms.filter((room) => room.id !== id);
    } catch (err: unknown) {
      error = err instanceof Error ? err.message : 'Nieznany błąd';
    }
  }

  async function handleUpdateRoom(room: Room) {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/rooms/${room.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/hal+json',
        },
        body: JSON.stringify({ name: room.name })
      });
      if (!response.ok) throw new Error('Nie udało się zaktualizować pokoju');
      rooms = rooms.map(r => r.id === room.id ? room : r);
      editingRoomId = null;
    } catch (err: unknown) {
      error = err instanceof Error ? err.message : 'Nieznany błąd';
    }
  }

  const startEditing = (room: Room) => {
    editingRoomId = room.id;
    editedRoomName = room.name;
  };

  const cancelEditing = () => {
    editingRoomId = null;
    editedRoomName = '';
  };
</script>

<section class="mt-8">
  <div class="bg-white rounded-lg shadow-lg overflow-hidden">
    {#if error}
      <p class="text-red-600 p-4">{error}</p>
    {/if}

    <SectionHeader
      title="Pokoje"
      bind:isOpen
      textColor="text-blue-600"
    />

    {#if isOpen}
      <div class="p-4">
        <!-- Add Room Form -->
        <div class="bg-gray-100 rounded p-4 mb-4">
          <AddRoom on:submit={handleAddRoom} />
        </div>

        <!-- Room List -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {#each rooms as room (room.id)}
            <div class="bg-gray-50 rounded p-2 flex justify-between items-center">
              {#if editingRoomId === room.id}
                <form
                  class="flex-1 flex gap-2"
                  on:submit|preventDefault={() => handleUpdateRoom({...room, name: editedRoomName})}
                >
                  <input
                    type="text"
                    bind:value={editedRoomName}
                    class="flex-1 px-2 py-1 border rounded"
                  />
                  <button
                    type="submit"
                    class="px-2 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                  >
                    Zapisz
                  </button>
                  <button
                    type="button"
                    class="px-2 py-1 bg-gray-600 text-white rounded hover:bg-gray-700"
                    on:click={cancelEditing}
                  >
                    Anuluj
                  </button>
                </form>
              {:else}
                <span>{room.name}</span>
                <div class="flex gap-2">
                  <button
                    class="text-blue-600 hover:text-blue-800"
                    on:click={() => startEditing(room)}
                  >
                    ✎
                  </button>
                  <button
                    class="text-red-600 hover:text-red-800"
                    on:click={() => handleDeleteRoom(room.id)}
                  >
                    &#x2716;
                  </button>
                </div>
              {/if}
            </div>
          {/each}
        </div>

        {#if rooms.length === 0}
          <p class="text-gray-600 mt-4">Brak dostępnych pokoi</p>
        {/if}
      </div>
    {/if}
  </div>
</section>