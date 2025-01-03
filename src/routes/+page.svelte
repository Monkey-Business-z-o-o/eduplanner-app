<script>
  import { onMount } from 'svelte';
  import TimetableView from '../lib/components/TimetableView.svelte';
  import Footer from '../lib/components/Footer.svelte';
  import ScoreAnalysisModal from '../lib/components/ScoreAnalysisModal.svelte';
  import { scheduleSolver } from '../lib/stores/scheduleStore';
  import Sidebar from '../lib/components/Sidebar.svelte';

  let showAnalysisModal = false;
  let activeTab = 'byRoom';

  onMount(() => {
    scheduleSolver.initialize();
  });

  $: solving = $scheduleSolver.solving;
  $: schedule = $scheduleSolver.schedule;
</script>

<div class="min-h-screen flex">
  <Sidebar />

  <div class="flex-1 flex flex-col bg-gray-50">
    <main class="flex-1 container mx-auto px-4 py-8">
      <div class="mb-6 flex flex-wrap items-center gap-4">
        <button
          class="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50 transition-colors"
          on:click={() => scheduleSolver.solve()}
          disabled={solving}
          aria-label="Solve">
          <i class="fas fa-play mr-2"></i> Solve
        </button>

        <button
          class="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 disabled:opacity-50 transition-colors"
          on:click={() => scheduleSolver.stopSolving()}
          disabled={!solving}
          aria-label="Stop solving">
          <i class="fas fa-stop mr-2"></i> Stop solving
        </button>

        <div class="font-bold px-4 py-2 bg-white rounded shadow">
          Score: {schedule?.score ?? '?'}
        </div>

        <button
          class="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors"
          on:click={() => showAnalysisModal = true}
          aria-label="Analyze">
          <i class="fas fa-chart-bar mr-2"></i> Analyze
        </button>
      </div>

      <div class="mb-6">
        <nav class="flex gap-4">
          {#each ['byRoom', 'byTeacher', 'byStudentGroup'] as tab}
            <button
              class="px-4 py-2 rounded transition-colors {activeTab === tab ? 'bg-blue-600 text-white' : 'bg-gray-200 hover:bg-gray-300'}"
              on:click={() => activeTab = tab}>
              {tab.replace('by', 'By ')}
            </button>
          {/each}
        </nav>
      </div>

      {#if schedule}
        <div class="bg-white rounded-lg shadow-lg p-6 mb-8">
          <TimetableView
            {schedule}
            {activeTab}
          />
        </div>


      {/if}
    </main>

    <Footer />
  </div>
</div>

{#if showAnalysisModal}
  <ScoreAnalysisModal
    {schedule}
    onClose={() => showAnalysisModal = false}
  />
{/if}