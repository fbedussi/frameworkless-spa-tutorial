// @ts-ignore
import { signal } from 'https://cdn.jsdelivr.net/npm/uhtml/preactive.js'


const STORAGE_KEY = 'notes'

const savedDataJson = window.localStorage.getItem(STORAGE_KEY)

/**
 * @type {Note[]}
 */
const savedData = savedDataJson ? JSON.parse(savedDataJson) : []

/**
 * @type {Signal<Note[]>}
 */
export const notes = signal(savedData)

/**
 * @param {Note[]} data 
 */
const saveUpdatedData = async data => {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
}

/**
 * @param {AddNotePayload} note 
 */
export const addNote = async (note) => {
  const updatedData = await notes.value.concat({
    id: crypto.randomUUID(),
    ...note,
  })
  notes.value = updatedData
  saveUpdatedData(updatedData)
}

/**
 * @param {string} id 
 */
export const delNote = async (id) => {
  const updatedData = await notes.value.filter(note => note.id !== id)
  notes.value = updatedData
  saveUpdatedData(updatedData)
}

/**
 * @param {string} id 
 */
export const getNote = (id) => {
  return Promise.resolve(notes.value.find(note => note.id === id))
}

/**
 * @param {Note} note 
 */
export const updateNote = async (note) => {
  const updatedData = await notes.value.map(oldNote => oldNote.id === note.id ? note : oldNote)
  notes.value = updatedData
  saveUpdatedData(updatedData)
}
