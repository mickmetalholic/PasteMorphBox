import { create } from 'zustand'

type InputStore = {
  input: string
  setInput: (input: string) => void
}

export const useInputStore = create<InputStore>((set) => ({
  input: '',
  setInput: (input) => set({ input }),
}))
