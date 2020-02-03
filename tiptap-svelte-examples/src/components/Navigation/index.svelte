<script>
  import Icon from "../Icon";
  //import GithubButton from 'vue-github-button'
</script>

<style lang="scss" src="style.scss" global>

</style>

<div class="navigation">

  <div>
    <h1 class="navigation__logo">tiptap</h1>
    <github-button
      class="navigation__count"
      href="https://github.com/scrumpy/tiptap"
      data-show-count="true"
      aria-label="Star scrumpy/tiptap on GitHub" />
  </div>

  <div>
    <a
      class="navigation__link"
      href="https://tiptap.scrumpy.io/docs"
      target="_blank">
      Documentation
    </a>
    <a
      class="navigation__link"
      href="https://github.com/scrumpy/tiptap/blob/master/CONTRIBUTING.md"
      target="_blank">
      Contribute
    </a>
    <a
      class="navigation__github-link"
      href="https://github.com/scrumpy/tiptap"
      target="_blank">
      <Icon class="navigation__icon" name="github" />
    </a>
  </div>

</div>
