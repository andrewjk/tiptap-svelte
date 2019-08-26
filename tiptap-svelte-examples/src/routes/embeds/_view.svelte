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

  let blah;

  $: src = node.attrs.src;

  // TODO: Watch?
  //set(src) {
  //    this.updateAttrs({
  //        src,
  //    })
  //}
</script>

<div class="iframe">
  <iframe class="iframe__embed" {src} />
  {#if view.editable}
    <input
      class="iframe__input"
      on:paste|stopPropagation
      type="text"
      bind:this={blah}
      bind:value={src} />
  {/if}
</div>
