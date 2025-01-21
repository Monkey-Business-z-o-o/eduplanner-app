<script lang="ts">
    import { enhance } from '$app/forms';

    export let form;
</script>

<section class="bg-gradient-to-br from-green-400 via-teal-300 to-white dark:from-green-700 dark:via-teal-600 dark:to-gray-900">
    <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        {#if form?.message}
            <div class="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                <span class="block sm:inline">{form.message}</span>
            </div>
        {/if}

        <a href="/" class="flex items-center space-x-2 bg-white hover:bg-green-200 transition-all duration-300 rounded-lg px-4 py-4 mb-8">
            <img src="/logo-pjatk.png" alt="EduPlaner Logo" class="w-20 h-20" />
            <span class="text-xl text-transparent bg-clip-text bg-[linear-gradient(to_right,theme(colors.indigo.400),theme(colors.indigo.100),theme(colors.sky.400),theme(colors.fuchsia.400),theme(colors.sky.400),theme(colors.indigo.100),theme(colors.indigo.400))] font-bold">
                EduPlaner
            </span>
        </a>
        <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                    Zarejestruj się w EduPlaner
                </h1>
                <form class="space-y-4 md:space-y-6" method="POST" action="?/login" use:enhance>
                    <div>
                        <label for="firstName" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Imię</label>
                        <input
                          type="text"
                          name="firstName"
                          id="firstName"
                          value={form?.firstName ?? ''}
                          class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-green-600 focus:border-green-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
                          placeholder="Wpisz swoje imię"
                          required
                        />
                    </div>
                    <div>
                        <label for="lastName" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nazwisko</label>
                        <input
                          type="text"
                          name="lastName"
                          id="lastName"
                          value={form?.lastName ?? ''}
                          class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-green-600 focus:border-green-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
                          placeholder="Wpisz swoje nazwisko"
                          required
                        />
                    </div>
                    <div>
                        <label for="login" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Login</label>
                        <input
                          type="text"
                          name="login"
                          id="login"
                          value={form?.login ?? ''}
                          class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-green-600 focus:border-green-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
                          placeholder="Wpisz swój login"
                          required
                        />
                    </div>
                    <div>
                        <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Hasło</label>
                        <input
                          type="password"
                          name="password"
                          id="password"
                          value={form?.password ?? ''}
                          class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-green-600 focus:border-green-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
                          placeholder="Wpisz swoje hasło"
                          required
                        />
                    </div>
                    <div class="flex items-center justify-between">
                        <div class="flex items-start">
                            <div class="flex items-center h-5">
                                <input
                                  id="remember"
                                  aria-describedby="remember"
                                  type="checkbox"
                                  class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-green-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-green-600 dark:ring-offset-gray-800"
                                />
                            </div>
                            <div class="ml-3 text-sm">
                                <label for="remember" class="text-gray-500 dark:text-gray-300">Zapamiętaj mnie</label>
                            </div>
                        </div>
                        <a href="/" class="text-sm font-medium text-green-600 hover:underline dark:text-green-500">Powrót na stronę główną</a>
                    </div>
                    <button
                      type="submit"
                      class="w-full text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                    >
                        Zarejestruj się
                    </button>
                    <p class="text-sm font-light text-gray-500 dark:text-gray-400">
                        Masz już konto? <a href="/login" class="font-medium text-green-600 hover:underline dark:text-green-500">Zaloguj się</a>
                    </p>
                </form>
            </div>
        </div>
    </div>
</section>
