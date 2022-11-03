import { Box, Typography } from "@mui/material";
import { useContext } from "react";
import { tommorrow } from "../../constans";
import { Context } from "../../context";
import { Create } from "../Create";
import { Note } from "../Notes/note";

export const Reminder = () => {
  const { notes } = useContext(Context);
  const date = Date.now();

  const note = notes.find((note) => note.id === 0)!;

  const notifications = notes.filter(
    (note) =>
      note.notification && !note.deleted && note.id !== 0 && !note.archived
  );

  const upcoming = notifications
    .filter((n) => n.notification?.date! - date > 0)
    .sort((a, b) => a.id - b.id);
  const sent = notifications
    .filter((n) => n.notification?.date! - date < 0)
    .sort((a, b) => a.id - b.id);

  return (
    <Box>
      <Create
        note={{ ...note, notification: { date: tommorrow, repeated: null } }}
      />

      {upcoming.length !== 0 && (
        <Box>
          <Typography sx={{ margin: "32px 32px 0px" }}>Sent</Typography>
          <Box sx={{ display: "flex", flexWrap: "wrap" }}>
            {upcoming.map((note) => (
              <Note key={note.id} note={note} />
            ))}
          </Box>
        </Box>
      )}
      {sent.length !== 0 && (
        <Box>
          <Typography sx={{ margin: "32px 32px 0px" }}>Upcoming</Typography>
          <Box sx={{ display: "flex", flexWrap: "wrap" }}>
            {sent.map((note) => (
              <Note key={note.id} note={note} />
            ))}
          </Box>
        </Box>
      )}
    </Box>
  );
};
