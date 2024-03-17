import { render, html, signal } from 'uhtml/preactive'
import {delNote, getNote, updateNote} from '../data.ts'
import {css} from '../css.ts'
import { Note } from '../model.ts'

const TAG = 'page-single'
customElements.define(
  TAG,
  class extends HTMLElement {
    noteId: string | null = null
    note = signal<Note | null>(null)
    dirty = signal(false)

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
      this.noteId = this.getAttribute('id')
      this.noteId && getNote(this.noteId).then(note => this.note.value = (note || null))

      render(this, this.render)
    }

    render = () => html`
      <main class="container">
        <form onsubmit=${(ev: SubmitEvent) => {
          ev.preventDefault()

          this.note.value && updateNote({
            ...this.note.value,
            title: ((ev.target as HTMLFormElement)[0] as HTMLInputElement).value,
            text: ((ev.target as HTMLFormElement)[2] as HTMLTextAreaElement).value,
          })
        }}>
          <article>
            <header>
              <h1><input value=${this.note.value?.title} onkeydown=${() => this.dirty.value = true}/></h1>
              <button onclick=${() => this.note.value && delNote(this.note.value.id)}>delete</button>
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
