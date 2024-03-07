import { render, html, signal } from 'https://cdn.jsdelivr.net/npm/uhtml/preactive.js'
import {delNote, getNote} from '../data.js'

const TAG = 'page-single'
customElements.define(
  TAG,
  class extends HTMLElement {
    constructor() {
      super()
    }

    connectedCallback() {
      this.id = this.getAttribute('id')
      getNote(this.id).then(note => this.note.value = note)
      this.note = signal(null)
      render(this, this.render)
    }

    render = () => html`
      <main class="container">
        <article>
          <header>
            <h1>${this.note.value?.title}</h1>
            <button onclick=${() => delNote(this.note.value.id)}>delete</button>
          </header>
          <main>${this.note.value?.text}</main>
          <footer>
            <a href="/">
              Go back
            </a>
          </footer>
        </article>
      </main>
    `
  },
)
