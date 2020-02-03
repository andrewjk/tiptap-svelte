<script>
  export let name;
  export let size = "normal";
  export let fixAlign = true;
</script>

<style lang="scss" src="style.scss" global>

</style>

<div
  class={[
    'icon',
    $$props.class,
    `icon--${name}`,
    `icon--${size}`,
    fixAlign ? 'has-align-fix' : null
  ]
    .filter(Boolean)
    .join(' ')}>
  <svg class="icon__svg">
    <use
      xmlns:xlink="http://www.w3.org/1999/xlink"
      xlink:href={`#icon--${name}`} />
  </svg>
</div>
