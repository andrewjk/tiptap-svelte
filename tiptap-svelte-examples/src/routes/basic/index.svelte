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
        new History()
      ],
      content: `
          <h2>
            Hi there,
          </h2>
          <p>
            this is a very <em>basic</em> example of tiptap.
          </p>
          <pre><code>body { display: none; }</code></pre>
          <ul>
            <li>
              A regular list
            </li>
            <li>
              With regular items
            </li>
          </ul>
          <blockquote>
            It's amazing 👏
            <br />
            – mom
          </blockquote>
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

      <button class="menubar__button" on:click={commands.horizontal_rule}>
        <Icon name="hr" />
      </button>

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
