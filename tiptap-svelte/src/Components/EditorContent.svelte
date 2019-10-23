<script>
  import { onMount, onDestroy, tick } from "svelte";

  export let editor;

  let el;

  onMount(async () => {
    if (editor && editor.element) {
      await tick();
      el.appendChild(editor.element.firstChild);
      editor.setParentComponent(el);
    }
  });

  onDestroy(() => {
    // NOTE: What does this actually do?
    editor.element = el;
  });
</script>

<style>
  :global(.ProseMirror) {
    position: relative;
  }

  :global(.ProseMirror) {
    word-wrap: break-word;
    white-space: pre-wrap;
    -webkit-font-variant-ligatures: none;
    font-variant-ligatures: none;
  }

  :global(.ProseMirror pre) {
    white-space: pre-wrap;
  }

  :global(.ProseMirror-gapcursor) {
    display: none;
    pointer-events: none;
    position: absolute;
  }

  :global(.ProseMirror-gapcursor:after) {
    content: "";
    display: block;
    position: absolute;
    top: -2px;
    width: 20px;
    border-top: 1px solid black;
    animation: ProseMirror-cursor-blink 1.1s steps(2, start) infinite;
  }

  @keyframes ProseMirror-cursor-blink {
    to {
      visibility: hidden;
    }
  }

  :global(.ProseMirror-hideselection *::selection) {
    background: transparent;
  }

  :global(.ProseMirror-hideselection *::-moz-selection) {
    background: transparent;
  }

  :global(.ProseMirror-hideselection *) {
    caret-color: transparent;
  }

  :global(.ProseMirror-focused .ProseMirror-gapcursor) {
    display: block;
  }
</style>

<div class={$$props.class} bind:this={el} />
