import { useState } from "react";
import { defaultCreatedObj } from "../constans";
import { INote, IThrough } from "../interfaces";

export const useNote = () => {
  const [notes, setNote] = useState<INote[]>([defaultCreatedObj]);

  const [note_labels, setNote_labels] = useState<IThrough[]>([]);

  const setNoteLabels = (noteId: number, labelId: number, remove: boolean) => {
    if (remove)
      return setNote_labels((prev) => [
        ...prev.filter(
          (lab) => !(lab.labelId === labelId && lab.noteId === noteId)
        ),
      ]);
    setNote_labels((prev) => [...prev, { id: Date.now(), noteId, labelId }]);
  };

  const setNotes = (id: number, field: string, value: any) => {
    setNote((prev) => [
      ...prev.filter((note) => note.id !== id),
      {
        ...prev.find((note) => note.id === id)!,
        [field]: value,
        updatedAt: Date.now(),
      },
    ]);
  };

  const createNote = () => {
    const note = notes.find((note) => note.id === 0)!;
    if (
      note.notification ||
      note.title.trim() !== "" ||
      note.description.trim() !== ""
    )
      setNote((prev) => [
        ...prev.filter((n) => n.id !== 0),
        defaultCreatedObj,
        { ...note, id: Date.now(), createdAt: Date.now() },
      ]);
  };
  return { notes, setNotes, note_labels, setNoteLabels, createNote };
};
