<script lang="ts">
  import { onMount } from 'svelte';

  interface Schedule {
    solverStatus: string | null;
    score: string | null;
    // Add other properties as needed
  }

  let solving = false;
  let analyzing = false;
  let score: string | null = null;
  let errorMessage: string | null = null;
  let successMessage: string | null = null;
  let scheduleId: string | null = null;
  let loadedSchedule: Schedule | null = null;
  let demoDataId: string | null = null;
  let autoRefreshIntervalId: number | null = null;

  onMount(() => {
    fetchDemoData();
  });

  function handleError(message: string, error: unknown) {
    console.error(message, error);
    if (error instanceof Response) {
      error.text().then(text => console.error('Response error text:', text));
    }
    errorMessage = message;
    successMessage = null;
  }

  function handleSuccess(message: string) {
    successMessage = message;
    errorMessage = null;
  }

  async function solve() {
    solving = true;
    errorMessage = null;
    successMessage = null;

    try {
      const response = await fetch("/timetables", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loadedSchedule),
      });

      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }

      scheduleId = await response.text();
      refreshSolvingButtons(true);
      handleSuccess("Plan został wygenerowany pomyślnie.");
    } catch (error) {
      handleError("Start solving failed.", error);
      refreshSolvingButtons(false);
    } finally {
      solving = false;
    }
  }

  async function analyze() {
    if (!scheduleId) {
      handleError("Najpierw wygeneruj plan.", null);
      return;
    }

    analyzing = true;
    errorMessage = null;
    successMessage = null;

    try {
      const response = await fetch(`/timetables/${scheduleId}/analyze`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          includeStatistics: true,
        }),
      });

      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }

      const analysis = await response.json();
      console.log("Analysis Result:", analysis);
      score = analysis.score || "N/A";
      handleSuccess("Analiza zakończona pomyślnie. Wynik: " + score);
    } catch (error) {
      handleError("Wystąpił problem z analizą.", error);
    } finally {
      analyzing = false;
    }
  }

  async function fetchDemoData() {
    try {
      const response = await fetch("/demo-data");
      const data = await response.json();
      demoDataId = data[0];
      refreshSchedule();
    } catch (error) {
      handleError("Failed to fetch demo data.", error);
    }
  }

  async function refreshSchedule() {
    let path = scheduleId ? `/timetables/${scheduleId}` : `/demo-data/${demoDataId}`;
    try {
      const response = await fetch(path);
      loadedSchedule = await response.json();
      renderSchedule(loadedSchedule);
    } catch (error) {
      handleError("Getting the timetable has failed.", error);
      refreshSolvingButtons(false);
    }
  }

  function renderSchedule(timetable: Schedule) {
    refreshSolvingButtons(timetable.solverStatus != null && timetable.solverStatus !== "NOT_SOLVING");
    score = timetable.score || "?";
    // Render the schedule as needed
  }

  function refreshSolvingButtons(solving: boolean) {
    if (solving) {
      autoRefreshIntervalId = setInterval(refreshSchedule, 2000);
    } else {
      if (autoRefreshIntervalId != null) {
        clearInterval(autoRefreshIntervalId);
        autoRefreshIntervalId = null;
      }
    }
  }
</script>

<style>
  .flex-center {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
  }

  .button {
    padding: 0.5rem 1rem;
    border-radius: 0.25rem;
    color: white;
    cursor: pointer;
    font-size: 1rem;
  }

  .button:disabled {
    background-color: gray;
    cursor: not-allowed;
  }

  .button-green {
    background-color: #4caf50;
  }

  .button-blue {
    background-color: #2196f3;
  }

  .message {
    font-size: 0.875rem;
  }

  .error-message {
    color: red;
  }

  .success-message {
    color: green;
  }
</style>

<div class="flex-center">
  {#if errorMessage}
    <p class="message error-message">{errorMessage}</p>
  {:else if successMessage}
  {/if}
    <p class="message success-message">{successMessage}</p>

  <button class="button button-green" on:click={solve} disabled={solving || analyzing}>
    {solving ? "Generowanie..." : "Generuj plan"}
  </button>

  <div>
    <strong>Wynik:</strong> {score || "?"}
  </div>

  <button class="button button-blue" on:click={analyze} disabled={!scheduleId || analyzing || solving}>
    {analyzing ? "Analizowanie..." : "Analizuj wyniki"}
  </button>
</div>