import { render, html, signal } from 'https://cdn.jsdelivr.net/npm/uhtml/preactive.js'
import {notes, addNote, delNote} from '../data.js'
import {css} from '../css.js'

const searchTerm = signal('')

const TAG = 'page-list'
customElements.define(
  TAG,
  class extends HTMLElement {
    constructor() {
      super()

      css`
        ${TAG} {
          article header {
            display: flex;
            align-items: center;
            justify-content: space-between;
          }
        }
      `
    }

    connectedCallback() {
      render(this, this.render)
    }

    render = () => html`
      <main class="container">
        <form
          onsubmit=${(ev) => {
            ev.preventDefault()

            addNote({
              title: ev.target[0].value,
              text: ev.target[1].value,
            })
            ev.target[0].value = ''
            ev.target[1].value = ''
          }}
        >
          <input
            type="text"
            placeholder="my note"
          />

          <textarea />

          <button type="submit">add note</button>
        </form>

        <input type="search" onkeyup=${e => searchTerm.value = e.target.value.toLocaleLowerCase()} />

        <div>
          ${notes.value
            .filter(note => (note.title + note.text).toLocaleLowerCase().includes(searchTerm.value))
            .map(note => html`
            <article>
              <header>
                <h1>${note.title}</h1>
                <button onclick=${() => delNote(note.id)}>delete</button>
              </header>
              <main>${note.text}</main>
            </article>`)}
        </div>
      </main>
    `
  },
)
