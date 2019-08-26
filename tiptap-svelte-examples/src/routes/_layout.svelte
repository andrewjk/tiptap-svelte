<script>
  import Navigation from "../components/Navigation";
  import Hero from "../components/Hero";
  import Subnavigation from "../components/Subnavigation";
  import Icon from "../components/Icon";
  //import Ad from 'Components/Ad'
</script>

<style lang="scss" src="_layout.scss">

</style>

<div class="page" spellcheck="false">

  <Navigation />

  <Hero />

  <Subnavigation />

  <div class="page__content">
    <slot />
  </div>

  <div class="page__footer">
    <a class="page__source-link" href="$route.meta.githubUrl" target="_blank">
      <Icon name="code" />
      <span>Show Code</span>
    </a>
  </div>

  <ad />

</div>
