import { Extension, Plugin, PluginKey } from '../../../tiptap-svelte/src/index.js'
import { nodeEqualsType } from 'tiptap-utils'

export default class TrailingNode extends Extension {

  get name() {
    return 'trailing_node'
  }

  get defaultOptions() {
    return {
      node: 'paragraph',
      notAfter: [
        'paragraph',
      ],
    }
  }

  get plugins() {
    const plugin = new PluginKey(this.name)
    const disabledNodes = Object.entries(this.editor.schema.nodes)
      .map(([, value]) => value)
      .filter(node => this.options.notAfter.includes(node.name))

    return [
      new Plugin({
        key: plugin,
        view: () => ({
          update: view => {
            const { state } = view
            const insertNodeAtEnd = plugin.getState(state)

            if (!insertNodeAtEnd) {
              return
            }

            const { doc, schema, tr } = state
            const type = schema.nodes[this.options.node]
            const transaction = tr.insert(doc.content.size, type.create())
            view.dispatch(transaction)
          },
        }),
        state: {
          init: (_, state) => {
            const lastNode = state.tr.doc.lastChild
            return !nodeEqualsType({ node: lastNode, types: disabledNodes })
          },
          apply: (tr, value) => {
            if (!tr.docChanged) {
              return value
            }

            const lastNode = tr.doc.lastChild
            return !nodeEqualsType({ node: lastNode, types: disabledNodes })
          },
        },
      }),
    ]
  }

}
