import { signal } from 'https://cdn.jsdelivr.net/npm/uhtml/preactive.js'

const STORAGE_KEY = 'notes'

const savedData = window.localStorage.getItem(STORAGE_KEY)
export const notes = signal(savedData ? JSON.parse(savedData) : [])

const saveUpdatedData = async data => {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
}

export const addNote = async (note) => {
  const updatedData = await notes.value.concat({
    id: crypto.randomUUID(),
    ...note,
  })
  notes.value = updatedData
  saveUpdatedData(updatedData)
}

export const delNote = async (id) => {
  const updatedData = await notes.value.filter(note => note.id !== id)
  notes.value = updatedData
  saveUpdatedData(updatedData)
}

export const getNote = (id) => {
  return Promise.resolve(notes.value.find(note => note.id === id))
}
