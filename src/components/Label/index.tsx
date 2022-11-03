import { Box } from "@mui/material";
import { useContext } from "react";
import { useParams } from "react-router-dom";
import { Context } from "../../context";
import { Create } from "../Create";
import { Note } from "../Notes/note";

export const Label = () => {
  const { notes, note_labels } = useContext(Context);

  const note = notes.find((note) => note.id === 0)!;

  const { name } = useParams();

  const labelNotes = note_labels
    .filter((n) => n.labelId === +name!)
    .map((n) => notes.find((note) => note.id === n.noteId)!);

  return (
    <Box>
      <Create note={note} />
      {labelNotes.length !== 0 ? (
        <Box>
          <Box sx={{ display: "flex", flexWrap: "wrap" }}>
            {labelNotes.map((note) => (
              <Note key={note.id} note={note} />
            ))}
          </Box>
        </Box>
      ) : (
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "300px",
          }}
        >
          No notes with this label
        </Box>
      )}
    </Box>
  );
};
