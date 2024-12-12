<script>
	// Możesz wprowadzić dane o harmonogramie, które chcesz wyświetlić
	let schedule = [
		{ day: 'Poniedziałek', lesson: 'Matematyka', time: '08:00 - 09:00' },
		{ day: 'Wtorek', lesson: 'Fizyka', time: '09:00 - 10:00' },
		// Dodaj więcej zajęć...
	];
</script>

<style>
    .schedule {
        padding: 20px;
    }

    .schedule table {
        width: 100%;
        border-collapse: collapse;
    }

    .schedule th, .schedule td {
        padding: 8px;
        border: 1px solid #ddd;
        text-align: center;
    }

    .schedule th {
        background-color: #f4f4f4;
    }
</style>

<div class="schedule">
	<h2>Harmonogram</h2>
	<table>
		<thead>
		<tr>
			<th>Dzień</th>
			<th>Przedmiot</th>
			<th>Godzina</th>
		</tr>
		</thead>
		<tbody>
		{#each schedule as { day, lesson, time }}
			<tr>
				<td>{day}</td>
				<td>{lesson}</td>
				<td>{time}</td>
			</tr>
		{/each}
		</tbody>
	</table>
</div>
