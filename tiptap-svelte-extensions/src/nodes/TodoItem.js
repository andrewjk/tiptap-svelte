import { Node } from '../../../tiptap-svelte/src/index.js'
import { sinkListItem, splitToDefaultListItem, liftListItem } from 'tiptap-commands'
import View from './TodoItem.svelte'

export default class TodoItem extends Node {

  get name() {
    return 'todo_item'
  }

  get defaultOptions() {
    return {
      nested: false,
    }
  }

  get view() {
    return View;
  }

  get schema() {
    return {
      attrs: {
        done: {
          default: false,
        },
      },
      draggable: true,
      content: this.options.nested ? '(paragraph|todo_list)+' : 'paragraph+',
      toDOM: node => {
        const { done } = node.attrs
        return [
          'li',
          {
            'data-type': this.name,
            'data-done': done.toString(),
          },
          ['span', { class: 'todo-checkbox', contenteditable: 'false' }],
          ['div', { class: 'todo-content' }, 0],
        ]
      },
      parseDOM: [{
        priority: 51,
        tag: `[data-type="${this.name}"]`,
        getAttrs: dom => ({
          done: dom.getAttribute('data-done') === 'true',
        }),
      }],
    }
  }

  keys({ type }) {
    return {
      Enter: splitToDefaultListItem(type),
      Tab: this.options.nested ? sinkListItem(type) : () => {},
      'Shift-Tab': liftListItem(type),
    }
  }

}
