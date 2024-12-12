<script>
	export let menuItems = [
		{ name: 'Harmonogram', icon: "📅", link: '/' },
		{ name: 'O nas', icon: "🚪", link: '/about' },
		{ name: 'Kontakt', icon: "❓", link: '/contact' }
	];
</script>

<nav class="sidebar">
	<ul>
		{#each menuItems as item}
			<li>
				<a href={item.link}>
					<span class="icon">{item.icon}</span>
					<span class="name">{item.name}</span>
				</a>
			</li>
		{/each}
	</ul>
</nav>

<style>
    .sidebar {
        width: 200px;
        background-color: #f4f4f4;
        height: 100vh;
        padding: 20px;
        box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
    }

    .sidebar ul {
        list-style: none;
        padding: 0;
        margin: 0;
    }

    .sidebar li {
        margin: 10px 0;
    }

    .sidebar a {
        display: flex;
        align-items: center;
        text-decoration: none;
        color: #333;
        padding: 10px;
        border-radius: 4px;
        transition: background-color 0.3s, color 0.3s;
    }

    .sidebar a:hover {
        background-color: #ddd;
        color: #000;
    }

    .icon {
        font-size: 1.5rem;
        margin-right: 10px;
    }

    .name {
        font-size: 1rem;
        font-weight: 500;
    }
</style>
