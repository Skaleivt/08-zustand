import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { NewNote } from "@/types/note";

type NoteDraftStore = {
  draft: NewNote;
  noteJustCreated: boolean;
  setDraft: (note: NewNote) => void;
  clearDraft: () => void;
  setNoteJustCreated: (value: boolean) => void;
};

const initialDraft: NewNote = {
  title: "",
  content: "",
  tag: "Todo",
};

export const useNoteDraftStore = create<NoteDraftStore>()(
  persist(
    (set) => ({
      draft: initialDraft,
      noteJustCreated: false,
      setDraft: (note) => set({ draft: note }),
      clearDraft: () => set({ draft: initialDraft }),
      setNoteJustCreated: (value: boolean) => set({ noteJustCreated: value }),
    }),
    {
      name: "note-draft",
    }
  )
);
