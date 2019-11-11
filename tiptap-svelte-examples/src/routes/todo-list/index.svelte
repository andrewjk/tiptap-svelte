<script>
  import { onMount, onDestroy } from "svelte";
  import Icon from "../../components/Icon";
  import Editor from "../../../../tiptap-svelte/src/Editor.js";
  import EditorContent from "../../../../tiptap-svelte/src/Components/EditorContent";
  import EditorMenuBar from "../../../../tiptap-svelte/src/Components/EditorMenuBar";
  import {
    CodeBlock,
    HardBreak,
    Heading,
    TodoItem,
    TodoList,
    Bold,
    Code,
    Italic
  } from "../../../../tiptap-svelte-extensions/src/index.js";

  let editor;
  let isActive;

  onMount(() => {
    editor = new Editor({
      extensions: [
        new CodeBlock(),
        new HardBreak(),
        new Heading({ levels: [1, 2, 3] }),
        new TodoItem({
          nested: true
        }),
        new TodoList(),
        new Bold(),
        new Code(),
        new Italic()
      ],
      content: `
          <h2>
            Todo List
          </h2>
          <p>
            There is always something to do. Thankfully, there are checklists for that. Don't forget to call mom.
          </p>
          <ul data-type="todo_list">
            <li data-type="todo_item" data-done="true">
              Buy beer
            </li>
            <li data-type="todo_item" data-done="true">
              Buy meat
            </li>
            <li data-type="todo_item" data-done="true">
              Buy milk
            </li>
            <li data-type="todo_item" data-done="false">
              Call mom
            </li>
          </ul>
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

  :global(ul[data-type="todo_list"]) {
    padding-left: 0;
  }

  :global(li[data-type="todo_item"]) {
    display: flex;
    flex-direction: row;
  }

  :global(.todo-checkbox) {
    border: 2px solid $color-black;
    height: 0.9em;
    width: 0.9em;
    box-sizing: border-box;
    margin-right: 10px;
    margin-top: 0.3rem;
    user-select: none;
    -webkit-user-select: none;
    cursor: pointer;
    border-radius: 0.2em;
    background-color: transparent;
    transition: 0.4s background;
  }

  :global(.todo-content) {
    flex: 1;
    > p:last-of-type {
      margin-bottom: 0;
    }
    > ul[data-type="todo_list"] {
      margin: 0.5rem 0;
    }
  }

  :global(li[data-done="true"]) {
    > .todo-content {
      > p {
        text-decoration: line-through;
      }
    }
    > .todo-checkbox {
      background-color: $color-black;
    }
  }

  :global(li[data-done="false"]) {
    text-decoration: none;
  }
</style>

{#if editor}
  <div class="editor">
    <EditorMenuBar class="menubar" {editor} let:commands>

      <button
        class="menubar__button"
        class:active={isActive && isActive.bold()}
        on:click={commands.bold}>
        <Icon name="bold" />
      </button>

      <button
        class="menubar__button"
        class:active={isActive && isActive.italic()}
        on:click={commands.italic}>
        <Icon name="italic" />
      </button>

      <button
        class="menubar__button"
        class:active={isActive && isActive.code()}
        on:click={commands.code}>
        <Icon name="code" />
      </button>

      <button
        class="menubar__button"
        class:active={isActive && isActive.todo_list()}
        on:click={commands.todo_list}>
        <Icon name="checklist" />
      </button>

    </EditorMenuBar>

    <EditorContent class="editor__content" {editor} />
  </div>
{/if}
