<script>
  import { onMount, onDestroy } from "svelte";
  import Fuse from "fuse.js";
  import tippy from "tippy.js";
  import Icon from "../../components/Icon";
  import Editor from "../../../../tiptap-svelte/src/Editor.js";
  import EditorContent from "../../../../tiptap-svelte/src/Components/EditorContent";
  import EditorMenuBar from "../../../../tiptap-svelte/src/Components/EditorMenuBar";
  import {
    HardBreak,
    Heading,
    Mention,
    Code,
    Bold,
    Italic
  } from "../../../../tiptap-svelte-extensions/src/index.js";

  let editor;

  onMount(() => {
    editor = new Editor({
      extensions: [
        new HardBreak(),
        new Heading({ levels: [1, 2, 3] }),
        new Mention({
          // a list of all suggested items
          items: () => [
            { id: 1, name: "Philipp Kühn" },
            { id: 2, name: "Hans Pagel" },
            { id: 3, name: "Kris Siepert" },
            { id: 4, name: "Justin Schueler" }
          ],
          // is called when a suggestion starts
          onEnter: ({ items, query, range, command, virtualNode }) => {
            query = query;
            filteredUsers = items;
            suggestionRange = range;
            renderPopup(virtualNode);
            // we save the command for inserting a selected mention
            // this allows us to call it inside of our custom popup
            // via keyboard navigation and on click
            insertMention = command;
          },
          // is called when a suggestion has changed
          onChange: ({ items, query, range, virtualNode }) => {
            query = query;
            filteredUsers = items;
            suggestionRange = range;
            navigatedUserIndex = 0;
            renderPopup(virtualNode);
          },
          // is called when a suggestion is cancelled
          onExit: () => {
            // reset all saved values
            query = null;
            filteredUsers = [];
            suggestionRange = null;
            navigatedUserIndex = 0;
            destroyPopup();
          },
          // is called on every keyDown event while a suggestion is active
          onKeyDown: ({ event }) => {
            // pressing up arrow
            if (event.keyCode === 38) {
              upHandler();
              return true;
            }
            // pressing down arrow
            if (event.keyCode === 40) {
              downHandler();
              return true;
            }
            // pressing enter
            if (event.keyCode === 13) {
              enterHandler();
              return true;
            }

            return false;
          },
          // is called when a suggestion has changed
          // this function is optional because there is basic filtering built-in
          // you can overwrite it if you prefer your own filtering
          // in this example we use fuse.js with support for fuzzy search
          onFilter: (items, query) => {
            if (!query) {
              return items;
            }

            const fuse = new Fuse(items, {
              threshold: 0.2,
              keys: ["name"]
            });

            return fuse.search(query);
          }
        }),
        new Code(),
        new Bold(),
        new Italic()
      ],
      content: `
          <h2>
            Suggestions
          </h2>
          <p>
            Sometimes it's useful to <strong>mention</strong> someone. That's a feature we're very used to. Under the hood this technique can also be used for other features likes <strong>hashtags</strong> and <strong>commands</strong> – lets call it <em>suggestions</em>.
          </p>
          <p>
            This is an example how to mention some users like <span data-mention-id="1">Philipp Kühn</span> or <span data-mention-id="2">Hans Pagel</span>. Try to type <code>@</code> and a popup (rendered with tippy.js) will appear. You can navigate with arrow keys through a list of suggestions.
          </p>
        `
    });
  });

  onDestroy(() => {
    if (editor) {
      editor.destroy();
    }
  });

  let query = null;
  let suggestionRange = null;
  let filteredUsers = [];
  let navigatedUserIndex = 0;
  let insertMention = () => {};
  let observer = null;
  let popup = null;

  $: hasResults = filteredUsers.length;

  $: showSuggestions = query || hasResults;

  let suggestions;

  // navigate to the previous item
  // if it's the first item, navigate to the last one
  function upHandler() {
    navigatedUserIndex =
      (navigatedUserIndex + filteredUsers.length - 1) % filteredUsers.length;
  }

  // navigate to the next item
  // if it's the last item, navigate to the first one
  function downHandler() {
    navigatedUserIndex = (navigatedUserIndex + 1) % filteredUsers.length;
  }

  function enterHandler() {
    const user = filteredUsers[navigatedUserIndex];

    if (user) {
      selectUser(user);
    }
  }

  // we have to replace our suggestion text with a mention
  // so it's important to pass also the position of your suggestion text
  function selectUser(user) {
    insertMention({
      range: suggestionRange,
      attrs: {
        id: user.id,
        label: user.name
      }
    });
    editor.focus();
  }

  // renders a popup with suggestions
  // tiptap provides a virtualNode object for using popper.js (or tippy.js) for popups
  function renderPopup(node) {
    if (popup) {
      return;
    }

    popup = tippy(node, {
      content: suggestions,
      trigger: "mouseenter",
      interactive: true,
      theme: "dark",
      placement: "top-start",
      inertia: true,
      duration: [400, 200],
      showOnInit: true,
      arrow: true,
      arrowType: "round"
    });

    // we have to update tippy whenever the DOM is updated
    if (MutationObserver) {
      observer = new MutationObserver(() => {
        popup.popperInstance.scheduleUpdate();
      });
      observer.observe(suggestions, {
        childList: true,
        subtree: true,
        characterData: true
      });
    }
  }

  function destroyPopup() {
    if (popup) {
      popup.destroy();
      popup = null;
    }

    if (observer) {
      observer.disconnect();
    }
  }
