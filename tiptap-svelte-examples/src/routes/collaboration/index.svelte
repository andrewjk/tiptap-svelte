<script>
  import { onMount, onDestroy } from "svelte";
  import io from "socket.io-client";
  import Icon from "../../components/Icon";
  import Editor from "../../../../tiptap-svelte/src/Editor.js";
  import EditorContent from "../../../../tiptap-svelte/src/Components/EditorContent";
  import {
    HardBreak,
    Heading,
    Bold,
    Code,
    Italic,
    History,
    Collaboration
  } from "../../../../tiptap-svelte-extensions/src/index.js";

  let loading = true;
  let editor = null;
  let socket = null;
  let count = 0;

  function onInit({ doc, version }) {
    loading = false;

    if (editor) {
      editor.destroy();
    }

    editor = new Editor({
      content: doc,
      extensions: [
        new HardBreak(),
        new Heading({ levels: [1, 2, 3] }),
        new Bold(),
        new Code(),
        new Italic(),
        new History(),
        new Collaboration({
          // the initial version we start with
          // version is an integer which is incremented with every change
          version,
          // debounce changes so we can save some requests
          debounce: 250,
          // onSendable is called whenever there are changed we have to send to our server
          onSendable: ({ sendable }) => {
            socket.emit("update", sendable);
          }
        })
      ]
    });
  }

  function setCount(count) {
    count = count;
  }

  onMount(() => {
    // server implementation: https://glitch.com/edit/#!/tiptap-sockets
    socket = io("wss://tiptap-sockets.glitch.me")
      // get the current document and its version
      .on("init", data => onInit(data))
      // send all updates to the collaboration extension
      .on("update", data =>
        editor.extensions.options.collaboration.update(data)
      )
      // get count of connected users
      .on("getCount", count => setCount(count));
  });

  onDestroy(() => {
    if (editor) {
      editor.destroy();
    }
    if (socket) {
      socket.destroy();
    }
  });
</script>

<style lang="scss">
  @import "../../assets/sass/variables";

  .count {
    display: flex;
    align-items: center;
    font-weight: bold;
    color: rgba($color-black, 0.5);
    color: #27b127;
    margin-bottom: 1rem;
    text-transform: uppercase;
    font-size: 0.7rem;
    line-height: 1;

    &:before {
      content: "";
      display: inline-flex;
      background-color: #27b127;
      width: 0.4rem;
      height: 0.4rem;
      border-radius: 50%;
      margin-right: 0.3rem;
    }
  }
</style>

{#if editor}
  <div class="editor">
    <h2>Collaborative Editing</h2>
    <div class="message">
      With the Collaboration Extension it's possible for several users to work
      on a document at the same time. To make this possible, client-side and
      server-side code is required. This example shows this using a
      <a href="https://glitch.com/edit/#!/tiptap-sockets" target="_blank">
        socket server on glitch.com
      </a>
      . To keep the demo code clean, only a few nodes and marks are activated.
      There is also set a 250ms debounce for all changes. Try it out below:
    </div>
    {#if editor && !loading}
      <div class="count">
        {count} {count === 1 ? 'user' : 'users'} connected
      </div>
      <EditorContent class="editor__content" {editor} />
    {:else}
      <em>Connecting to socket server…</em>
    {/if}
  </div>
{/if}
