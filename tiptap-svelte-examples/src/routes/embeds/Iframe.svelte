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

  function onChange(e) {
    updateAttrs({
      src: e.target.value
    });
  }
</script>

<div class="iframe">
  <iframe class="iframe__embed" src={node.attrs.src} title="Embedded iframe demo" />
  {#if view.editable}
    <input
      class="iframe__input"
      on:paste|stopPropagation
      type="text"
      value={node.attrs.src}
      on:change={onChange} />
  {/if}
</div>
