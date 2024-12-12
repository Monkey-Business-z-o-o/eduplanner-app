<script lang="ts">
  type Schedule = {
    timeslots: { id: string, dayOfWeek: string, startTime: string, endTime: string }[],
    lessons: { name: string, timeslot: string, room: string, subject: string, teacher: string, studentGroup: string }[],
    rooms: { [key: string]: { name: string } }
  };

  export let schedule: Schedule = {
    timeslots: [
      { id: '1', dayOfWeek: 'Poniedziałek', startTime: '08:00', endTime: '09:30' },
      { id: '2', dayOfWeek: 'Wtorek', startTime: '10:00', endTime: '11:30' }
    ],
    lessons: [
      { name: 'Lekcja 1', timeslot: '1', room: '101', subject: 'Matematyka', teacher: 'Jan Kowalski', studentGroup: '1A' },
      { name: 'Lekcja 2', timeslot: '2', room: '102', subject: 'Fizyka', teacher: 'Anna Nowak', studentGroup: '1B' }
    ],
    rooms: {
      '101': { name: 'Sala 101' },
      '102': { name: 'Sala 102' }
    }
  };
</script>

<style>
  table {
    width: 100%;
    border-collapse: collapse;
  }
  th, td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: center;
  }
  th {
    background-color: #f4f4f4;
  }
</style>

<div class="timetable">
  <table>
    <thead>
      <tr>
        <th>Dzień</th>
        <th>Godzina</th>
        <th>Sala</th>
        <th>Przedmiot</th>
        <th>Nauczyciel</th>
        <th>Grupa</th>
      </tr>
    </thead>
    <tbody>
      {#each schedule.timeslots as timeslot}
        {#each schedule.lessons as lesson (lesson.name)}
          {#if lesson.timeslot === timeslot.id}
            <tr>
              <td>{timeslot.dayOfWeek}</td>
              <td>{timeslot.startTime} - {timeslot.endTime}</td>
              <td>{schedule.rooms[lesson.room]?.name}</td>
              <td>{lesson.subject}</td>
              <td>{lesson.teacher}</td>
              <td>{lesson.studentGroup}</td>
            </tr>
          {/if}
        {/each}
      {/each}
    </tbody>
  </table>
</div>