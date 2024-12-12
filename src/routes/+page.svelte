<script>
  import Sidebar from '../lib/components/Sidebar.svelte';
  import Topbar from '../lib/components/Topbar.svelte';
  import Timetable from '../lib/components/Timetable.svelte';
</script>

<main>
  <Sidebar />
  <div class="content">
    <Topbar />
    <Timetable />
  </div>
</main>

<style>
  main {
    display: flex;
    height: 100vh;
  }
  .content {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
  }
</style>