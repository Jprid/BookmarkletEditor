<script lang="ts">
  // @ts-no-check
  import { fileName} from "$lib/stores";
  const DEFAULT_FILE_NAME = "Untitled *";
  
  export let output;
  export let scriptService;
  export let docStore;
  let buttons = [
    { fxn: save, name: "Save" },
    { fxn: minify, name: "Minify" },
    { fxn: null, name: "Test" },
    { fxn: clearEditor, name: "Clear Editor" },
    { fxn: newFile, name: "Create" },
  ];

  function newFile() {
    docStore.set("");
    fileName.set(DEFAULT_FILE_NAME);
  }
  function save() {

    if ($fileName === DEFAULT_FILE_NAME) {
      fileName.set(prompt("what do you want to name the script?"));
      return scriptService.createAsync($fileName, $docStore).then(res => res.json()).catch((e) => console.error(e));
    } else {
      return scriptService.updateAsync($fileName, $docStore).then(res => res.json());
    }
  }
  function clearEditor() {
    if (docStore !== undefined) {
      docStore.set("");
    }
    fileName.set("Untitled *");
  }
  export function minify() {
    let s: string = docStore;
    console.log("minify: " + s);
    if (s !== undefined) {
      output.textContent = `javascript:(${s.replaceAll(/\s*\n+/g, "")})`;
    }
  }
</script>

<div class="button-row row">
  {#each buttons as btn, i}
    <button
      id="button-{i}"
      class="button pointer"
      type="button"
      title={btn.name}
      on:click={btn.fxn}
    >
      {#if i == 0}
        <svg
          alt={btn.name}
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          class="bi bi-floppy"
          viewBox="0 0 16 16"
        >
          <path d="M11 2H9v3h2z" />
          <path
            d="M1.5 0h11.586a1.5 1.5 0 0 1 1.06.44l1.415 1.414A1.5 1.5 0 0 1 16 2.914V14.5a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 0 14.5v-13A1.5 1.5 0 0 1 1.5 0M1 1.5v13a.5.5 0 0 0 .5.5H2v-4.5A1.5 1.5 0 0 1 3.5 9h9a1.5 1.5 0 0 1 1.5 1.5V15h.5a.5.5 0 0 0 .5-.5V2.914a.5.5 0 0 0-.146-.353l-1.415-1.415A.5.5 0 0 0 13.086 1H13v4.5A1.5 1.5 0 0 1 11.5 7h-7A1.5 1.5 0 0 1 3 5.5V1H1.5a.5.5 0 0 0-.5.5m3 4a.5.5 0 0 0 .5.5h7a.5.5 0 0 0 .5-.5V1H4zM3 15h10v-4.5a.5.5 0 0 0-.5-.5h-9a.5.5 0 0 0-.5.5z"
          />
        </svg>
      {/if}
      {#if i == 1}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          class="bi bi-zoom-out"
          viewBox="0 0 16 16"
        >
          <path
            fill-rule="evenodd"
            d="M6.5 12a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11M13 6.5a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0"
          />
          <path
            d="M10.344 11.742q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1 6.5 6.5 0 0 1-1.398 1.4z"
          />
          <path
            fill-rule="evenodd"
            d="M3 6.5a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5"
          />
        </svg>
      {/if}
      {#if i == 2}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          class="bi bi-play-fill"
          viewBox="0 0 16 16"
        >
          <path
            d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393"
          />
        </svg>
      {/if}
      {#if i == 3}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          class="bi bi-x-square"
          viewBox="0 0 16 16"
        >
          <path
            d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z"
          />
          <path
            d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"
          />
        </svg>
      {/if}
      {#if i == 4}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          class="bi bi-file-earmark-plus"
          viewBox="0 0 16 16"
        >
          <path
            d="M8 6.5a.5.5 0 0 1 .5.5v1.5H10a.5.5 0 0 1 0 1H8.5V11a.5.5 0 0 1-1 0V9.5H6a.5.5 0 0 1 0-1h1.5V7a.5.5 0 0 1 .5-.5"
          />
          <path
            d="M14 4.5V14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h5.5zm-3 0A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V4.5z"
          />
        </svg>
      {/if}
    </button>
  {/each}
</div>

<style>
  .button {
    height: 2em;
  }
  .button-row {
    width: 100%;
    justify-content: space-evenly;
  }
  .button-row button {
    background: transparent;
    color: white;
    border: none;
  }
  .button-row button:hover {
    filter: brightness(150%);
    background: rgba(58, 56, 56, 0.5);
  }
</style>
