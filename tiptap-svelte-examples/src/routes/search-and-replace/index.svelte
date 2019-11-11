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
    Search
  } from "../../../../tiptap-svelte-extensions/src/index.js";

  let search;

  // searching: false,
  let searchTerm = null;
  let replaceWith = null;
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
        new Search({
          disableRegex: false
        })
      ],
      content: `
          <h2>
            Search and Replace
          </h2>
          <p>
            Search something. 🔍 Replace something. ✂️ Or replace all the things! 💥 That's it. That's how a search works. Good luck.
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

  function handleSearch(e) {
    if (e.keyCode === 13) {
      e.preventDefault();
      editor.commands.find(searchTerm);
    }
  }

  function handleReplace(e) {
    if (e.keyCode === 13) {
      e.preventDefault();
      editor.commands.replace(replaceWith);
    }
  }
</script>

<style lang="scss">
  @import "../../assets/sass/variables";

  .search {
    display: flex;
    flex-wrap: wrap;
    background-color: rgba($color-black, 0.1);
    padding: 0.5rem;
    border-radius: 5px;
    margin: 1rem 0;

    input {
      padding: 0.25rem;
      border: 0;
      border-radius: 3px;
      margin-right: 0.2rem;
      font: inherit;
      font-size: 0.8rem;
      width: 20%;
      flex: 1;
    }

    button {
    }
  }

  :global(.find) {
    background: rgba(255, 213, 0, 0.5);
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
        class:active={isActive && isActive.strike()}
        on:click={commands.strike}>
        <Icon name="strike" />
      </button>

      <button
        class="menubar__button"
        class:active={isActive && isActive.underline()}
        on:click={commands.underline}>
        <Icon name="underline" />
      </button>

      <button
        class="menubar__button"
        class:active={isActive && isActive.code()}
        on:click={commands.code}>
        <Icon name="code" />
      </button>

      <button
        class="menubar__button"
        class:active={isActive && isActive.paragraph()}
        on:click={commands.paragraph}>
        <Icon name="paragraph" />
      </button>

      <button
        class="menubar__button"
        class:active={isActive && isActive.heading({ level: 1 })}
        on:click={e => commands.heading({ level: 1 })}>
        H1
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

      <button class="menubar__button" on:click={commands.undo}>
        <Icon name="undo" />
      </button>

      <button class="menubar__button" on:click={commands.redo}>
        <Icon name="redo" />
      </button>

      <div class="search">
        <input
          bind:this={search}
          on:keydown={e => handleSearch(e)}
          placeholder="Search…"
          type="text"
          bind:value={searchTerm} />
        <input
          on:keydown={e => handleReplace(e)}
          placeholder="Replace…"
          type="text"
          bind:value={replaceWith} />
        <button class="button" on:click={e => editor.commands.find(searchTerm)}>
          Find
        </button>
        <button class="button" on:click={e => editor.commands.clearSearch()}>
          Clear
        </button>
        <button
          class="button"
          on:click={e => editor.commands.replace(replaceWith)}>
          Replace
        </button>
        <button
          class="button"
          on:click={e => editor.commands.replaceAll(replaceWith)}>
          Replace All
        </button>
      </div>

    </EditorMenuBar>

    <EditorContent class="editor__content" {editor} />
  </div>
{/if}
