<script>
	const options = [
		{ name: "Harmonogram", icon: "📅", link: "/schedule" },
		{ name: "Ustawienia", icon: "⚙️", link: "/settings" },
		{ name: "Powiadomienia", icon: "❓", link: "/help" },
		{ name: "Wyloguj", icon: "🚪", link: "/logout" }
	];
</script>

<div class="sidebar">
	<h1>EduPlaner</h1>
	{#each options as option}
		<a href={option.link}>
			<span>{option.icon}</span>
			{option.name}
		</a>
	{/each}
</div>

<style>
    .sidebar {
        width: 250px;
        background-color: #b64242;
        color: white;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 20px 0;
        height: 100vh;
    }

    .sidebar h1 {
        font-size: 24px;
        margin-bottom: 20px;
    }

    .sidebar a {
        display: flex;
        align-items: center;
        width: 100%;
        padding: 10px 20px;
        text-decoration: none;
        color: white;
        font-size: 18px;
        transition: background-color 0.3s;
    }

    .sidebar a:hover {
        background-color: #9c3535;
    }

    .sidebar a span {
        margin-right: 10px;
    }
</style>