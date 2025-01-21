<script>
  import { scheduleSolver } from '$lib/stores/scheduleStore';

  export let solving;
  export let schedule;
  export let showAnalysisModal;
</script>

<div class="mb-6 flex flex-wrap items-center gap-4 p-4 bg-gray-100 rounded-lg shadow-md">
  <!-- Solve Button -->
  <button
          class="flex items-center px-6 py-2 bg-green-600 text-white font-semibold rounded-lg shadow hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
          on:click={() => scheduleSolver.solve()}
          disabled={solving}
          aria-label="Solve"
  >
    <i class="fas fa-play mr-2"></i> Solve
  </button>

  <!-- Stop Button -->
  <button
          class="flex items-center px-6 py-2 bg-red-600 text-white font-semibold rounded-lg shadow hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
          on:click={() => scheduleSolver.stopSolving()}
          disabled={!solving}
          aria-label="Stop solving"
  >
    <i class="fas fa-stop mr-2"></i> Stop
  </button>

  <!-- Score Display -->
  <div class="flex items-center justify-center px-6 py-2 bg-white text-gray-800 font-bold rounded-lg shadow-md">
    <span>Score:</span>
    <span class="ml-2 text-blue-600">{schedule?.score ?? '?'}</span>
  </div>

  <!-- Analyze Button -->
  <button
          class="flex items-center px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow hover:bg-blue-700 transition-all duration-300"
          on:click={() => (showAnalysisModal = true)}
          aria-label="Analyze"
  >
    <i class="fas fa-chart-bar mr-2"></i> Analyze
  </button>
</div>
