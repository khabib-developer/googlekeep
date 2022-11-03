import { Box } from "@mui/material";
import { useContext } from "react";
import { Context } from "../../context";
import { Note } from "../Notes/note";

export const Basket = () => {
  const { notes } = useContext(Context);

  const deletedNotes = notes
    .filter((note) => note.deleted)
    .sort((a, b) => a.id - b.id);
  return (
    <Box>
      <Box>
        {deletedNotes.length !== 0 ? (
          <Box>
            <Box sx={{ display: "flex", flexWrap: "wrap" }}>
              {deletedNotes.map((note) => (
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
            Basket
          </Box>
        )}
      </Box>
    </Box>
  );
};
