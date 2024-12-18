<script>
	import { Footer, FooterCopyright, FooterLinkGroup, FooterBrand, FooterLink } from 'flowbite-svelte';
</script>

<Footer footerType="logo" class="bg-gray-800 text-white py-6">
	<div class="sm:flex sm:items-center sm:justify-between px-4 lg:px-8">
		<!-- Logo EduPlaner -->
		<FooterBrand
			href="/"
			src="/logo-pjatk.png"
			alt="EduPlaner Logo"
			name="EduPlaner"
			class="flex items-center space-x-2">
		</FooterBrand>

		<!-- Linki -->
		<FooterLinkGroup
			ulClass="flex flex-wrap items-center mb-6 text-sm text-gray-400 sm:mb-0 space-x-4">
			<FooterLink href="/" class="hover:text-gray-200 transition">O nas</FooterLink>
			<FooterLink href="/" class="hover:text-gray-200 transition">Polityka prywatności</FooterLink>
			<FooterLink href="/" class="hover:text-gray-200 transition">Licencje</FooterLink>
			<FooterLink href="/" class="hover:text-gray-200 transition">Kontakt</FooterLink>
		</FooterLinkGroup>
	</div>

	<hr class="my-6 border-gray-700 sm:mx-auto lg:my-8" />

	<!-- Prawa autorskie -->
	<FooterCopyright
		href="/"
		by="EduPlaner™"
		class="text-sm text-gray-400 text-center"
	/>
</Footer>
