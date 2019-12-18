<script>
  import Navigation from "../components/Navigation";
  import Hero from "../components/Hero";
  import Subnavigation from "../components/Subnavigation";
  import Icon from "../components/Icon";
  //import Ad from 'Components/Ad'

  export let segment;
  $: codeUrl = `https://github.com/andrewjk/tiptap-svelte/tree/master/tiptap-svelte-examples/src/routes/${segment}`;
</script>

<style lang="scss" src="_layout.scss">

</style>

<div class="page" spellcheck="false">

  <Navigation />

  <Hero />

  <Subnavigation {segment} />

  <div class="page__content">
    <slot />
  </div>

  <div class="page__footer">
    <a class="page__source-link" href={codeUrl} target="_blank">
      <Icon name="code" />
      <span>Show Code</span>
    </a>
  </div>

  <ad />

</div>
