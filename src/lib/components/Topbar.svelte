<script>
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	function handleSolve() {
		dispatch('solve');
	}

	function handleStopSolving() {
		dispatch('stopSolving');
	}
</script>

<div class="topbar">
	<button on:click={handleSolve}>Rozwiąż</button>
	<button on:click={handleStopSolving}>Zatrzymaj rozwiązywanie</button>
	<button>Zarządzaj</button>
	<button>Opcje</button>
</div>

<style>
    .topbar {
        display: flex;
        justify-content: space-between;
        align-items: center;
        background-color: #b64242;
        color: white;
        padding: 10px 20px;
    }

    .topbar button {
        background-color: #9c3535;
        border: none;
        color: white;
        padding: 10px 15px;
        font-size: 16px;
        cursor: pointer;
        border-radius: 5px;
        transition: background-color 0.3s;
    }

    .topbar button:hover {
        background-color: #822f2f;
    }
</style>