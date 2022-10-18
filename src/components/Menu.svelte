<script lang="ts">
  import { onMount } from "svelte";
  import { writable, derived } from "svelte/store";

  import { annotationsFromExport, detailsFromExport } from "../services/libby";

  import type {Annotation} from "../types";
  import {importAnnotations} from "../utils/importAnnotations";

  import logo from "../assets/logo.svg";
  import Highlight from "./Highlight.svelte";
  import Actions from "./Actions.svelte";

  type AnnotationWithDetails = {
    details: {
      title: string,
      author: string
    },
    annotations: Annotation[]
  };

  export let theme: "light" | "dark";

  // Note that `files` is of type `FileList`, not an Array:
  // https://developer.mozilla.org/en-US/docs/Web/API/FileList
  let files: FileList;

  $: fileAnnotations = [] as AnnotationWithDetails[];
  $: localAnnotations = [] as Annotation[];
  $: {
    if (files) {
      const x = Array.from(files).map((file) => {
        return file.text().then((text) => {
          const fileJson = JSON.parse(text);
          return {
            details: detailsFromExport(fileJson),
            annotations: annotationsFromExport(fileJson),
          } 
        });
      });
      Promise.all(x).then((resolved) => (localAnnotations = resolved.map(item => item.annotations).flat()));
      Promise.all(x).then((resolved) => (fileAnnotations = resolved));
    }
  }

  const onImport = () => {
    fileAnnotations.forEach((item) => {
      const formattedPageTitle = `Libby notes from ${item.details.title} by ${item.details.author}`;
      importAnnotations(formattedPageTitle, item.annotations);
      logseq.hideMainUI();
      logseq.UI.showMsg(`Imported Libby notes for ${item.details.title}`, 'success', { timeout: 3000 });
      fileAnnotations = [];
      localAnnotations = [];
      files = undefined;
    });
  };
</script>

<div class="menu {theme}" on:click|stopPropagation={() => undefined}>
  <header>
    <img src={logo} alt="Libby logo" />
    <h2>Libby</h2>
  </header>
  {#if !files}
    <label for="avatar">Choose a reading journal export</label>
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
  {/if}

  {#if localAnnotations && localAnnotations.length > 0}
    <h3>{localAnnotations.length} annotations to import</h3>
    <div class="annotations">
      {#each localAnnotations as an}
        <Highlight
          {theme}
          highlight={an.highlight}
          annotation={an.annotation}
        />
      {/each}
    </div>
    <Actions
      left={{
        text: "Cancel import",
        onClick: () => {
          files = undefined;
          localAnnotations = undefined;
        },
      }}
      right={{ text: "Import annotations", onClick: onImport }}
    />
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
    padding: 1rem;
    text-align: left;
  }

  header {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 0.25rem;
  }

  header img {
    height: 1.5rem;
    margin-right: 1rem;
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
    height: fit-content;
    max-height: 400px;
    overflow-y: auto;
    margin-bottom: 1rem;
  }
</style>
