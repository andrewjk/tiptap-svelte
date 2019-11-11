<script>
  import { onMount, onDestroy } from "svelte";
  import Icon from "../../components/Icon";
  import Editor from "../../../../tiptap-svelte/src/Editor.js";
  import EditorContent from "../../../../tiptap-svelte/src/Components/EditorContent";
  import EditorMenuBubble from "../../../../tiptap-svelte/src/Components/EditorMenuBubble";
  import {
    Blockquote,
    BulletList,
    CodeBlock,
    HardBreak,
    Heading,
    ListItem,
    OrderedList,
    TodoItem,
    TodoList,
    Bold,
    Code,
    Italic,
    Link,
    Strike,
    Underline,
    History
  } from "../../../../tiptap-svelte-extensions/src/index.js";

  let keepInBounds = true;
  let editor;
  let isActive;

  onMount(() => {
    editor = new Editor({
      extensions: [
        new Blockquote(),
        new BulletList(),
        new CodeBlock(),
        new HardBreak(),
        new Heading({ levels: [1, 2, 3] }),
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
        new History()
      ],
      content: `
          <h2>
            Menu Bubble
          </h2>
          <p>
            Hey, try to select some text here. There will popup a menu for selecting some inline styles. <em>Remember:</em> you have full control about content and styling of this menu.
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
    <EditorMenuBubble {editor} {keepInBounds} let:commands let:menu>
      <div
        class="menububble"
        class:active={menu.isActive}
        style={`left: ${menu.left}px; bottom: ${menu.bottom}px;`}>

        <button
          class="menububble__button"
          class:active={isActive && isActive.bold()}
          on:click={commands.bold}>
          <Icon name="bold" />
        </button>

        <button
          class="menububble__button"
          class:active={isActive && isActive.italic()}
          on:click={commands.italic}>
          <Icon name="italic" />
        </button>

        <button
          class="menububble__button"
          class:active={isActive && isActive.code()}
          on:click={commands.code}>
          <Icon name="code" />
        </button>

      </div>
    </EditorMenuBubble>

    <EditorContent class="editor__content" {editor} />
  </div>
{/if}
