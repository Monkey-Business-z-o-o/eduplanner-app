<script lang="ts">
  import Timeslots from '$lib/components/timetable/Timeslots.svelte';
  import type { Schedule } from '$lib/types/types';

  export let schedule: Schedule;
  export let activeTab: 'byRoom' | 'byTeacher' | 'byStudentGroup';
</script>

<!-- Use the Timeslots component -->
<Timeslots {schedule} {activeTab} />