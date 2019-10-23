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

</script>

<div data-type="drag_item" contenteditable="false">
  <div bind:this={content} class="content-xx" contenteditable="true" />
  <div data-drag-handle>≡</div>
</div>
