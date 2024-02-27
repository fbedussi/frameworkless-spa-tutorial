import { render, html, signal } from 'https://cdn.jsdelivr.net/npm/uhtml/preactive.js'

const notes = signal([])

customElements.define(
  'page-list',
  class extends HTMLElement {
    constructor() {
      super()
    }

    connectedCallback() {
      render(this, this.render)
    }

    render = () => html`
      <main class="container">
        <form
          onsubmit=${(ev) => {
            ev.preventDefault()

            notes.value = notes.value.concat({
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
        <div>
          ${notes.value.map(note => html`
            <article>
              <header>
                <h1>${note.title}</h1>
              </header>
              <main>${note.text}</main>
            </article>`)}
        </div>
      </main>
    `
  },
)
