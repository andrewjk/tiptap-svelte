import { Doc } from "../../../../tiptap-svelte/src/index.js";

export default class CustomDoc extends Doc {

  get schema() {
    return {
      content: 'title block+',
    }
  }

}
