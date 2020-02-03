<script>
  export let segment;
</script>

<style lang="scss" src="style.scss" global>

</style>

<div class="subnavigation">
  <a class="subnavigation__link" class:is-exact-active={segment === undefined} href="/">About</a>
  <a class="subnavigation__link" class:is-exact-active={segment === "basic"} href="/basic">Basic</a>
  <a class="subnavigation__link" class:is-exact-active={segment === "menu-bubble"} href="/menu-bubble">Menu Bubble</a>
  <a class="subnavigation__link" class:is-exact-active={segment === "floating-menu"} href="/floating-menu">Floating Menu</a>
  <a class="subnavigation__link" class:is-exact-active={segment === "links"} href="/links">Links</a>
  <a class="subnavigation__link" class:is-exact-active={segment === "images"} href="/images">Images</a>
  <a class="subnavigation__link" class:is-exact-active={segment === "hiding-menu-bar"} href="/hiding-menu-bar">Hiding Menu Bar</a>
  <a class="subnavigation__link" class:is-exact-active={segment === "todo-list"} href="/todo-list">Todo List</a>
  <a class="subnavigation__link" class:is-exact-active={segment === "tables"} href="/tables">Tables</a>
  <a class="subnavigation__link" class:is-exact-active={segment === "search-and-replace"} href="/search-and-replace">
    Search and Replace
  </a>
  <a class="subnavigation__link" class:is-exact-active={segment === "suggestions"} href="/suggestions">Suggestions</a>
  <a class="subnavigation__link" class:is-exact-active={segment === "markdown-shortcuts"} href="/markdown-shortcuts">
    Markdown Shortcuts
  </a>
  <a class="subnavigation__link" class:is-exact-active={segment === "code-highlighting"} href="/code-highlighting">Code Highlighting</a>
  <a class="subnavigation__link" class:is-exact-active={segment === "history"} href="/history">History</a>
  <a class="subnavigation__link" class:is-exact-active={segment === "read-only"} href="/read-only">Read-Only</a>
  <a class="subnavigation__link" class:is-exact-active={segment === "embeds"} href="/embeds">Embeds</a>
  <a class="subnavigation__link" class:is-exact-active={segment === "placeholder"} href="/placeholder">Placeholder</a>
  <a class="subnavigation__link" class:is-exact-active={segment === "focus"} href="/focus">Focus</a>
  <a class="subnavigation__link" class:is-exact-active={segment === "collaboration"} href="/collaboration">Collaboration</a>
  <a class="subnavigation__link" class:is-exact-active={segment === "title"} href="/title">Title</a>
  <a class="subnavigation__link" class:is-exact-active={segment === "trailing-paragraph"} href="/trailing-paragraph">
    Trailing Paragraph
  </a>
  <a class="subnavigation__link" class:is-exact-active={segment === "drag-handle"} href="/drag-handle">Drag Handle</a>
  <a class="subnavigation__link" class:is-exact-active={segment === "export"} href="/export">Export HTML or JSON</a>
</div>
