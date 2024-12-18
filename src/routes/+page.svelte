<script>
  import Sidebar from '../lib/components/Sidebar.svelte';
  import Topbar from '../lib/components/Topbar.svelte';
  import Footer  from '$lib/components/Footer.svelte';
  import Timetable from '../lib/components/Timetable.svelte';
</script>

<Topbar />
<div class="*:hidden md:block lg:hidden xl:block"></div>

<main class="flex min-h-screen">

  <Sidebar />
  <div class="content flex-grow overflow-y-auto">
    <Timetable />
  </div>

</main>

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
</style>
