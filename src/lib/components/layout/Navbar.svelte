<script>
	export let data;
	export let isLoggedOut;

	async function logout() {
		// Wylogowanie użytkownika
		await fetch('/logout', {
			method: 'GET',
		});
		location.reload(); // Odświeżenie stanu aplikacji
	}
</script>

<div class="bg-gradient-to-r from-black to-red-800 text-white py-8 px-6 shadow-lg">
	<div class="container mx-auto flex flex-col sm:flex-row items-center justify-between lg:space-x-8">
		<!-- Logo -->
		<a href="/" class="flex items-center space-x-2 bg-white hover:bg-red-200 transition-all duration-300 rounded-lg px-4 py-4">
			<img src="/logo-pjatk.png" alt="EduPlaner Logo" class="w-12 h-12 sm:w-16 sm:h-16" />
			<span class="text-lg sm:text-xl text-transparent bg-clip-text bg-[linear-gradient(to_right,theme(colors.indigo.400),theme(colors.indigo.100),theme(colors.sky.400),theme(colors.fuchsia.400),theme(colors.sky.400),theme(colors.indigo.100),theme(colors.indigo.400))] font-bold">
				EduPlaner
			</span>
		</a>

		<!-- Informacja o użytkowniku -->
		<div class="mt-4 sm:mt-0 flex-1 sm:flex sm:justify-between sm:items-center">
			{#if data.username}
				<div class="flex items-center space-x-4">
					<div class="bg-white p-3 rounded-full">
						<svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
						</svg>
					</div>
					<div>
						<h1 class="text-lg sm:text-3xl font-bold">Witaj, {data.username}!</h1>
						<p class="text-sm sm:text-base text-blue-100 mt-1">Miło Cię znowu widzieć w systemie EduPlaner</p>
					</div>
				</div>
			{:else if isLoggedOut}
				<div>
					<h1 class="text-lg sm:text-2xl font-bold text-white">Wylogowano pomyślnie</h1>
					<p class="text-sm sm:text-base text-gray-600 mt-1">Zaloguj się, aby generować grafik</p>
				</div>
			{:else}
				<div>
					<h1 class="text-lg sm:text-2xl font-bold text-white">Witaj w EduPlaner</h1>
					<p class="text-sm sm:text-base text-gray-200 mt-1">Zaloguj się, aby generować grafik</p>
				</div>
			{/if}

			<!-- Przyciski logowania -->
			<div class="flex items-center space-x-2 mt-4 sm:mt-0">
				{#if data.username}
					<button
							onclick={logout}
							class="flex items-center space-x-2 text-white bg-red-700 hover:bg-white hover:text-black hover:scale-105 focus:ring-4 focus:ring-red-300 font-medium rounded-lg px-4 py-2 transition-all duration-300"
					>
						<i class="fa-solid fa-right-from-bracket"></i>
						<span>Wyloguj</span>
					</button>
				{:else}
					<a href="/login" class="flex items-center space-x-2 text-white bg-blue-600 hover:bg-blue-700 hover:scale-105 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg px-4 py-2 transition-all duration-300">
						<i class="fa-solid fa-right-to-bracket"></i>
						<span>Zaloguj</span>
					</a>
					<a href="/register" class="flex items-center space-x-2 text-white bg-green-600 hover:bg-green-700 hover:scale-105 focus:ring-4 focus:ring-green-300 font-medium rounded-lg px-4 py-2 transition-all duration-300">
						<i class="fa-solid fa-user-plus"></i>
						<span>Rejestracja</span>
					</a>
				{/if}
			</div>
		</div>
	</div>
</div>
