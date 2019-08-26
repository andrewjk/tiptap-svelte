import { Node } from "../../../../tiptap-svelte/src/index.js";

export default class Title extends Node {

  get name() {
    return 'title'
  }

  get schema() {
    return {
      content: 'inline*',
      parseDOM: [{
        tag: 'h1',
      }],
      toDOM: () => ['h1', 0],
    }
  }

}
