<script>
  export let ctrls = [];
</script>

<div class="terminal-controls col">
  {#each ctrls as ctrl, i}
    <button
      id="button-{i}"
      class="button"
      type="button"
      title={ctrl.name}
      on:click={ctrl.fxn}
    >
      {ctrl.name}
    </button>
  {/each}
</div>

<style>
  .col {
    display: flex;
    flex-flow: column nowrap;
  }
  .terminal-controls {
    padding: 0.25vh 1vw;
    background-color: var(--dodger-blue);
    width: 15vw;
    height: 30vh;
    justify-content: center;
    align-items: center;
    box-shadow: var(--drop-shadow);
  }
  .terminal-controls button {
    width: 90%;
    background: none;
    border: 0.15dvh solid #ccc;
    border-radius: 30px;
    color: white;
  }
</style>
