<script lang="ts">
  import type { Hst } from "@histoire/plugin-svelte";
  import Menu from "./Menu.svelte";

  export let Hst: Hst;
</script>

<Hst.Story title="Menu">
  <Hst.Variant title="default"><Menu theme="light" /></Hst.Variant>
  <Hst.Variant title="dark"><Menu theme="dark" /></Hst.Variant>
  <Hst.Variant title="dark with annotations"><Menu theme="dark" /></Hst.Variant>
  <Hst.Variant title="dark with long annotation"
    ><Menu theme="dark" /></Hst.Variant
  >
</Hst.Story>
