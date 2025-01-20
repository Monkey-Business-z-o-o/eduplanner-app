<script lang="ts">
    export let title: string;
    export let isOpen = true;
    export let textColor = "text-gray-800";

    function toggle() {
        isOpen = !isOpen;
    }
</script>

<div class="p-4 bg-gray-50 border-b border-gray-200">
    <button
            type="button"
            class="flex items-center space-x-2 text-lg font-semibold {textColor} hover:opacity-80 transition duration-200"
            on:click={toggle}
            aria-expanded={isOpen}
    >
        <span>{title}</span>
        <svg
                class="w-5 h-5 transform transition-transform duration-200 {isOpen ? 'rotate-180' : ''}"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
        >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
        </svg>
    </button>
</div>