<script>
  import { onMount } from 'svelte';

  let scheduleData = null; // Zmienna przechowująca dane
  let loading = true; // Flaga dla stanu ładowania
  let error = null; // Zmienna do przechowywania błędów

  // Funkcja do pobrania danych z API
  const fetchScheduleData = async () => {
    try {
      const response = await fetch('http://localhost:8080/demo-data/SMALL');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log(data);
      return data;
    } catch (err) {
      console.error('Error fetching data:', err);
      throw err;
    }
  };

  // Pobieranie danych po załadowaniu komponentu
  onMount(async () => {
    try {
      scheduleData = await fetchScheduleData();
    } catch (err) {
      error = 'Failed to load schedule data.';
    } finally {
      loading = false;
    }
  });
</script>

<style>
  /* Dodaj dowolne style, aby ulepszyć wygląd */
  .loading {
    font-size: 1.2em;
    color: gray;
  }

  .error {
    color: red;
    font-weight: bold;
  }

  .schedule {
    margin-top: 20px;
  }

  .timeslot {
    margin-bottom: 10px;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 5px;
  }
</style>

{#if loading}
  <p class="loading">Loading schedule data...</p>
{:else if error}
  <p class="error">{error}</p>
{:else if scheduleData}
  <div class="schedule">
    <h1>Schedule: {scheduleData.name}</h1>

    <h2>Timeslots</h2>
    {#each scheduleData.timeslots as timeslot}
      <div class="timeslot">
        <strong>{timeslot.dayOfWeek}</strong>: {timeslot.startTime} - {timeslot.endTime}
      </div>
    {/each}

    <h2>Rooms</h2>
    <ul>
      {#each scheduleData.rooms as room}
        <li>{room.name}</li>
      {/each}
    </ul>

    <h2>Lessons</h2>
    <ul>
      {#each scheduleData.lessons as lesson}
        <li>
          <strong>{lesson.subject}</strong> with {lesson.teacher} (Group: {lesson.studentGroup})
        </li>
      {/each}
    </ul>
  </div>
{:else}
  <p>No data available.</p>
{/if}
