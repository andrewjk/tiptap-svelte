<script>
  import { onMount, tick } from "svelte";
  import MenuBar from "../Plugins/MenuBar";

  export let editor;

  let el;

  onMount(async () => {
    if (editor) {
      await tick();
      editor.registerPlugin(
        MenuBar({
          editor,
          element: el
        })
      );
    }
  });
</script>

{#if editor}
  <div class={$$props.class} bind:this={el}>
    <slot
      focused={editor.view.focused}
      focus={editor.focus}
      commands={editor.commands}
      isActive={editor.isActive}
      getMarkAttrs={editor.getMarkAttrs.bind(editor)} />
  </div>
{/if}
