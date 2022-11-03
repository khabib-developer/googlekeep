import { Box, TextareaAutosize } from "@mui/material";
import moment from "moment";
import { useContext, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { Context } from "../../context";
import { INote } from "../../interfaces";
import { Chips } from "./chips";
import { Pin } from "./Pin";

const modalTitleStyles = {
  fontWeight: 400,
  fontSize: "1.375rem",
  lineHeight: "1.75rem",
  padding: " 16px 15px 12px",
};

const defaultTitleStyles = {
  minHeight: "23px",
  margin: "10px 15px",
  fontSize: "1rem",
  fontWeight: "500",
};

const modalDescStyles = {
  fontSize: "1rem",
  lineHeight: "1.5rem",
  padding: "4px 16px 12px 16px",
};

const defaultDescStyles = {
  margin: "12px 16px",
  fontSize: "0.875rem",
};

export const NoteBody: React.FC<{
  note: INote;
  setNotification: React.Dispatch<React.SetStateAction<boolean>>;
  modal?: boolean;
}> = ({ note, setNotification, modal }) => {
  const description = useRef<HTMLTextAreaElement | null>(null);

  console.log(note);

  useEffect(() => {
    description.current?.focus();
  }, []);

  const { setNotes, note_labels, labels } = useContext(Context);

  const belongLabels = note_labels
    .filter((lab) => lab.noteId === note.id)
    .map((lab) => labels.find((label) => label.id === lab.labelId)!);

  const location = useLocation();

  if (location.pathname.slice(1, 6) === "label" && note.id === 0) {
    const labelId = location.pathname.slice(7, location.pathname.length);
    const label = labels.find((l) => l.id === +labelId);
    if (label) {
      belongLabels.push(label);
    }
  }

  const handleTitle = (event: React.ChangeEvent<HTMLTextAreaElement>) =>
    setNotes(note.id, "title", event.target.value);

  const handleDescription = (event: React.ChangeEvent<HTMLTextAreaElement>) =>
    setNotes(note.id, "description", event.target.value);
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        borderTopRightRadius: "8px",
        borderTopLeftRadius: "8px",
        transition: "all .3s",
        width: "100%",
        backgroundPositionX: "right",
        backgroundPositionY: "bottom",
        backgroundSize: "cover",
        backgroundImage:
          note.backgroundImageUrl &&
          `url(${process.env.PUBLIC_URL}/images/${note.backgroundImageUrl})`,
      }}
    >
      <Box sx={{ display: "flex" }}>
        <TextareaAutosize
          className={`textarea__${note.id}`}
          style={{
            border: "none",
            outline: "none",
            flexGrow: 1,
            resize: "none",
            background: "transparent",
            ...(modal ? modalTitleStyles : defaultTitleStyles),
          }}
          aria-label="empty textarea"
          placeholder="Enter title"
          onChange={handleTitle}
          value={note.title}
        />

        <Pin note={note} />
      </Box>

      <Box sx={{ display: "flex" }}>
        <TextareaAutosize
          className="textarea"
          style={{
            border: "none",
            outline: "none",
            flexGrow: 1,
            minHeight: "22px",

            fontWeight: "400",
            resize: "none",
            ...(modal ? modalDescStyles : defaultDescStyles),
          }}
          ref={description}
          aria-label="empty textarea"
          placeholder="Note..."
          onChange={handleDescription}
          value={note.description}
        />
      </Box>

      <Chips
        belongLabels={belongLabels}
        note={note}
        setNotification={setNotification}
      />
      {modal && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "end",
            px: 1,
            fontSize: "0.8rem",
            pb: 1,
          }}
        >
          <span>Updated: {moment(note.updatedAt).format("MMM Do, HH:MM")}</span>
        </Box>
      )}
    </Box>
  );
};
