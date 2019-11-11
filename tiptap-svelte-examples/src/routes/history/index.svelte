<script>
  import { onMount, onDestroy } from "svelte";
  import Icon from "../../components/Icon";
  import Editor from "../../../../tiptap-svelte/src/Editor.js";
  import EditorContent from "../../../../tiptap-svelte/src/Components/EditorContent";
  import EditorMenuBar from "../../../../tiptap-svelte/src/Components/EditorMenuBar";
  import {
    HardBreak,
    Heading,
    Bold,
    Code,
    Italic,
    History
  } from "../../../../tiptap-svelte-extensions/src/index.js";

  let editor;
  let isActive;

  onMount(() => {
    editor = new Editor({
      extensions: [
        new HardBreak(),
        new Heading({ levels: [1, 2, 3] }),
        new Bold(),
        new Code(),
        new Italic(),
        new History()
      ],
      content: `
          <h2>
            History
          </h2>
          <p>
            Try to change some content here. With the <code>History</code> extension you are able to undo and redo your changes. You can also use keyboard shortcuts for this (<code>cmd+z</code> and <code>cmd+shift+z</code>).
          </p>
        `
    });

    editor.on("transaction", () => {
      isActive = editor.isActive;
    });
  });

  onDestroy(() => {
    if (editor) {
      editor.destroy();
    }
  });
</script>

{#if editor}
  <div class="editor">
    <EditorMenuBar class="menubar" {editor} let:commands>

      <button class="menubar__button" on:click={commands.undo}>
        <Icon name="undo" />
      </button>

      <button class="menubar__button" on:click={commands.redo}>
        <Icon name="redo" />
      </button>

    </EditorMenuBar>

    <EditorContent class="editor__content" {editor} />
  </div>
{/if}
