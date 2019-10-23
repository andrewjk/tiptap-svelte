<script>
  export let node;
  export let updateAttrs;
  export let view;

  // HACK: These are here to stop warnings clogging up the debug console
  export let editor;
  export let getPos;
  export let decorations;
  export let selected;
  export let options;

  // TODO: Figure out a way to get this out of the component
  // For now, we require an element with the class `content-xx`
  export let content;

  function onChange() {
    updateAttrs({
      done: !node.attrs.done
    });
  }
</script>

<li data-type={node.type.name} data-done={node.attrs.done} data-drag-handle>
  <span class="todo-checkbox" contenteditable="false" on:click={onChange} />
  <div class="todo-content content-xx" bind:this={content} contenteditable={view.editable} />
</li>
