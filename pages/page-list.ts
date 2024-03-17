import { render, html, signal } from 'uhtml/preactive'
import {notes, addNote, delNote} from '../data.ts'
import {css} from '../css.ts'

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
          onsubmit=${(ev: SubmitEvent) => {
            ev.preventDefault()

            addNote({
              title: ((ev.target as HTMLFormElement)[0] as HTMLInputElement).value,
              text: ((ev.target as HTMLFormElement)[1] as HTMLTextAreaElement).value,
            });
            ((ev.target as HTMLFormElement)[0] as HTMLInputElement).value = '';
            ((ev.target as HTMLFormElement)[1] as HTMLTextAreaElement).value = '';
          }}
        >
          <input
            type="text"
            placeholder="my note"
          />

          <textarea />

          <button type="submit">add note</button>
        </form>

        <input type="search" onkeyup=${(e: KeyboardEvent) => searchTerm.value = (e.target as HTMLInputElement).value.toLocaleLowerCase()} />

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
                  <footer>
                    <a href=${note.id}>
                      Read more    
                    </a>
                  </footer>
                </article>
              `)}
        </div>
      </main>
    `
  },
)
