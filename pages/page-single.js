import { render, html, signal } from 'https://cdn.jsdelivr.net/npm/uhtml/preactive.js'
import {delNote, getNote, updateNote} from '../data.js'
import {css} from '../css.js'

const TAG = 'page-single'
customElements.define(
  TAG,
  class extends HTMLElement {
    constructor() {
      super()

      css`
        ${TAG} {
          footer {
            display: flex;
            align-items: center;
            justify-content: space-between;
          }
        }
      `
    }

    connectedCallback() {
      this.id = this.getAttribute('id')
      getNote(this.id).then(note => this.note.value = note)
      this.note = signal(null)

      this.dirty = signal(false)
      render(this, this.render)
    }

    render = () => html`
      <main class="container">
        <form onsubmit=${ev => {
          ev.preventDefault()

          updateNote({
            ...this.note.value,
            title: ev.target[0].value,
            text: ev.target[2].value,
          })
        }}>
          <article>
            <header>
              <h1><input value=${this.note.value?.title} onkeydown=${() => this.dirty.value = true}/></h1>
              <button onclick=${() => delNote(this.note.value.id)}>delete</button>
            </header>
            <main>
              <textarea value=${this.note.value?.text} onkeydown=${() => this.dirty.value = true}/>
            </main>
            <footer>
              <a href="/">
                Go back
              </a>
              ${this.dirty.value ? html`<button>save</button>` : null}
            </footer>
          </article>
        </form>
      </main>
    `
  },
)
