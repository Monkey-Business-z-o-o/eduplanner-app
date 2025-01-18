<script>
    async function logout() {
        // Make a request to the logout action
        await fetch('/logout', {
            method: 'GET',
        });

        // Optionally reload the page or navigate to a specific route
        location.reload(); // This reloads the navbar state
    }
</script>

<nav class="bg-red-700 border-gray-200 text-white">
    <div class="flex flex-wrap items-center justify-between max-w-screen-xl mx-auto p-4">
        <a href="/" class="flex items-center space-x-2 bg-white hover:bg-red-200 transition-all duration-300 rounded-lg px-4 py-4">
            <img src="/logo-pjatk.png" alt="EduPlaner Logo" class="w-20 h-20" />
            <span class="text-xl text-transparent bg-clip-text bg-[linear-gradient(to_right,theme(colors.indigo.400),theme(colors.indigo.100),theme(colors.sky.400),theme(colors.fuchsia.400),theme(colors.sky.400),theme(colors.indigo.100),theme(colors.indigo.400))] font-bold">
                EduPlaner
            </span>
        </a>

        <div class="flex items-center md:order-2 space-x-1 md:space-x-2 rtl:space-x-reverse">
            <a href="/login" class="flex items-center space-x-2 text-white hover:bg-white hover:text-black hover:scale-105 focus:ring-4 focus:ring-pink-300 font-medium rounded-lg text-sm md:text-lg md:px-6 md:py-3 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-pink-500 transition-all duration-300">
                <i class="fas fa-key"></i>
                <span>Log in</span>
            </a>
            <a href="/register" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm md:text-lg md:px-6 md:py-3 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Register</a>
            <button onclick={logout} class="flex items-center space-x-2 text-white hover:bg-white hover:text-black hover:scale-105 focus:ring-4 focus:ring-pink-300 font-medium rounded-lg text-sm md:text-lg md:px-6 md:py-3 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-pink-500 transition-all duration-300">
                <i class="fa-solid fa-right-from-bracket"></i>
                <span>Log out</span>
            </button>
            <button data-collapse-toggle="mega-menu-icons" type="button" class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="mega-menu-icons" aria-expanded="false">
                <span class="sr-only">Open main menu</span>
                <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15"/>
                </svg>
            </button>
        </div>
        <div id="mega-menu-icons" class="items-center justify-between hidden w-full md:flex md:w-auto md:order-1">
            <ul class="flex flex-col mt-4 font-medium md:flex-row md:mt-0 md:space-x-8 rtl:space-x-reverse">
                <li class="relative group">
                    <a href="/schedule" class="block py-2 px-3 text-white hover:bg-white hover:text-black hover:scale-105 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm md:text-lg md:px-6 md:py-3 md:border-0 dark:text-blue-500 md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-blue-500 md:dark:hover:bg-transparent dark:border-gray-700 transition-all duration-300">
                        <i class="fas fa-calendar-alt"></i>
                        <span>Schedule</span>
                    </a>
                </li>
                <li class="relative group">
                    <a href="/demo" class="block py-2 px-3 text-white hover:bg-white hover:text-black hover:scale-105 focus:ring-4 focus:ring-pink-300 font-medium rounded-lg text-sm md:text-lg md:px-6 md:py-3 md:border-0 dark:text-blue-500 md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-blue-500 md:dark:hover:bg-transparent dark:border-gray-700 transition-all duration-300">
                        <i class="fas fa-play"></i>
                        <span>Demo</span>
                    </a>
                </li>
            </ul>
        </div>
    </div>
</nav>