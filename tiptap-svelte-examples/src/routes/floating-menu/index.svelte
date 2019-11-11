<script>
  import { onMount, onDestroy } from "svelte";
  import Icon from "../../components/Icon";
  import Editor from "../../../../tiptap-svelte/src/Editor.js";
  import EditorContent from "../../../../tiptap-svelte/src/Components/EditorContent";
  import EditorFloatingMenu from "../../../../tiptap-svelte/src/Components/EditorFloatingMenu";
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
    History
  } from "../../../../tiptap-svelte-extensions/src/index.js";

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
        new History()
      ],
      content: `
          <h2>
            Floating Menu
          </h2>
          <p>
            This is an example of a medium-like editor. Enter a new line and some buttons will appear.
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

<style lang="scss">
  @import "../../assets/sass/variables";

  .editor {
    position: relative;

    &__floating-menu {
      position: absolute;
      z-index: 1;
      margin-top: -0.25rem;
      visibility: hidden;
      opacity: 0;
      transition: opacity 0.2s, visibility 0.2s;

      &.active {
        opacity: 1;
        visibility: visible;
      }
    }
  }
</style>

{#if editor}
  <div class="editor">
    <EditorFloatingMenu {editor} let:commands let:menu>
      <div
        class="editor__floating-menu"
        class:active={menu.isActive}
        style={`top: ${menu.top}px`}>

        <button
          class="menubar__button"
          class:active={isActive && isActive.heading({ level: 1 })}
          on:click={e => commands.heading({ level: 1 })}>
          H1
        </button>

        <button
          class="menubar__button"
          class:active={isActive && isActive.heading({ level: 2 })}
          on:click={e => commands.heading({ level: 2 })}>
          H2
        </button>

        <button
          class="menubar__button"
          class:active={isActive && isActive.heading({ level: 3 })}
          on:click={e => commands.heading({ level: 3 })}>
          H3
        </button>

        <button
          class="menubar__button"
          class:active={isActive && isActive.bullet_list()}
          on:click={commands.bullet_list}>
          <Icon name="ul" />
        </button>

        <button
          class="menubar__button"
          class:active={isActive && isActive.ordered_list()}
          on:click={commands.ordered_list}>
          <Icon name="ol" />
        </button>

        <button
          class="menubar__button"
          class:active={isActive && isActive.blockquote()}
          on:click={commands.blockquote}>
          <Icon name="quote" />
        </button>

        <button
          class="menubar__button"
          class:active={isActive && isActive.code_block()}
          on:click={commands.code_block}>
          <Icon name="code" />
        </button>

      </div>
    </EditorFloatingMenu>

    <EditorContent class="editor__content" {editor} />
  </div>
{/if}
