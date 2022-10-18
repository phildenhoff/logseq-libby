<script lang="ts">
  import { onMount } from "svelte";
  import { writable, derived } from "svelte/store";

  export let theme: "light" | "dark";
  export let highlight: string;
  export let annotation: string | undefined;
</script>

<div class="menu {theme}">
  <blockquote>{highlight}</blockquote>
  {#if annotation}
    <p>{annotation}</p>
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
    color: var(--libby-primary-text-color);
    width: inherit;
    max-width: 60ch;
    text-align: left;
  }

  blockquote {
    display: block;
    text-indent: 0;
    padding: 8px 20px;
    border-left: 4px solid;
    border-left-color: var(--libby-blue-base-color);
    background-color: var(--libby-quarternary-background-color);
    margin: 1rem 0;
    color: var(--libby-secondary-text-color);
    font-size: 1rem;
    line-height: 1.25rem;
  }

  .action:hover {
    color: var(--libby-blue-light-color);
  }
</style>
