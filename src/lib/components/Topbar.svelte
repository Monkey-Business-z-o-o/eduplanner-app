<script>
	import { Navbar, NavBrand, NavUl, NavLi, Dropdown, DropdownItem } from 'flowbite-svelte';
</script>

<Navbar class="bg-gray-700 text-white px-4 py-2 shadow-lg">
	<!-- Logo -->
	<NavBrand href="/" class="flex items-center">
		<img
			src="/logo-pjatk.png"
			alt="EduPlaner"
			class="h-6 mr-3"
		/>
		<span class="text-base font-medium">EduPlaner</span>
	</NavBrand>

	<!-- Navigation links -->
	<NavUl class="flex items-center space-x-6 text-sm">
		<NavLi
			href="/"
			class="text-white hover:text-blue-500 transition-colors duration-300">Demo UI
		</NavLi>
		<NavLi
			href="/"
			class="text-white hover:text-blue-500 transition-colors duration-300">Guide
		</NavLi>
		<NavLi
			href="/"
			class="text-white hover:text-blue-500 transition-colors duration-300">Rest API
		</NavLi>
		<!-- Dropdown for DATA -->
		<Dropdown placement="bottom" trigger="click" class="relative">
			<button class="text-white hover:text-blue-500 transition-colors duration-300">DATA</button>
			<DropdownItem>Small</DropdownItem>
			<DropdownItem>Large</DropdownItem>
		</Dropdown>
	</NavUl>

	<!-- User Account Dropdown -->
	<div class="ml-auto flex items-center">
		<Dropdown placement="bottom-right" trigger="click">
			<button class="flex items-center text-sm focus:outline-none text-white hover:text-blue-500 transition-colors duration-300">
				<i class="fa fa-user-circle text-lg"></i>
				<span class="ml-2">Panel użytkownika</span>
			</button>
			<DropdownItem>Zmień hasło</DropdownItem>
			<DropdownItem>Wyloguj</DropdownItem>
		</Dropdown>
	</div>
</Navbar>

<style>
    .dropdown-trigger {
        cursor: pointer;
    }
</style>
