<script lang="ts">
	export let loadedSchedule: {
		timeslots: { id: string, dayOfWeek: string, startTime: string, endTime: string }[],
		lessons: { name: string, timeslot: string, room: string | null, subject: string, teacher: string, studentGroup: string }[],
		rooms: { [key: string]: { name: string } }
	} | null = null;

	// Typowanie obiektu kolorów
	const colors: { [key: string]: string } = {
		'Matematyka': '#91c7ae',
		'Fizyka': '#e6b0aa',
		'Chemia': '#f7b1ab',
		'Biologia': '#aed6f1',
		'Historia': '#d2b4de',
		'Angielski': '#f5b7b1',
		'Hiszpański': '#a2d9ce'
	};

	// Funkcja do przypisania koloru na podstawie przedmiotu
	function pickColor(subject: string): string {
		return colors[subject] || '#ccc'; // domyślny kolor
	}
</script>

<div class="timetable">
	<h2>Harmonogram</h2>
	{#if loadedSchedule}
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
			{#each loadedSchedule.timeslots as timeslot}
				{#each loadedSchedule.lessons as lesson}
					{#if lesson.timeslot === timeslot.id && lesson.room !== null}
						<tr>
							<td>{timeslot.dayOfWeek}</td>
							<td>{timeslot.startTime} - {timeslot.endTime}</td>
							<td>{loadedSchedule.rooms[lesson.room].name}</td>
							<td style="background-color: {pickColor(lesson.subject)};">{lesson.subject}</td>
							<td>{lesson.teacher}</td>
							<td>{lesson.studentGroup}</td>
						</tr>
					{/if}
				{/each}
			{/each}
			</tbody>
		</table>
	{:else}
		<p>Loading...</p>
	{/if}
</div>

<style>
    .timetable {
        padding: 20px;
    }

    table {
        width: 100%;
        border-collapse: collapse;
    }

    th, td {
        padding: 8px;
        border: 1px solid #ddd;
        text-align: center;
    }

    th {
        background-color: #f4f4f4;
    }
</style>
