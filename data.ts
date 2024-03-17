import { signal } from 'uhtml/preactive'
import { Note } from './model'

const STORAGE_KEY = 'notes'

const savedData = window.localStorage.getItem(STORAGE_KEY)
export const notes = signal(savedData ? (JSON.parse(savedData) as Note[]) : [])

const saveUpdatedData = async (data: Note[]) => {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
}

export const addNote = async (note: Omit<Note, 'id'>) => {
  const updatedData = await notes.value.concat({
    id: crypto.randomUUID(),
    ...note,
  })
  notes.value = updatedData
  saveUpdatedData(updatedData)
}

export const delNote = async (id: string) => {
  const updatedData = await notes.value.filter(note => note.id !== id)
  notes.value = updatedData
  saveUpdatedData(updatedData)
}

export const getNote = (id: string) => {
  return Promise.resolve(notes.value.find(note => note.id === id))
}

export const updateNote = async (note: Note) => {
  const updatedData = await notes.value.map(oldNote => (oldNote.id === note.id ? note : oldNote))
  notes.value = updatedData
  saveUpdatedData(updatedData)
}
