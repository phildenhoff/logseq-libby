<script lang="ts">
  import svelteLogo from "./assets/svelte.svg";
  import Menu from "./components/Menu.svelte";

  const l = window?.logseq ?? ({} as ILSPluginUser);

  const close = () => l?.hideMainUI();
  const closeOnKeys = (event) => event.key === 'Escape' && close();
</script>

<main
  class="clickOutCaptureContainer"
  on:click={close}
  on:keydown={closeOnKeys}
>
  <div on:click|stopPropagation={() => undefined}>
    <Menu />
  </div>
</main>

<style>
  :root {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
      Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
    cursor: default;
  }

  :global(:root .dark) {
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

  :global(:root .light) {
    --libby-primary-text-color: #121212;
    --libby-primary-background-color: #fff;
    --libby-secondary-background-color: #f8f8f8;
    --libby-quarternary-background-color: #e8e8e8;
    --libby-secondary-text-color: #6f6f6f;
  }
  main {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
</style>
