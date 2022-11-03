import { Box, Chip } from "@mui/material";
import moment from "moment";
import { useContext } from "react";
import { Context } from "../../context";
import { ILabel, INote } from "../../interfaces";

import AccessTimeIcon from "@mui/icons-material/AccessTime";
import RepeatIcon from "@mui/icons-material/Repeat";

export const Chips: React.FC<{
  note: INote;
  belongLabels: ILabel[];
  setNotification: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ note, belongLabels, setNotification }) => {
  const { setNotes, setNoteLabels } = useContext(Context);

  const handleClick = () => setNotification(true);

  const handleDelete = () => setNotes(note.id, "notification", null);

  return (
    <Box sx={{ p: "5px 10px" }}>
      {note.notification && (
        <Chip
          className={`notificationChip_${note.id}`}
          sx={{ p: "3px 5px", fontSize: "11px", height: "24px" }}
          label={`${moment(note.notification.date).format("MMM Do, HH:MM")}`}
          icon={
            note.notification.repeated ? (
              <RepeatIcon fontSize="small" />
            ) : (
              <AccessTimeIcon fontSize="small" />
            )
          }
          onClick={handleClick}
          onDelete={handleDelete}
        />
      )}
      {belongLabels.map((label) => (
        <Chip
          key={label.id}
          className="fucking"
          sx={{ p: "3px 5px", fontSize: "11px", height: "24px" }}
          label={label.text}
          onClick={handleClick}
          onDelete={() => setNoteLabels(note.id, label.id, true)}
        />
      ))}
    </Box>
  );
};
