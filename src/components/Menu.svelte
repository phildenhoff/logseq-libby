<script lang="ts">
  import { onMount } from "svelte";
  import { writable, derived } from "svelte/store";

  import Highlight from "./Highlight.svelte";

  type Annotation = {
    highlight: string;
    annotation: string;
  };

  export let theme: "light" | "dark";
  export let annotations: Annotation[] = [];

  let files: FileList;

  $: if (files) {
    // Note that `files` is of type `FileList`, not an Array:
    // https://developer.mozilla.org/en-US/docs/Web/API/FileList

    for (const file of files) {
      console.log(`${file.name}: ${file.size} bytes`);
      file.text().then((text) => {
        const j = JSON.parse(text);
        console.log({ j });
      });
    }
  }
</script>

<div class="menu {theme}">
  <h2>Libby</h2>
  {#if !files}
    <label for="avatar">Choose a Libby export</label>
    <input
      accept="application/json"
      bind:files
      id="libbyexport"
      name="libbyexport"
      type="file"
    />
  {/if}

  {#if files}
    <h3>Selected files:</h3>
    {#each Array.from(files) as file}
      <p>{file.name} ({file.size} bytes)</p>
    {/each}

    <div class="actions">
      <button
        class="action action__reject"
        on:click={() => (files = undefined)}
      >
        Clear selection</button
      >
      <button class="action action__approve" on:click> Preview import</button>
    </div>
  {/if}

  {#if annotations && annotations.length > 0}
    <div class="annotations">
      {#each annotations as an}
        <Highlight highlight={an.highlight} annotation={an.annotation} />
      {/each}
    </div>
  {/if}
</div>

<style>
  .menu,
  .menu.dark {
    --libby-primary-text-color: #fff;
    --libby-primary-background-color: #2a2a2a;
    --libby-secondary-background-color: #090909;
    --libby-quarternary-background-color: #504f57;
    --libby-secondary-text-color: #a0a0a0;
    /* General colour palette */
    --libby-blue-base-color: #1888df;
    --libby-blue-light-color: #0db3e1;
    --libby-yellow-base-color: #fe0;
    --libby-yellow-dark-color: #dcc28f;
  }

  .menu.light {
    --libby-primary-text-color: #121212;
    --libby-primary-background-color: #fff;
    --libby-secondary-background-color: #f8f8f8;
    --libby-quarternary-background-color: #e8e8e8;
    --libby-secondary-text-color: #6f6f6f;
  }

  .menu {
    background-color: var(--libby-secondary-background-color);
    border-radius: 0.375rem;
    box-shadow: rgba(0, 0, 0, 0) 0px 0px 0px 0px,
      rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px,
      rgba(0, 0, 0, 0.1) 0px 4px 6px -4px;
    color: var(--libby-primary-text-color);
    margin: 0 auto;
    max-width: 480px;
    padding: 1em;
    text-align: left;
  }

  .actions {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

  .action {
    appearance: none;
    border: none;
    background: none;
    padding: 0;
    margin: 0;
    color: var(--libby-blue-base-color);
  }

  .action:hover {
    color: var(--libby-blue-light-color);
  }

  .annotations {
    display: flex;
    flex-direction: column;
    align-items: left;
  }
</style>
