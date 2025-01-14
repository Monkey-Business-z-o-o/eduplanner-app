<script lang="ts">
    import { onMount } from 'svelte';

    interface Room {
        id: number;
        name: string;
    }

    let rooms: Room[] = [];
    let error: string | null = null;

    // Dynamiczne pobieranie URL z zmiennej środowiskowej
    const apiUrl = import.meta.env.VITE_API_URL;

    // Fetch rooms from the API
    onMount(async () => {
        try {
            const response = await fetch(`${apiUrl}/rooms?page=0&size=20`, {
                headers: {
                    'Accept': 'application/hal+json',
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
    });
</script>

<!-- Wyświetlanie listy pokoi -->
<div>
    <h2>Rooms</h2>
    {#if error}
        <p style="color: red;">Error: {error}</p>
    {/if}

    {#if rooms.length > 0}
        <ul>
            {#each rooms as room}
                <li>{room.name}</li>
            {/each}
        </ul>
    {:else}
        <p>No rooms available</p>
    {/if}
</div>
