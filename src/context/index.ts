import { createContext } from "react";
import { themeMode } from "../constans";
import { IContext } from "../interfaces";
function init() {}
export const Context = createContext<IContext>({
  theme: themeMode.dark,
  open: true,
  setOpen: init,
  setDarkTheme: init,
  selectedMenu: 1,
  setSelectedNumber: init,
  notes: [],
  setNotes: init,
  createNote: init,
  labels: [],
  setLabels: init,
  note_labels: [],
  setNoteLabels: init,
});
