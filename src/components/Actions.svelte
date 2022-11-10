<script lang="ts">
  type Action = {
    text: string;
    /**
     * Action to take on click.
     */
    onClick: () => void;
    /**
     * Delay before Action is clickable.
     */
    clickableDelayMs?: number;
  };

  export let left: Action | undefined;
  export let right: Action | undefined;
</script>

<div class="actions">
  {#if left && left.text && left.onClick}
    <button class="action action__left" on:click={left.onClick}>
      {left.text}</button
    >
  {/if}
  {#if right && right.text && right.onClick}
    <button class="action action__right" on:click={right.onClick}
      >{right.text}</button
    >
  {/if}
</div>

<style>
  .actions {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    --libby-blue-base-color: #1888df;
    --libby-blue-light-color: #0db3e1;
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
</style>
