<script lang="ts">
  import type { Hst } from "@histoire/plugin-svelte";
  import Menu from "./Menu.svelte";

  export let Hst;

  let sampleAnnotations = [
    { highlight: "Hi there", annotation: "This is a note!" },
    { highlight: "Example 2", annotation: "Another note here" },
  ];

  let longAnnotation = [
    {
      highlight:
        "In turning down obligations, I also resist the urge to offer a consolation prize that ends up devouring almost as much of my schedule (e.g., “Sorry I can’t join your committee, but I’m happy to take a look at some of your proposals as they come together and offer my thoughts”). A clean break is best",
      annotation:
        "This form of language (“I can’t”) is disingenuous at best. You can join, you are choosing not too. “Sorry, I’m very focused these days, and a new committee isn’t a priority for me. I must politely decline” although I guess why must you? Probably for the same reason you “can’t”… interesting ",
    },
  ];
</script>

<Hst.Story title="Menu">
  <Hst.Variant title="default"><Menu theme="light" /></Hst.Variant>
  <Hst.Variant title="dark"><Menu theme="dark" /></Hst.Variant>
  <Hst.Variant title="dark with annotations"
    ><Menu
      theme="dark"
      annotations={sampleAnnotations}
    /></Hst.Variant
  >
  <Hst.Variant title="dark with long annotation"
    ><Menu
      theme="dark"
      annotations={[...longAnnotation, ...longAnnotation, ...longAnnotation]}
    /></Hst.Variant
  >
</Hst.Story>
