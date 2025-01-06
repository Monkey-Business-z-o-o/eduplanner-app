<script lang="ts">
 let activeCategory: number | null = null;
 let isMenuOpen = false;

 function toggleMenu() {
  isMenuOpen = !isMenuOpen;
 }

 const menuItems = [
  {
   name: "Schedule",
   link: null,
   icon: "M18 2.993a.75.75 0 0 0-1.5 0v1.5h-9V2.994a.75.75 0 1 0-1.5 0v1.497h-.752a3 3 0 0 0-3 3v11.252a3 3 0 0 0 3 3h13.5a3 3 0 0 0 3-3V7.492a3 3 0 0 0-3-3H18V2.993ZM3.748 18.743v-7.5a1.5 1.5 0 0 1 1.5-1.5h13.5a1.5 1.5 0 0 1 1.5 1.5v7.5a1.5 1.5 0 0 1-1.5 1.5h-13.5a1.5 1.5 0 0 1-1.5-1.5Z",
   subcategories: [
    { name: "View by Teacher", link: "/schedule/teacher" },
    { name: "View by Student", link: "/schedule/student" },
    { name: "View by Room", link: "/schedule/room" }
   ]
  },
  {
   name: "Messages",
   link: "/messages",
   icon: "M4.848 2.771A49.144 49.144 0 0 1 12 2.25c2.43 0 4.817.178 7.152.52 1.978.292 3.348 2.024 3.348 3.97v6.02c0 1.946-1.37 3.678-3.348 3.97a48.901 48.901 0 0 1-3.476.383.39.39 0 0 0-.297.17l-2.755 4.133a.75.75 0 0 1-1.248 0l-2.755-4.133a.39.39 0 0 0-.297-.17 48.9 48.9 0 0 1-3.476-.384c-1.978-.29-3.348-2.024-3.348-3.97V6.741c0-1.946 1.37-3.68 3.348-3.97ZM6.75 8.25a.75.75 0 0 1 .75-.75h9a.75.75 0 0 1 0 1.5h-9a.75.75 0 0 1-.75-.75Zm.75 2.25a.75.75 0 0 0 0 1.5H12a.75.75 0 0 0 0-1.5H7.5Z",
   subcategories: []
  },
  {
   name: "To Do",
   link: null,
   icon: "M12 2.25A6.75 6.75 0 0 0 5.25 9v.75a8.217 8.217 0 0 1-2.119 5.52.75.75 0 0 0 .298 1.206c1.544.57 3.16.99 4.831 1.243a3.75 3.75 0 1 0 7.48 0 24.583 24.583 0 0 0 4.83-1.244.75.75 0 0 0 .298-1.205 8.217 8.217 0 0 1-2.118-5.52V9A6.75 6.75 0 0 0 12 2.25ZM9.75 18c0-.034 0-.067.002-.1a25.05 25.05 0 0 0 4.496 0l.002.1a2.25 2.25 0 1 1-4.5 0Z",
   subcategories: [
    { name: "Tasks", link: "/todo/tasks" },
    { name: "Projects", link: "/todo/projects" },
    { name: "Exams", link: "/todo/exams" }
   ]
  },
  {
   name: "Account",
   link: null,
   icon: "M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.3 0 0 1 7.5 0Z",
   subcategories: [
     { name: "Login", link: "/account/login" },
		 { name: "Change password", link: "/account/password" },
     { name: "Sign Up", link: "/account/signup" },
   ]
  }
 ];

 function toggleCategory(index: number) {
  activeCategory = activeCategory === index ? null : index;
 }

 const logout = async () => {
  try {
   await fetch(`/account/logout`, {
    method: 'POST'
   });

  } catch {
   alert("Failed to logout");
  }
 }
</script>

<div class="flex min-h-screen">
 <div class="flex flex-col items-center w-full lg:w-48 h-full space-y-6 overflow-hidden bg-red-700 text-white lg:items-start lg:space-y-4 lg:p-4 transition-all duration-300">
  <button class="lg:hidden" on:click={toggleMenu} aria-label="Toggle menu">
   <svg class="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7" />
   </svg>
  </button>

  <a href="/" class="flex flex-col items-center justify-center w-full h-34 bg-white hover:bg-red-200 transition-all duration-300 rounded-lg px-4 py-4">
   <img width="552" height="552" src="/logo-pjatk.png" alt="EduPlaner Logo" />
   <span class="mt-2 text-transparent bg-clip-text bg-[linear-gradient(to_right,theme(colors.indigo.400),theme(colors.indigo.100),theme(colors.sky.400),theme(colors.fuchsia.400),theme(colors.sky.400),theme(colors.indigo.100),theme(colors.indigo.400))] font-bold text-xl animate-gradient">
        EduPlaner
      </span>
  </a>

  <nav class={`w-full ${isMenuOpen ? 'block' : 'hidden'} lg:block`}>
   {#each menuItems as item, index}
    <div>
     <a href="{item.link}" class="flex flex-col items-center w-full py-4 px-6 rounded-md hover:bg-white hover:text-black lg:flex-row lg:justify-start lg:px-4 transition-all duration-300 hover:scale-110" on:click={() => toggleCategory(index)}>
      <svg class="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
       <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d={item.icon} />
      </svg>
      <span class="mt-1 text-sm lg:ml-3 lg:mt-0">{item.name}</span>
      {#if item.subcategories.length > 0}
       <svg class="w-4 h-4 ml-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d={activeCategory === index ? "M19 9l-7 7-7-7" : "M9 5l7 7-7 7"} />
       </svg>
      {/if}
     </a>
     {#if activeCategory === index && item.subcategories.length > 0}
      <div class="flex flex-col items-center w-full mt-2 lg:items-start">
       {#each item.subcategories as subcategory}
        <a href="{subcategory.link}" class="flex flex-col items-center w-full py-2 px-4 rounded-md hover:bg-white hover:text-black lg:flex-row lg:justify-start lg:px-4 transition-all duration-300 hover:scale-110">
         <span class="text-sm">{subcategory.name}</span>
        </a>
       {/each}
       <button class="flex flex-col items-center w-full py-2 px-4 rounded-md hover:bg-white hover:text-black lg:flex-row lg:justify-start lg:px-4 transition-all duration-300 hover:scale-110"
               on:click={() => {
                logout().then(() => window.location.href = "/account/login")
               }}>
        <span class="text-sm">Logout</span>
       </button>
      </div>
     {/if}
    </div>
   {/each}
  </nav>
 </div>
</div>