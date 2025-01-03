<script lang="ts">
  export let analysis: { constraints: Array<{ name: string; score: number; details: string }> };

  function toggleConstraint(index: number) {
    const constraintRow = document.getElementById(`constraint-${index}`);
    const icon = document.getElementById(`icon-${index}`);
    if (constraintRow && icon) {
      if (constraintRow.classList.contains('hidden')) {
        constraintRow.classList.remove('hidden');
        icon.classList.remove('fa-chevron-down');
        icon.classList.add('fa-chevron-up');
      } else {
        constraintRow.classList.add('hidden');
        icon.classList.remove('fa-chevron-up');
        icon.classList.add('fa-chevron-down');
      }
    }
  }
</script>

{#if analysis.constraints.length > 0}
 <table class="w-full border-collapse border border-gray-200">
  <thead class="bg-gray-100">
  <tr>
   <th class="border border-gray-300 p-3 text-left">Constraint</th>
   <th class="border border-gray-300 p-3 text-left">Score</th>
  </tr>
  </thead>
  <tbody>
  {#each analysis.constraints as constraint, index}
   <tr>
    <td class="border border-gray-200 p-3">
     <button
      class="text-blue-600 hover:text-blue-800"
      on:click={() => toggleConstraint(index)}>
      <i id={`icon-${index}`} class="fas fa-chevron-down"></i>
      {constraint.name}
     </button>
    </td>
    <td class="border border-gray-200 p-3">{constraint.score}</td>
   </tr>
   <tr id={`constraint-${index}`} class="hidden">
    <td colspan="2" class="border border-gray-200 p-3">
     {constraint.details}
    </td>
   </tr>
  {/each}
  </tbody>
 </table>
{:else}
 <p class="text-gray-600">No constraints available for analysis.</p>
{/if}