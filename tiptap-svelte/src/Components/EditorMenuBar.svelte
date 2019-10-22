<script>
  import { onMount, tick } from "svelte";
  import MenuBar from "../Plugins/MenuBar";

  export let editor;

  let el;
  let focused = false;

  onMount(async () => {
    if (editor) {
      await tick();

      editor.registerPlugin(
        MenuBar({
          editor,
          element: el
        })
      );

      focused = editor.focused;

      editor.on("focus", () => {
        focused = true;
      });

      editor.on("menubar:focusUpdate", newFocused => {
        focused = newFocused;
      });
    }
  });
</script>

{#if editor}
  <div class={$$props.class} bind:this={el}>
    <slot
      {focused}
      focus={editor.focus}
      commands={editor.commands}
      isActive={editor.isActive}
      getMarkAttrs={editor.getMarkAttrs.bind(editor)} />
  </div>
{/if}
