import { Node } from '../../../tiptap-svelte/src/index.js'
import { nodeInputRule } from 'tiptap-commands'

export default class HorizontalRule extends Node {
  get name() {
    return 'horizontal_rule'
  }

  get schema() {
    return {
      group: 'block',
      parseDOM: [{ tag: 'hr' }],
      toDOM: () => ['hr'],
    }
  }

  commands({ type }) {
    return () => (state, dispatch) => dispatch(state.tr.replaceSelectionWith(type.create()))
  }

  inputRules({ type }) {
    return [
      nodeInputRule(/^(?:---|___\s|\*\*\*\s)$/, type),
    ]
  }
}
