import { Node } from "../../../../tiptap-svelte/src";
import View from './DragItem.svelte';

export default class DragItem extends Node {

  get name() {
    return 'drag_item'
  }

  get schema() {
    return {
      group: 'block',
      draggable: true,
      content: 'paragraph+',
      toDOM: () => ['div', { 'data-type': this.name }, 0],
      parseDOM: [{
        tag: `[data-type="${this.name}"]`,
      }],
    }
  }

  get view() {
    return View;
  }

}
