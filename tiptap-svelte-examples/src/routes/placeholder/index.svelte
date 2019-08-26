<script>
  import { onDestroy } from "svelte";
  import Icon from "../../components/Icon";
  import Editor from "../../../../tiptap-svelte/src/Editor.js";
  import EditorContent from "../../../../tiptap-svelte/src/Components/EditorContent";
  import { BulletList, ListItem, Placeholder } from "../../../../tiptap-svelte-extensions/src/index.js";

  let editor = new Editor({
    extensions: [
      new BulletList(),
      new ListItem(),
      new Placeholder({
        emptyNodeClass: "is-empty",
        emptyNodeText: "Write something…",
        showOnlyWhenEditable: true
      })
    ]
  });

  onDestroy(() => {
    editor.destroy();
  });
</script>

<style lang="scss">
  :global(.editor p.is-empty:first-child::before) {
    content: attr(data-empty-text);
    float: left;
    color: #aaa;
    pointer-events: none;
    height: 0;
    font-style: italic;
  }
</style>

<div class="editor">
  <input
    type="text"
    bind:value={editor.extensions.options.placeholder.emptyNodeText} />
  <EditorContent class="editor__content" {editor} />
</div>
