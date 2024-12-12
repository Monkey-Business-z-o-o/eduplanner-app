<script lang="ts">
  import Sidebar from '../lib/components/Sidebar.svelte';
  import Topbar from '../lib/components/Topbar.svelte';
  import Timetable from '../lib/components/Timetable.svelte';

  // Typowanie Lesson i Schedule
  type Lesson = {
    name: string;
    timeslot: string;
    room: string | null;
    subject: string;
    teacher: string;
    studentGroup: string;
  };

  type Schedule = {
    timeslots: { id: string; dayOfWeek: string; startTime: string; endTime: string; }[];
    lessons: Lesson[];
    rooms: { [key: string]: { name: string } };
  };

  let selectedDataSet: unknown = null;
  let loadedSchedule: Schedule | null = null;

  // Pobieranie danych
  function fetchData() {
    fetch('/demo-data')
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        selectedDataSet = data[0];
        refreshSchedule();
      })
      .catch(error => {
        console.error('Failed to fetch data:', error);
        alert('Failed to fetch data');
      });
  }

  // Odświeżenie harmonogramu
  function refreshSchedule() {
    let path = `/demo-data/${selectedDataSet}`;
    fetch(path)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(schedule => {
        loadedSchedule = schedule;
      })
      .catch(error => {
        console.error('Failed to load schedule:', error);
        alert('Failed to load schedule');
      });
  }

  // Rozpoczęcie rozwiązania
  function solve() {
    if (loadedSchedule) {
      fetch('/timetables', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(loadedSchedule)
      })
        .then(response => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.text();
        })
        //.then(data => {
          // ScheduleId, możesz przypisać tutaj
        //})
        .catch(error => {
          console.error('Failed to start solving:', error);
          alert('Failed to start solving');
        });
    }
  }

  // Zatrzymanie rozwiązywania
  function stopSolving() {
  }

  // Inicjalizacja danych
  fetchData();
</script>

<main>
  <Sidebar />
  <div class="content">
    <Topbar on:solve={solve} on:stopSolving={stopSolving} />
    <Timetable {loadedSchedule} />
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
