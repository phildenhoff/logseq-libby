<script lang="ts">
  import type { Hst } from "@histoire/plugin-svelte";
  import Highlight from "./Highlight.svelte";

  export let Hst: Hst;
  let highlight = "Important content to save for later here";
  let annotation = "Yes very important";

  let long_highlight =
    "In turning down obligations, I also resist the urge to offer a consolation prize that ends up devouring almost as much of my schedule (e.g., “Sorry I can’t join your committee, but I’m happy to take a look at some of your proposals as they come together and offer my thoughts”). A clean break is best";
  let long_annotation =
    "This form of language (“I can’t”) is disingenuous at best. You can join, you are choosing not too. “Sorry, I’m very focused these days, and a new committee isn’t a priority for me. I must politely decline” although I guess why must you? Probably for the same reason you “can’t”… interesting ";
</script>

<Hst.Story title="Highlight">
  <Hst.Variant title="default">
    <svelte:fragment slot="controls">
      <Hst.Text bind:value={highlight} title="Highlight" />
      <Hst.Text bind:value={annotation} title="Annotation" />
    </svelte:fragment>
    <Highlight theme="light" {highlight} {annotation} /></Hst.Variant
  >
  <Hst.Variant title="dark">
    <svelte:fragment slot="controls">
      <Hst.Text bind:value={highlight} title="Highlight" />
      <Hst.Text bind:value={annotation} title="Annotation" />
    </svelte:fragment>
    <Highlight theme="dark" {highlight} {annotation} /></Hst.Variant
  >

  <Hst.Variant title="dark long text">
    <Highlight
      theme="dark"
      highlight={long_highlight}
      annotation={long_annotation}
    />
  </Hst.Variant>
</Hst.Story>
