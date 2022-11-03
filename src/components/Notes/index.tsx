import { Box, Typography } from "@mui/material";
import { useContext } from "react";
import { Context } from "../../context";
import { Create } from "../Create";
import { Note } from "./note";

export const Notes = () => {
  const { notes } = useContext(Context);
  const note = notes.find((note) => note.id === 0)!;

  const pinnedNotes = notes
    .filter(
      (note) => note.pin && !note.deleted && note.id !== 0 && !note.archived
    )
    .sort((a, b) => a.id - b.id);
  const otherNotes = notes
    .filter(
      (note) => !note.pin && !note.deleted && note.id !== 0 && !note.archived
    )
    .sort((a, b) => a.id - b.id);
  return (
    <Box>
      <Create note={note} />
      <Box>
        {pinnedNotes.length !== 0 && (
          <Box>
            <Typography sx={{ margin: "32px 32px 0px" }}>Pinned</Typography>

            <Box sx={{ display: "flex", flexWrap: "wrap" }}>
              {pinnedNotes.map((note) => (
                <Note key={note.id} note={note} />
              ))}
            </Box>
          </Box>
        )}
        {otherNotes.length !== 0 && (
          <Box>
            <Typography sx={{ margin: "32px 32px 0px" }}>
              Other notes
            </Typography>

            <Box sx={{ display: "flex", flexWrap: "wrap" }}>
              {otherNotes.map((note) => (
                <Note key={note.id} note={note} />
              ))}
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
};
