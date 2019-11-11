<script>
  import { onMount, onDestroy } from "svelte";
  import Icon from "../../components/Icon";
  import Editor from "../../../../tiptap-svelte/src/Editor.js";
  import EditorContent from "../../../../tiptap-svelte/src/Components/EditorContent";
  import EditorMenuBar from "../../../../tiptap-svelte/src/Components/EditorMenuBar";
  import {
    HardBreak,
    Heading,
    Image,
    Bold,
    Code,
    Italic
  } from "../../../../tiptap-svelte-extensions/src/index.js";

  let editor;

  onMount(() => {
    editor = new Editor({
      extensions: [
        new HardBreak(),
        new Heading({ levels: [1, 2, 3] }),
        new Image(),
        new Bold(),
        new Code(),
        new Italic()
      ],
      content: `
          <h2>
            Images
          </h2>
          <p>
            This is basic example of implementing images. Try to drop new images here. Reordering also works.
          </p>
          <img src="https://66.media.tumblr.com/dcd3d24b79d78a3ee0f9192246e727f1/tumblr_o00xgqMhPM1qak053o1_400.gif" />
        `
    });
  });

  onDestroy(() => {
    if (editor) {
      editor.destroy();
    }
  });

  function showImagePrompt(command) {
    const src = prompt("Enter the url of your image here");
    if (src !== null) {
      command({ src });
    }
  }
</script>

{#if editor}
  <div class="editor">
    <EditorMenuBar class="menubar" {editor} let:commands>
      <button
        class="menubar__button"
        on:click={e => showImagePrompt(commands.image)}>
        <Icon name="image" />
      </button>
    </EditorMenuBar>

    <EditorContent class="editor__content" {editor} />
  </div>
{/if}
