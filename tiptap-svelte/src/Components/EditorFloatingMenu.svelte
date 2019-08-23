<script>
  import { onMount, onDestroy, tick } from "svelte";
  import FloatingMenu from "../Plugins/FloatingMenu";

  export let editor;

  let el;
  let menu = {
    isActive: false,
    left: 0,
    bottom: 0
  };

  onMount(async () => {
    if (editor) {
      await tick();
      editor.registerPlugin(
        FloatingMenu({
          editor,
          element: el,
          onUpdate: newMenu => {
            menu = newMenu;
          }
        })
      );
    }
  });

  onDestroy(() => {
    editor.unregisterPlugin("floating_menu");
  });
</script>

{#if editor}
  <div class={$$props.class} bind:this={el}>
    <slot
      focused={editor.view.focused}
      focus={editor.focus}
      commands={editor.commands}
      isActive={editor.isActive}
      getMarkAttrs={editor.getMarkAttrs.bind(editor)}
      {menu} />
  </div>
{/if}
