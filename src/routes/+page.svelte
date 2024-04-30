<script lang="ts">
    // @ts-nocheck
    // import minifier from "html-minifier-terser";
    import CodeMirror, { basicSetup } from "$lib/CodeMirror.svelte";
    import { EditorView, minimalSetup } from "codemirror";
    
    import {javascript} from "@codemirror/lang-javascript"
    import { onMount } from "svelte";
    let store;
    function changeHandler ({ detail: {tr}}) {
        if (detail !== undefined) if (tr !== undefined) console.log(tr?.changes?.toJSON());
    }
    let editorParent;
    let output;
    export let extensions = basicSetup
    // function findScriptlets() {}
    function minify() {
        let s = editorParent?.state?.doc?.toString();
        if (s !== undefined) {
            // todo: perform real minification?
            const mini = s.replaceAll(/\s*\n+/g, "");
            console.log(mini);

            // const mini = minifier.minify(s);
            output.textContent = `javascript:(${mini})`;
        }
    }
    const initialDoc = "function(){\n//...\n}()";
    onMount(() => {
        editorParent = new EditorView({
            doc: initialDoc,
            extensions: extensions,
            language: [javascript()],
            parent: editorParent,
            // dispatch: changeHandler
        })
    })
</script>

<div class="col">
    <h2 id="title">BookMarklet Editor</h2>
    <div class="input" bind:this={editorParent}/>
    <button class="button" type="button" on:click={minify}>
        Minify
    </button>
    <textarea bind:this={output} name="output" id="script-output"></textarea>
</div>

<style>
    :root {
        background: rgba(0, 0, 0, 0.95);
        color: white;
    }
    #title {
        font-family: consolas, sans-serif;
        align-self: center;
    }
    .col {
        display: flex;
        flex-flow: column nowrap;
    }
    .button {
        margin-bottom: 5px;
    }
    textarea, .output {
        opacity: 50%;
        border-radius: 1em;

    }
    .input {
        height: 500px;
    }
</style>