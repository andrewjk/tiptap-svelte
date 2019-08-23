<script>
  import { onMount, onDestroy, createEventDispatcher, tick } from "svelte";
  import MenuBubble from "../Plugins/MenuBubble";

  export let editor;
  export const keepInBounds = true;

  let el;
  let menu = {
    isActive: false,
    left: 0,
    bottom: 0
  };

  const dispatch = createEventDispatcher();

  onMount(async () => {
    if (editor) {
      await tick();
      editor.registerPlugin(
        MenuBubble({
          editor,
          element: el,
          keepInBounds,
          onUpdate: newMenu => {
            // the second check ensures event is fired only once
            if (newMenu.isActive && menu.isActive === false) {
              dispatch("show", newMenu);
            } else if (!newMenu.isActive && menu.isActive === true) {
              dispatch("hide", newMenu);
            }
            menu = newMenu;
          }
        })
      );
    }
  });

  onDestroy(() => {
    editor.unregisterPlugin("menu_bubble");
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
