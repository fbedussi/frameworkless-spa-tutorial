import { signal } from 'https://cdn.jsdelivr.net/npm/uhtml/preactive.js'

const STORAGE_KEY = 'notes'

const savedData = window.localStorage.getItem(STORAGE_KEY)
export const notes = signal(savedData ? JSON.parse(savedData) : [])

const saveUpdatedData = data => {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
}

export const addNote = (note) => {
  const updatedData = notes.value.concat({
    id: crypto.randomUUID(),
    ...note,
  })
  notes.value = updatedData
  saveUpdatedData(updatedData)
}

export const delNote = (id) => {
  const updatedData = notes.value.filter(note => note.id !== id)
  notes.value = updatedData
  saveUpdatedData(updatedData)
}
