import { Box, Modal } from "@mui/material";
import moment from "moment";
import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Context } from "../../context";
import { INote } from "../../interfaces";
import { NoteBody } from "../Notes/noteBody";
import { Tools } from "../Tool";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  borderRadius: "8px",
  boxShadow: 24,
  transition: "all 0.13s ease",
};

export const NoteModal = () => {
  const { notes } = useContext(Context);
  const location = useLocation();
  const navigate = useNavigate();
  const [note, setNote] = useState<null | INote>(null);

  const [notification, setNotification] = useState(false);

  useEffect(() => {
    if (location.hash !== "") {
      const noteId = location.hash.slice(1);
      const note = notes.find((n) => n.id === +noteId);
      if (note) setNote(note);
      else navigate(``);
      return;
    }
    setNote(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location, notes]);

  const handleClose = () => {
    navigate(`${location.pathname}`);
    setNote(null);
  };
  return (
    <div>
      <Modal
        open={!!note}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {note && (
            <Box
              sx={{
                bgcolor: note.backgroundColor
                  ? note.backgroundColor
                  : "background.default",
                border: `1px solid ${
                  note.backgroundColor || "background.default"
                }`,
                borderRadius: "8px",
              }}
            >
              <Box
                sx={{
                  backgroundImage:
                    note.backgroundImageUrl &&
                    `url(${process.env.PUBLIC_URL}/images/${note.backgroundImageUrl})`,
                  borderRadius: "8px",
                  backgroundPositionX: "right",
                  backgroundPositionY: "bottom",
                  backgroundSize: "cover",
                }}
              >
                <NoteBody
                  setNotification={setNotification}
                  note={note}
                  modal={true}
                />
              </Box>

              <Tools
                setOpen={() => {}}
                note={note}
                notification={notification}
                setNotification={setNotification}
              />
            </Box>
          )}
        </Box>
      </Modal>
    </div>
  );
};
