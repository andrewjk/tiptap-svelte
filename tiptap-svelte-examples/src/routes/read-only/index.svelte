<script>
  import { onDestroy } from "svelte";
  import Icon from "../../components/Icon";
  import Editor from "../../../../tiptap-svelte/src/Editor.js";
  import EditorContent from "../../../../tiptap-svelte/src/Components/EditorContent";
  import {
    HardBreak,
    Heading,
    Bold,
    Code,
    Italic,
    Link
  } from "../../../../tiptap-svelte-extensions/src/index.js";

  let editor = new Editor({
    editable: false,
    extensions: [
      new HardBreak(),
      new Heading({ levels: [1, 2, 3] }),
      new Link(),
      new Bold(),
      new Code(),
      new Italic()
    ],
    content: `
          <h2>
            Read-Only
          </h2>
          <p>
            This text is <strong>read-only</strong>. You are not able to edit something. <a href="https://scrumpy.io/">Links to fancy websites</a> are still working.
          </p>
        `
  });
  let editable = false;

  function handleChange() {
    editor.setOptions({
      editable
    });
  }

  onDestroy(() => {
    editor.destroy();
  });
</script>

<style lang="scss">
  .checkbox {
    margin-bottom: 1rem;
  }
</style>

<div class="editor">
  <div class="checkbox">
    <input
      type="checkbox"
      id="editable"
      bind:checked={editable}
      on:change={handleChange} />
    <label for="editable">editable</label>
  </div>

  <EditorContent class="editor__content" {editor} />
</div>
