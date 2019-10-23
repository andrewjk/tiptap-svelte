# tiptap-svelte

This editor is ported from [tiptap](https://tiptap.scrumpy.io), which is based on [Prosemirror](https://prosemirror.net).

It is *fully extendable* and renderless. You can easily add custom nodes as __Svelte components__.

## Getting started

```bash
yarn add -D tiptap-svelte etc
```

## Running the examples

```bash
git clone https://github.com/andrewjk/tiptap-svelte.git
cd tiptap-svelte/tiptap-svelte-examples
yarn run dev
```

Then point your browser to [http://localhost:3000](http://localhost:3000).

## Basic setup

```
<script>
    // Import the editor
    import { Editor, EditorContent } from 'tiptap-svelte';
    import { onMount, onDestroy } from 'svelte';

    let editor = null;

    onMount(() => {
        editor = new Editor({
            content: '<p>This is just a boring paragraph</p>',
        })
    });

    onDestroy(() => {
        editor.destroy()
    });
</script>

<EditorContent {editor} />
```
