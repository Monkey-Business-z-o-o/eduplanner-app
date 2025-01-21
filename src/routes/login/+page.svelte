<script lang="ts">
    import { page } from '$app/stores';
    import { onMount } from 'svelte';
    import { enhance } from '$app/forms';

    export let form;
    let login = '';
    let showLogoutMessage = false;
    let showRegisteredMessage = false;

    onMount(() => {
        if ($page.url.searchParams.get('logout') === 'true') {
            showLogoutMessage = true;
        }
        if ($page.url.searchParams.get('registered') === 'true') {
            showRegisteredMessage = true;
        }

        const savedLogin = document.cookie
          .split('; ')
          .find(row => row.startsWith('savedLogin='));
        if (savedLogin) {
            login = decodeURIComponent(savedLogin.split('=')[1]);
        }
    });
</script>

<section class="bg-gradient-to-br from-red-500 to-white dark:from-red-800 dark:to-gray-900 min-h-screen">
    <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        {#if showLogoutMessage}
            <div class="mb-4 bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 rounded-lg shadow-md" role="alert">
                <span class="block sm:inline">Zostałeś pomyślnie wylogowany.</span>
            </div>
        {/if}

        {#if showRegisteredMessage}
            <div class="mb-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg shadow-md" role="alert">
                <strong class="font-bold">Sukces!</strong>
                <span class="block sm:inline">Rejestracja przebiegła pomyślnie. Możesz się teraz zalogować.</span>
            </div>
        {/if}

        {#if form?.message}
            <div class="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg shadow-md" role="alert">
                <span class="block sm:inline">{form.message}</span>
            </div>
        {/if}

        <a href="/" class="flex items-center space-x-3 bg-white hover:bg-red-200 transition-all duration-300 rounded-lg px-4 py-4 shadow-lg mb-6">
            <img src="/logo-pjatk.png" alt="EduPlaner Logo" class="w-20 h-20 rounded-full" />
            <span class="text-xl text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-fuchsia-400 to-indigo-400 font-bold">
                EduPlaner
            </span>
        </a>
        <div class="w-full bg-white rounded-lg shadow-md dark:border md:mt-8 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                    Zaloguj się do EduPlaner
                </h1>
                <form class="space-y-6 md:space-y-8" method="POST" action="?/login" use:enhance>
                    <div>
                        <label for="login" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Login</label>
                        <input
                          bind:value={login}
                          type="text"
                          name="login"
                          id="login"
                          class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg shadow focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder="Login"
                          required
                        >
                    </div>
                    <div>
                        <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Hasło</label>
                        <input
                          type="password"
                          name="password"
                          id="password"
                          placeholder="••••••••"
                          class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg shadow focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          required
                        >
                    </div>
                    <div class="flex items-center justify-between">
                        <div class="flex items-start">
                            <div class="flex items-center h-5">
                                <input
                                  id="remember"
                                  name="remember"
                                  type="checkbox"
                                  class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800"
                                >
                            </div>
                            <div class="ml-3 text-sm">
                                <label for="remember" class="text-gray-500 dark:text-gray-300">Zapamiętaj mnie</label>
                            </div>
                        </div>
                        <a href="/" class="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500">Powrót na stronę główną</a>
                    </div>
                    <button
                      type="submit"
                      class="w-full text-white bg-red-800 hover:bg-red-900 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-800 dark:hover:bg-red-900 dark:focus:ring-red-800 shadow-lg"
                    >
                        Zaloguj się
                    </button>
                    <p class="text-sm font-light text-gray-500 dark:text-gray-400">
                        Nie masz jeszcze konta?
                        <a href="/register" class="font-medium text-blue-600 hover:underline dark:text-blue-500">
                            Zarejestruj się
                        </a>
                    </p>
                </form>
            </div>
        </div>
    </div>
</section>

<style>
    @import '../../app.css';
</style>