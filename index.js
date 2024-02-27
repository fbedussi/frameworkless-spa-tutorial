import {render, html} from 'https://cdn.jsdelivr.net/npm/uhtml/preactive.js'

import './pages/page-list.js'

const root = document.querySelector('#root')

render(root, () => html`<page-list />`)

