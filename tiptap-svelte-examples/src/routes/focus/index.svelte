<script>
  import { onMount, onDestroy } from "svelte";
  import Icon from "../../components/Icon";
  import Editor from "../../../../tiptap-svelte/src/Editor.js";
  import EditorContent from "../../../../tiptap-svelte/src/Components/EditorContent";
  import EditorMenuBar from "../../../../tiptap-svelte/src/Components/EditorMenuBar";
  import {
    Blockquote,
    CodeBlock,
    HardBreak,
    Heading,
    HorizontalRule,
    OrderedList,
    BulletList,
    ListItem,
    TodoItem,
    TodoList,
    Bold,
    Code,
    Italic,
    Link,
    Strike,
    Underline,
    History,
    Focus
  } from "../../../../tiptap-svelte-extensions/src/index.js";

  let editor;

  onMount(() => {
    editor = new Editor({
      extensions: [
        new Blockquote(),
        new BulletList(),
        new CodeBlock(),
        new HardBreak(),
        new Heading({ levels: [1, 2, 3] }),
        new HorizontalRule(),
        new ListItem(),
        new OrderedList(),
        new TodoItem(),
        new TodoList(),
        new Link(),
        new Bold(),
        new Code(),
        new Italic(),
        new Strike(),
        new Underline(),
        new History(),
        new Focus({
          className: "has-focus",
          nested: true
        })
      ],
      autoFocus: true,
      content: `
          <h2>
            Focus classes
          </h2>
          <p>
            With the focus extension you can add custom classes to focused nodes. Default options:
          </p>
          <pre><code>{\n  className: 'has-focus',\n  nested: true,\n}</code></pre>
          <ul>
            <li>
              When set <code>nested</code> to <code>true</code> also nested elements like this list item will be captured.
            </li>
            <li>
              Otherwise only the wrapping list will get this class.
            </li>
          </ul>
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

  :global(.has-focus) {
    border-radius: 3px;
    box-shadow: 0 0 0 3px #3ea4ffe6;
  }
</style>

{#if editor}
  <div class="editor">
    <EditorContent class="editor__content" {editor} />
  </div>
{/if}
