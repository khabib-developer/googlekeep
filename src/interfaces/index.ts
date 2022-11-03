import { themeMode } from "../constans";

export interface IContext {
  theme: themeMode.dark | themeMode.light;
  open: boolean;
  selectedMenu: number;
  notes: INote[];
  labels: ILabel[];
  note_labels: IThrough[];

  setNoteLabels(noteId: number, labelId: number, remove?: boolean): void;
  createNote(note: INote): void;
  setLabels: (
    id: number,
    text: string,
    create?: boolean,
    remove?: boolean
  ) => void;
  setNotes: (id: number, field: string, value: any, def?: boolean) => void;
  setSelectedNumber: (index: number) => void;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setDarkTheme: (darkTheme: boolean) => void;
}

export interface INote {
  id: number;
  createdAt: number;
  updatedAt: number;
  notification: null | INotification;
  title: string;
  description: string;
  pin: boolean;
  archived: boolean;
  deleted: boolean;
  backgroundImageUrl: string | null;
  backgroundColor: string | null;
}

export interface ILabel {
  id: number;
  text: string;
}

export interface IThrough {
  id: number;
  labelId: number;
  noteId: number;
}

export interface INotification {
  date: number;
  repeated: number | null;
}
