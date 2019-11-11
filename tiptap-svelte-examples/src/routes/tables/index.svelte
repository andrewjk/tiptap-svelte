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
    OrderedList,
    BulletList,
    ListItem,
    TodoItem,
    TodoList,
    Bold,
    Code,
    Italic,
    Link,
    Table,
    TableHeader,
    TableCell,
    TableRow,
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
        new Table({
          resizable: true
        }),
        new TableHeader(),
        new TableCell(),
        new TableRow()
      ],
      content: `
            <h2>
              Tables
            </h2>
            <p>
              Tables come with some useful commands like adding, removing or merging rows and columns. Navigate with <code>tab</code> or arrow keys. Resizing is also supported.
            </p>
            <table>
              <tr>
                <th colspan="3" data-colwidth="100,0,0">Wide header</th>
              </tr>
              <tr>
                <td>One</td>
                <td>Two</td>
                <td>Three</td>
              </tr>
              <tr>
                <td>Four</td>
                <td>Five</td>
                <td>Six</td>
              </tr>
            </table>
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
      <div class="toolbar">
        <button class="menubar__button" on:click={commands.undo}>
          <Icon name="undo" />
        </button>

        <button class="menubar__button" on:click={commands.redo}>
          <Icon name="redo" />
        </button>

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

        <button
          class="menubar__button"
          on:click={e => commands.createTable({
              rowsCount: 3,
              colsCount: 3,
              withHeaderRow: false
            })}>
          <Icon name="table" />
        </button>

        <span v-if="isActive.table()">
          <button class="menubar__button" on:click={commands.deleteTable}>
            <Icon name="delete_table" />
          </button>
          <button class="menubar__button" on:click={commands.addColumnBefore}>
            <Icon name="add_col_before" />
          </button>
          <button class="menubar__button" on:click={commands.addColumnAfter}>
            <Icon name="add_col_after" />
          </button>
          <button class="menubar__button" on:click={commands.deleteColumn}>
            <Icon name="delete_col" />
          </button>
          <button class="menubar__button" on:click={commands.addRowBefore}>
            <Icon name="add_row_before" />
          </button>
          <button class="menubar__button" on:click={commands.addRowAfter}>
            <Icon name="add_row_after" />
          </button>
          <button class="menubar__button" on:click={commands.deleteRow}>
            <Icon name="delete_row" />
          </button>
          <button class="menubar__button" on:click={commands.toggleCellMerge}>
            <Icon name="combine_cells" />
          </button>
        </span>
      </div>
    </EditorMenuBar>

    <EditorContent class="editor__content" {editor} />
  </div>
{/if}
