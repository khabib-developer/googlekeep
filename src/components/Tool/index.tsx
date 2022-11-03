import { Box, Button, IconButton } from "@mui/material";
import ArchiveOutlinedIcon from "@mui/icons-material/ArchiveOutlined";
import UndoOutlinedIcon from "@mui/icons-material/UndoOutlined";
import RedoOutlinedIcon from "@mui/icons-material/RedoOutlined";
import UnarchiveIcon from "@mui/icons-material/Unarchive";

import { Notification } from "./Notification";
import { Background } from "./Background";
import { Additional } from "./Additional";

import "./style.css";
import { useContext } from "react";
import { Context } from "../../context";
import { INote } from "../../interfaces";

interface IToolsComponent {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  note: INote;
  notification: boolean;
  setNotification: React.Dispatch<React.SetStateAction<boolean>>;
  full?: boolean;
}

export const Tools: React.FC<IToolsComponent> = ({
  setOpen,
  note,
  notification,
  setNotification,
  full = true,
}) => {
  const { setNotes } = useContext(Context);

  return (
    <Box sx={{ my: "4px", display: "flex", justifyContent: "space-between" }}>
      <Box sx={{ display: "flex" }}>
        <Notification
          id={note.id}
          open={notification}
          setOpen={setNotification}
        />

        <Background id={note.id} />

        <IconButton
          className="icon "
          onClick={() => setNotes(note.id, "archived", !note.archived)}
        >
          {note.archived ? (
            <UnarchiveIcon fontSize="small" />
          ) : (
            <ArchiveOutlinedIcon fontSize="small" />
          )}
        </IconButton>

        <Additional id={note.id} />

        {full && (
          <>
            <IconButton
              onClick={() => {
                document.execCommand("undo", true, "");
              }}
              className="icon"
            >
              <UndoOutlinedIcon fontSize="small" />
            </IconButton>
            <IconButton
              onClick={() => document.execCommand("redo", true, "")}
              className="icon"
            >
              <RedoOutlinedIcon fontSize="small" />
            </IconButton>
          </>
        )}
      </Box>
      {full && (
        <Box>
          <Button
            sx={{ p: "8px 24px", mr: "15px" }}
            color="inherit"
            onClick={() => setOpen(false)}
          >
            Close
          </Button>
        </Box>
      )}
    </Box>
  );
};
