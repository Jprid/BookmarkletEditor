<script lang="ts">
  // @ts-nocheck
  import CodeMirror from "$lib/CodeMirror.svelte";
  import { onMount } from "svelte";

  import "./+page.css";
  import { ScriptService } from "$lib/script";
  import { unminify } from "./page.ts";
  import EditorControls from "$lib/EditorControls.svelte";
  import TerminalControls from "$lib/TerminalControls.svelte";
  import BreadCrumbs from "$lib/BreadCrumbs.svelte";
  import { writable } from "svelte/store";
  import { fileName } from "$lib/stores";
  import {basicSetup} from "codemirror";
  // /** @type {import('./$types').PageData} */
  let scripts: any[] = [];
  $: store = null;
  let output;
  let scriptService = new ScriptService();
  export let extensions = basicSetup;
  const DEFAULT_LINE_HEIGHT = 49;

  let newLine = "\n".repeat(DEFAULT_LINE_HEIGHT);
  // FUNCTIONS
  let terminalControls = [{ fxn: clearTerminal, name: "Clear Terminal" }];
  function clearTerminal() {
    if (output !== undefined) {
      output.textContent = "";
    }
  }
  function loadScript(store: any, script: Script) {
    if (script === undefined) return;
    fileName.set(script.name);
    decodeURI(script);
    // console.log($store, script);
    store.set(unminify(script.url));
  }

  onMount(async () => {
    scripts = (await scriptService.getAll());
    console.log(scripts);
  });
</script>

<div class="main col">
  <h2 id="title">BookMarklet Editor</h2>
  <div class="scripts">
    {#if scripts.scripts !== undefined}
      <div class="sidebar-header">
        <h2 class="title-font scripts-title">Scripts:</h2>
      </div>
      <ul class="script-index">
        {#each scripts.scripts[0] as script, i}
          <li class="script-link pointer" id="script-{i}">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-file"
              viewBox="0 0 16 16"
            >
              <path
                d="M4 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm0 1h8a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1"
              />
            </svg>
            <a href="" on:click={() => loadScript(store, script)}
              >{script.name}</a
            >
          </li>
        {/each}
      </ul>
    {/if}
  </div>
  <div class="row output-terminal-gutter">
    <div class="col controls">
      <EditorControls docStore={store} {output} {scriptService} />
      <BreadCrumbs name={fileName} />
    </div>
  </div>
  <div class="input">
    <CodeMirror doc={newLine} extensions={basicSetup} bind:docStore={store} />
  </div>
  <div class="terminal row">
    <TerminalControls ctrls={terminalControls}></TerminalControls>
    <div class="terminal-col">
      <h3 class="title-font terminal-title">Output:</h3>
      <textarea bind:this={output} name="output" id="script-output"></textarea>
    </div>
  </div>
</div>
