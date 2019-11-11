<script>
  import { onMount, onDestroy } from "svelte";
  import { tick } from "svelte";
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
    History
  } from "../../../../tiptap-svelte-extensions/src/index.js";

  let editor;

  let linkUrl = null;
  let linkMenuIsActive = false;

  let linkInput;

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
            Links
          </h2>
          <p>
            Try to add some links to the <a href="https://en.wikipedia.org/wiki/World_Wide_Web">world wide web</a>. By default every link will get a <code>rel="noopener noreferrer nofollow"</code> attribute.
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

  async function showLinkMenu(attrs) {
    linkUrl = attrs.href;
    linkMenuIsActive = true;
    await tick();
    linkInput.focus();
  }

  function handleClose(e) {
    if (e.keyCode === 27) {
      e.preventDefault();
      hideLinkMenu();
    }
  }

  function hideLinkMenu() {
    linkUrl = null;
    linkMenuIsActive = false;
  }

  function setLinkUrl(command, url) {
    command({ href: url });
    hideLinkMenu();
  }
</script>

{#if editor}
  <div class="editor">
    <EditorMenuBubble
      {editor}
      on:hide={hideLinkMenu}
      let:commands
      let:getMarkAttrs
      let:menu>
      <div
        class="menububble"
        class:active={menu.isActive}
        style={`left: ${menu.left}px; bottom: ${menu.bottom}px;`}>

        {#if linkMenuIsActive}
          <form
            class="menububble__form"
            on:submit|preventDefault={e => setLinkUrl(commands.link, linkUrl)}>
            <input
              class="menububble__input"
              type="text"
              bind:value={linkUrl}
              placeholder="https://"
              bind:this={linkInput}
              on:keydown={e => handleClose(e)} />
            <button
              class="menububble__button"
              on:click={e => setLinkUrl(commands.link, null)}
              type="button">
              <Icon name="remove" />
            </button>
          </form>
        {:else}
          <button
            class="menububble__button"
            on:click={e => showLinkMenu(getMarkAttrs('link'))}
            class:active={isActive && isActive.link()}>
            <span>
              {isActive && isActive.link() ? 'Update Link' : 'Add Link'}
            </span>
            <Icon name="link" />
          </button>
        {/if}
      </div>
    </EditorMenuBubble>

    <EditorContent class="editor__content" {editor} />
  </div>
{/if}
