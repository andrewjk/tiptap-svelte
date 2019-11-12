# tiptap-svelte

This editor is ported from [tiptap](https://tiptap.scrumpy.io), which is based on [Prosemirror](https://prosemirror.net).

It is *fully extendable* and renderless. You can easily add custom nodes as __Svelte components__.

## Getting started

TODO: Package for NPM

```bash
yarn add -D tiptap-svelte etc
```

## Running the examples

```bash
# clone tiptap-svelte
git clone https://github.com/andrewjk/tiptap-svelte.git
cd tiptap-svelte

# install the dependencies for each project
cd tiptap-svelte && yarn install && cd ..
cd tiptap-svelte-extensions && yarn install && cd ..
cd tiptap-svelte-examples && yarn install && cd ..

# run the examples project
cd tiptap-svelte-examples
yarn run dev
```

Then point your browser to [http://localhost:3000](http://localhost:3000).

## Basic setup

```
<script>
    // Import the editor
    import { Editor, EditorContent } from 'tiptap-svelte';
    import { onMount, onDestroy } from 'svelte';

    let editor;

    onMount(() => {
        editor = new Editor({
            content: '<p>This is just a boring paragraph</p>',
        })
    });

    onDestroy(() => {
        if (editor) {
            editor.destroy()
        }
    });
</script>

{#if editor}
    <EditorContent {editor} />
{/if}
```
