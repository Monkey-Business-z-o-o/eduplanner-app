<script lang="ts">
    export let title: string;
    export let isOpen = true;
    export let textColor = "text-gray-800";

    function toggle() {
        isOpen = !isOpen;
    }
</script>

<div class="p-4 bg-red-50 border-b border-red-200 rounded-t-md shadow-sm">
    <button
            type="button"
            class="flex items-center justify-between w-full text-lg font-semibold {textColor} hover:text-gray-600 hover:opacity-90 transition duration-200"
            on:click={toggle}
            aria-expanded={isOpen}
    >
        <span>{title}</span>
        <svg
                class="w-5 h-5 transform transition-transform duration-300 {isOpen ? 'rotate-180' : ''}"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
        >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
        </svg>
    </button>
</div>