</script>

<style lang="scss">
  @import "../../assets/sass/variables";

  :global(.mention) {
    background: rgba($color-black, 0.1);
    color: rgba($color-black, 0.6);
    font-size: 0.8rem;
    font-weight: bold;
    border-radius: 5px;
    padding: 0.2rem 0.5rem;
    white-space: nowrap;
  }

  :global(.mention-suggestion) {
    color: rgba($color-black, 0.6);
  }

  .suggestion-list {
    display: none;
    padding: 0.2rem;
    border: 2px solid rgba($color-black, 0.1);
    font-size: 0.8rem;
    font-weight: bold;

    &.active {
      display: block;
    }

    :global(&__no-results) {
      padding: 0.2rem 0.5rem;
    }

    &__item {
      border-radius: 5px;
      padding: 0.2rem 0.5rem;
      margin-bottom: 0.2rem;
      cursor: pointer;

      &:last-child {
        margin-bottom: 0;
      }

      &.selected,
      &:hover {
        background-color: rgba($color-white, 0.2);
      }

      &.is-empty {
        opacity: 0.5;
      }
    }
  }

  :global(.tippy-tooltip.dark-theme) {
    background-color: $color-black;
    padding: 0;
    font-size: 1rem;
    text-align: inherit;
    color: $color-white;
    border-radius: 5px;
  }

  :global(.tippy-backdrop) {
    display: none;
  }

  :global(.tippy-roundarrow) {
    fill: $color-black;
  }

  :global(.tippy-popper[x-placement^="top"] & .tippy-arrow) {
    border-top-color: $color-black;
  }

  :global(.tippy-popper[x-placement^="bottom"] & .tippy-arrow) {
    border-bottom-color: $color-black;
  }

  :global(.tippy-popper[x-placement^="left"] & .tippy-arrow) {
    border-left-color: $color-black;
  }

  :global(.tippy-popper[x-placement^="right"] & .tippy-arrow) {
    border-right-color: $color-black;
  }
</style>

{#if editor}
  <div>

    <div class="editor">
      <EditorMenuBar class="menubar" {editor} let:commands>
        <button
          class="menubar__button"
          on:click={e => commands.mention({ id: 1, label: 'Philipp Kühn' })}>
          <Icon name="mention" />
          <span>Insert Mention</span>
        </button>
      </EditorMenuBar>
      <EditorContent class="editor__content" {editor} />
    </div>

    <div
      class="suggestion-list"
      class:active={showSuggestions}
      bind:this={suggestions}>
      {#if hasResults}
        {#each filteredUsers as user, index (user.id)}
          <div
            class="suggestion-list__item"
            class:selected={navigatedUserIndex === index}
            on:click={e => selectUser(user)}>
            {user.name}
          </div>
        {/each}
      {:else}
        <div class="suggestion-list__item is-empty">No users found</div>
      {/if}
    </div>

  </div>
{/if}
