import { render, html } from 'https://cdn.jsdelivr.net/npm/uhtml/preactive.js'

import './pages/page-list.js'
import './pages/page-single.js'

function shouldNotIntercept(navigationEvent) {
  return (
    !navigationEvent.canIntercept ||
    navigationEvent.hashChange ||
    navigationEvent.downloadRequest ||
    navigationEvent.formData
  )
}

const root = document.querySelector('#root')

const loadListPage = () => {
  render(root, () => html`<page-list />`)
}

const loadSinglePage = (id) => {
  render(root, () => html`<page-single id=${id} />`)
}

const getPageLoader = url => {
  const matchSingle = url.pathname.match(/\/(.+)/)

  if (matchSingle) {
    const id = matchSingle[1]
    return () => loadSinglePage(id)
  } else {
    return () => loadListPage()
  }
}

navigation.addEventListener('navigate', navigateEvent => {
  if (shouldNotIntercept(navigateEvent)) {
    return
  }
  
  const url = new URL(navigateEvent.destination.url)

  navigateEvent.intercept({ handler: getPageLoader(url) })
})

const loader = getPageLoader(new URL(window.location.href))

loader()
