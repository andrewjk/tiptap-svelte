import { Node } from '../../../tiptap-svelte/src/index.js'
import TableNodes from './TableNodes'

export default class TableCell extends Node {

  get name() {
    return 'table_cell'
  }

  get schema() {
    return TableNodes.table_cell
  }

}
