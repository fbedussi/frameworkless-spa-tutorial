import { render, html } from 'uhtml/preactive'

import './pages/page-list.ts'
import './pages/page-single.ts'

function shouldNotIntercept(navigationEvent: any) {
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

const loadSinglePage = (id: string) => {
  render(root, () => html`<page-single id=${id} />`)
}

const getPageLoader = (url: URL) => {
  const matchSingle = url.pathname.match(/\/(.+)/)

  if (matchSingle) {
    const id = matchSingle[1]
    return () => loadSinglePage(id)
  } else {
    return () => loadListPage()
  }
}

declare global {
  const navigation: any
}

navigation.addEventListener('navigate', (navigateEvent: any) => {
  if (shouldNotIntercept(navigateEvent)) {
    return
  }
  
  const url = new URL(navigateEvent.destination.url)

  navigateEvent.intercept({ handler: getPageLoader(url) })
})

const loader = getPageLoader(new URL(window.location.href))

loader()
