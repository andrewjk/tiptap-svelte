<script>
  import { onMount, onDestroy } from "svelte";
  import Icon from "../../components/Icon";
  import Editor from "../../../../tiptap-svelte/src/Editor.js";
  import EditorContent from "../../../../tiptap-svelte/src/Components/EditorContent";
  import {
    CodeBlockHighlight,
    HardBreak,
    Heading,
    Bold,
    Code,
    Italic
  } from "../../../../tiptap-svelte-extensions/src/index.js";

  import javascript from "highlight.js/lib/languages/javascript";
  import cssx from "highlight.js/lib/languages/css";

  import {
    JavaScriptExample,
    CSSExample,
    ExplicitImportExample
  } from "./examples";

  let editor;

  onMount(() => {
    editor = new Editor({
      extensions: [
        new CodeBlockHighlight({
          languages: {
            javascript,
            css: cssx
          }
        }),
        new HardBreak(),
        new Heading({ levels: [1, 2, 3] }),
        new Bold(),
        new Code(),
        new Italic()
      ],
      content: `
          <h2>
            Code Highlighting
          </h2>
          <p>
            These are code blocks with <strong>automatic syntax highlighting</strong> based on highlight.js.
          </p>
          <pre><code>${JavaScriptExample}</code></pre>
          <pre><code>${CSSExample}</code></pre>

          <p>
            Note: tiptap doesn't import syntax highlighting language definitions from highlight.js. You
            <strong>must</strong> import them and initialize the extension with all languages you want to support:
          </p>
          <pre><code>${ExplicitImportExample}</code></pre>
        `
    });
  });

  onDestroy(() => {
    if (editor) {
      editor.destroy();
    }
  });
</script>

<style lang="scss">
  :global(pre) {
    &::before {
      content: attr(data-language);
      text-transform: uppercase;
      display: block;
      text-align: right;
      font-weight: bold;
      font-size: 0.6rem;
    }

    code {
      .hljs-comment,
      .hljs-quote {
        color: #999999;
      }

      .hljs-variable,
      .hljs-template-variable,
      .hljs-attribute,
      .hljs-tag,
      .hljs-name,
      .hljs-regexp,
      .hljs-link,
      .hljs-name,
      .hljs-selector-id,
      .hljs-selector-class {
        color: #f2777a;
      }

      .hljs-number,
      .hljs-meta,
      .hljs-built_in,
      .hljs-builtin-name,
      .hljs-literal,
      .hljs-type,
      .hljs-params {
        color: #f99157;
      }

      .hljs-string,
      .hljs-symbol,
      .hljs-bullet {
        color: #99cc99;
      }

      .hljs-title,
      .hljs-section {
        color: #ffcc66;
      }

      .hljs-keyword,
      .hljs-selector-tag {
        color: #6699cc;
      }

      .hljs-emphasis {
        font-style: italic;
      }

      .hljs-strong {
        font-weight: 700;
      }
    }
  }
</style>

{#if editor}
  <div class="editor">
    <EditorContent class="editor__content" {editor} />
  </div>
{/if}
