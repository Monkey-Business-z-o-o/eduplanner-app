<script lang="ts">
  import SectionHeader from '../common/SectionHeader.svelte';
  import AddRoom from './AddRoom.svelte';
  import type { Room } from '$lib/types/types';

  export let rooms: Room[] = [];
  export let onAddRoom: (room: Room) => void;
  export let onDeleteRoom: (id: number) => void;
  export let onUpdateRoom: (room: Room) => void;

  let isOpen = true;
  let editingRoomId: number | null = null;
  let editedRoomName: string = '';

  const startEditing = (room: Room) => {
    editingRoomId = room.id;
    editedRoomName = room.name;
  };

  const handleUpdate = (room: Room) => {
    if (editedRoomName.trim()) {
      onUpdateRoom({ ...room, name: editedRoomName.trim() });
      editingRoomId = null;
    }
  };

  const cancelEditing = () => {
    editingRoomId = null;
    editedRoomName = '';
  };
</script>

<section class="mt-8">
  <div class="bg-white rounded-lg shadow-lg overflow-hidden">
    <SectionHeader
            title="Rooms"
            bind:isOpen
            textColor="text-blue-600"
    />

    {#if isOpen}
      <div class="p-4">
        <!-- Add Room Form -->
        <div class="bg-gray-100 rounded p-4 mb-4">
          <h3 class="text-lg font-semibold mb-2">Add Room</h3>
          <AddRoom on:submit={(e) => onAddRoom(e.detail)} />
        </div>

        <!-- Room List -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {#each rooms as room (room.id)}
            <div class="bg-gray-50 rounded p-2 flex justify-between items-center">
              {#if editingRoomId === room.id}
                <form
                        class="flex-1 flex gap-2"
                        on:submit|preventDefault={() => handleUpdate(room)}
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
                    Save
                  </button>
                  <button
                          type="button"
                          class="px-2 py-1 bg-gray-600 text-white rounded hover:bg-gray-700"
                          on:click={cancelEditing}
                  >
                    Cancel
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
                          on:click={() => onDeleteRoom(room.id)}
                  >
                    &#x2716;
                  </button>
                </div>
              {/if}
            </div>
          {/each}
        </div>

        {#if rooms.length === 0}
          <p class="text-gray-600 mt-4">No rooms available</p>
        {/if}
      </div>
    {/if}
  </div>
</section>