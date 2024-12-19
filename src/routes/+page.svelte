<script>
  import Sidebar from '$lib/components/Sidebar.svelte';
  import Footer from '$lib/components/Footer.svelte';
  import Timetable from '$lib/components/Timetable.svelte';
  import GenerateSchedule from "$lib/components/GenerateSchedule.svelte";
</script>

<main class="flex min-h-screen">

  <!-- Sidebar po lewej stronie -->
  <Sidebar />

  <!-- Główna zawartość strony -->
  <div class="content flex-grow overflow-y-auto p-4">
    <!-- Komponent GenerateSchedule nad Timetable -->
    <GenerateSchedule />

    <div class="mt-8">
      <Timetable />
    </div>
  </div>

</main>

<!-- Footer -->
<Footer />

<div class="*:hidden md:block lg:hidden xl:block"></div>

<style>
  main {
    display: flex;
    min-height: 100vh; /* main ma wysokość równą wysokości okna */
  }

  .content {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    overflow-y: auto; /* umożliwia przewijanie zawartości */
  }

  .mt-8 {
    margin-top: 2rem; /* odstęp między przyciskiem GenerateSchedule a Timetable */
  }
</style>
