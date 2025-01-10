<script lang="ts">
    let newRoomName: string = '';
    let responseMessage: string | null = null;
    let error: string | null = null;

    // Funkcja do wysyłania zapytania POST do backendu
    const addRoom = async () => {
        try {
            const response = await fetch('http://localhost:8081/rooms', {
                method: 'POST',
                headers: {
                    'Accept': 'application/hal+json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name: newRoomName }),
            });

            if (!response.ok) {
                throw new Error('Failed to add room');
            }

            responseMessage = 'Room added successfully';
            newRoomName = ''; // Resetowanie pola po dodaniu pokoju
        } catch (err: unknown) {
            if (err instanceof Error) {
                error = err.message;
            }
        }
    };
</script>

<!-- Formularz do dodawania pokoju -->
<div>
    <h2>Add New Room</h2>
    <form on:submit|preventDefault={addRoom}>
        <label for="roomName">Room Name</label>
        <input type="text" id="roomName" bind:value={newRoomName} required />

        <button type="submit">Add Room</button>
    </form>

    {#if responseMessage}
        <p>{responseMessage}</p>
    {/if}

    {#if error}
        <p style="color: red;">Error: {error}</p>
    {/if}
</div>