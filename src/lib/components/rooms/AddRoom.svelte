<script lang="ts">
  let newRoomName: string = '';
  let responseMessage: string | null = null;
  let error: string | null = null;
  let isMenuOpen: boolean = false;

  const addRoom = async () => {
    try {
      const response = await fetch('https://backend.kebson.fun/rooms', {
        method: 'POST',
        headers: {
          Accept: 'application/hal+json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: newRoomName }),
      });

      if (!response.ok) {
        throw new Error('Failed to add room');
      }

      responseMessage = 'Room added successfully';
      newRoomName = ''; // Reset the field after adding the room
    } catch (err: unknown) {
      if (err instanceof Error) {
        error = err.message;
      }
    }
  };
</script>

<div class="max-w-md mt-10 p-6 bg-white rounded-lg shadow-md">
  <button on:click={() => isMenuOpen = !isMenuOpen} class="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md shadow hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 text-left">
    Add New Room
  </button>

  {#if isMenuOpen}
    <form on:submit|preventDefault={addRoom} class="space-y-4 mt-4">
      <div>
        <label for="roomName" class="block text-sm font-medium text-gray-700">Room Name</label>
        <input
                type="text"
                id="roomName"
                bind:value={newRoomName}
                required
                class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      <button
              type="submit"
              class="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md shadow hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      >
        Add Room
      </button>
    </form>
  {/if}

  {#if responseMessage}
    <p class="mt-4 text-green-600">{responseMessage}</p>
  {/if}

  {#if error}
    <p class="mt-4 text-red-600">Error: {error}</p>
  {/if}
</div>
