<script>
  import { onMount, onDestroy } from "svelte";
  import Editor from "../../../../tiptap-svelte/src/Editor.js";
  import EditorContent from "../../../../tiptap-svelte/src/Components/EditorContent";
  import {
    HardBreak,
    Heading,
    Bold,
    Italic,
    History,
    TrailingNode
  } from "../../../../tiptap-svelte-extensions/src/index.js";
  import Iframe from "./Iframe.js";

  let editor;

  onMount(() => {
    editor = new Editor({
      element: document.createElement("div"),
      extensions: [
        new HardBreak(),
        new Heading({ levels: [1, 2, 3] }),
        new Bold(),
        new Italic(),
        new History(),
        new TrailingNode(),
        // custom extension
        new Iframe()
      ],
      content: `
          <h2>
            Embeds
          </h2>
          <p>
            This is an example of a custom iframe node. This iframe is rendered as a <strong>svelte component</strong>. This makes it possible to render the input below to change its source.
          </p>
          <iframe src="https://www.youtube.com/embed/XIMLoLxmTDw" frameborder="0" allowfullscreen></iframe>
        `
    });
  });

  onDestroy(() => {
    if (editor) {
      editor.destroy();
    }
  });
</script>

<style lang="scss">
  @import "../../assets/sass/variables";

  :global(.iframe) {
    &__embed {
      width: 100%;
      height: 15rem;
      border: 0;
    }

    &__input {
      display: block;
      width: 100%;
      font: inherit;
      border: 0;
      border-radius: 5px;
      background-color: rgba($color-black, 0.1);
      padding: 0.3rem 0.5rem;
    }
  }
</style>

{#if editor}
  <div class="editor">
    <EditorContent class="editor__content" {editor} />
  </div>
{/if}
