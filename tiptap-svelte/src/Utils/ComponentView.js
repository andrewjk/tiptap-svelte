import { compile } from 'svelte/compiler'

import { getMarkRange } from 'tiptap-utils'

export default class ComponentView {

  constructor(component, {
    editor,
    extension,
    parent,
    node,
    view,
    decorations,
    getPos,
  }) {
    this.component = component
    this.editor = editor
    this.extension = extension
    this.parent = parent
    this.node = node
    this.view = view
    this.decorations = decorations
    this.isNode = !!this.node.marks
    this.isMark = !this.isNode
    this.getPos = this.isMark ? this.getMarkPos : getPos
    this.captureEvents = true
    this.dom = this.createDOM()
    // HACK: We're requiring extension nodes to have an element of class `content-xx` but there should be a better way
    // TODO: Is there a way to get the bound content element out of a component?
    this.contentDOM = this.dom.getElementsByClassName('content-xx')[0]
  }

  createDOM() {
    //const Component = compile(this.component.template);
    const Component = this.component;
    const props = {
      editor: this.editor,
      node: this.node,
      view: this.view,
      getPos: () => this.getPos(),
      decorations: this.decorations,
      selected: false,
      options: this.extension.options,
      updateAttrs: attrs => this.updateAttrs(attrs),
    }

    if (typeof this.extension.setSelection === 'function') {
      this.setSelection = this.extension.setSelection
    }

    // HACK: We're creating this component in a temporary container so that we can get its element
    // TODO: Is there a way to get the element out of the component directly?
    var container = document.createElement('div');
    container.id = Math.floor((Math.random() * 100000) + 1);

    // TODO: Fix the parent, which gets set initially in EditorContent.onMount
    this.vm = new Component({
      target: container, // this.parent
      props
    })

    return container; // this.vm;
  }

  update(node, decorations) {
    if (node.type !== this.node.type) {
      return false
    }

    if (node === this.node && this.decorations === decorations) {
      return true
    }

    this.node = node
    this.decorations = decorations

    this.updateComponentProps({
      node,
      decorations,
    })

    return true
  }

  updateComponentProps(props) {
    if (!this.vm.$set) {
      return
    }

    Object.entries(props).forEach(([key, value]) => {
      var opts = {}
      opts[key] = value
      this.vm.$set(opts)
    })
  }

  updateAttrs(attrs) {
    if (!this.view.editable) {
      return
    }

    const { state } = this.view
    const { type } = this.node
    const pos = this.getPos()
    const newAttrs = {
      ...this.node.attrs,
      ...attrs,
    }
    const transaction = this.isMark
      ? state.tr
        .removeMark(pos.from, pos.to, type)
        .addMark(pos.from, pos.to, type.create(newAttrs))
      : state.tr.setNodeMarkup(pos, null, newAttrs)

    this.view.dispatch(transaction)
  }

  // prevent a full re-render of the svelte component on update
  // we'll handle prop updates in `update()`
  ignoreMutation(mutation) {
    if (!this.contentDOM) {
      return true
    }
    return !this.contentDOM.contains(mutation.target)
  }

  // disable (almost) all prosemirror event listener for node views
  stopEvent(event) {
    if (typeof this.extension.stopEvent === 'function') {
      return this.extension.stopEvent(event)
    }

    const draggable = !!this.extension.schema.draggable

    // support a custom drag handle
    if (draggable && event.type === 'mousedown') {
      const dragHandle = event.target.closest
        && event.target.closest('[data-drag-handle]')
      const isValidDragHandle = dragHandle
        && (this.dom === dragHandle || this.dom.contains(dragHandle))

      if (isValidDragHandle) {
        this.captureEvents = false
        document.addEventListener('dragend', () => {
          this.captureEvents = true
        }, { once: true })
      }
    }

    const isCopy = event.type === 'copy'
    const isPaste = event.type === 'paste'
    const isCut = event.type === 'cut'
    const isDrag = event.type.startsWith('drag') || event.type === 'drop'

    if ((draggable && isDrag) || isCopy || isPaste || isCut) {
      return false
    }

    return this.captureEvents
  }

  selectNode() {
    this.updateComponentProps({
      selected: true,
    })
  }

  deselectNode() {
    this.updateComponentProps({
      selected: false,
    })
  }

  getMarkPos() {
    const pos = this.view.posAtDOM(this.dom)
    const resolvedPos = this.view.state.doc.resolve(pos)
    const range = getMarkRange(resolvedPos, this.node.type)
    return range
  }

  destroy() {
    // TODO: Maybe onDestroy??
    ////this.vm.$destroy()
  }

}
