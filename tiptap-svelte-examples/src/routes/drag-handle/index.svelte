<script>
  import { onMount, onDestroy } from "svelte";
  import Icon from "../../components/Icon";
  import Editor from "../../../../tiptap-svelte/src/Editor.js";
  import EditorContent from "../../../../tiptap-svelte/src/Components/EditorContent";
  import Heading from "../../../../tiptap-svelte-extensions/src/nodes/Heading";
  import Code from "../../../../tiptap-svelte-extensions/src/marks/Code";
  import DragItem from "./DragItem";

  let editor;

  onMount(() => {
    editor = new Editor({
      extensions: [new Heading(), new Code(), new DragItem()],
      content: `
          <h2>
            Drag Handle
          </h2>
          <p>
            Add <code>data-drag-handle</code> to a DOM element within your node view to define your custom drag handle.
          </p>
          <div data-type="drag_item">
            Drag me!
          </div>
          <div data-type='drag_item'>
            Try it!
          </div>
          <div data-type="drag_item">
            It works!
          </div>
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
  :global([data-type="drag_item"]) {
    display: flex;
    padding: 0.5rem;
    background-color: rgba(black, 0.05);
    margin-bottom: 0.5rem;
    border-radius: 6px;
  }

  :global([data-type="drag_item"] > :first-child) {
    flex: 1 1 auto;
  }

  :global([data-type="drag_item"] > :last-child) {
    flex: 0 0 auto;
    margin-left: auto;
    cursor: move;
    user-select: none;
  }
</style>

{#if editor}
  <div class="editor">
    <EditorContent class="editor__content" {editor} />
  </div>
{/if}
