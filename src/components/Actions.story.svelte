<script lang="ts">
  import type { Hst } from "@histoire/plugin-svelte";
  import Actions from "./Actions.svelte";

  export let Hst: Hst;
</script>

<Hst.Story title="Actions">
  <Hst.Variant title="default"
    ><Actions
      left={{
        text: "Left text",
        onClick: () => {},
      }}
      right={{
        text: "Right text",
        onClick: () => {},
      }}
    /></Hst.Variant
  >
</Hst.Story>
