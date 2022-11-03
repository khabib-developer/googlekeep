import { Box, Typography } from "@mui/material";
import { useContext } from "react";
import { Context } from "../../context";
import { Note } from "../Notes/note";
export const Archive = () => {
  const { notes } = useContext(Context);

  const archivedNotes = notes
    .filter((note) => note.id !== 0 && note.archived && !note.deleted)
    .sort((a, b) => a.id - b.id);
  return (
    <Box>
      <Box>
        {archivedNotes.length !== 0 ? (
          <Box>
            <Typography sx={{ margin: "32px 32px 0px" }}>Pinned</Typography>

            <Box sx={{ display: "flex", flexWrap: "wrap" }}>
              {archivedNotes.map((note) => (
                <Note key={note.id} note={note} />
              ))}
            </Box>
          </Box>
        ) : (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              minHeight: "300px",
            }}
          >
            Archived notes will be stored here
          </Box>
        )}
      </Box>
    </Box>
  );
};
