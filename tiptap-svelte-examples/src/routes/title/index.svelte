<script>
  import { onMount, onDestroy } from "svelte";
  import Icon from "../../components/Icon";
  import Editor from "../../../../tiptap-svelte/src/Editor.js";
  import EditorContent from "../../../../tiptap-svelte/src/Components/EditorContent";
  import { Placeholder } from "../../../../tiptap-svelte-extensions/src/index.js";
  import Doc from "./Doc";
  import Title from "./Title";

  let editor;

  onMount(() => {
    editor = new Editor({
      autoFocus: true,
      extensions: [
        new Doc(),
        new Title(),
        new Placeholder({
          showOnlyCurrent: false,
          emptyNodeText: node => {
            if (node.type.name === "title") {
              return "Give me a name";
            }

            return "Write something";
          }
        })
      ]
    });
  });

  onDestroy(() => {
    if (editor) {
      editor.destroy();
    }
  });
</script>

<style lang="scss">
  :global(.editor *.is-empty:nth-child(1)::before),
  :global(.editor *.is-empty:nth-child(2)::before) {
    content: attr(data-empty-text);
    float: left;
    color: #aaa;
    pointer-events: none;
    height: 0;
    font-style: italic;
  }
</style>

{#if editor}
  <div class="editor">
    <EditorContent class="editor__content" {editor} />
  </div>
{/if}
