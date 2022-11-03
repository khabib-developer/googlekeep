import React, { useContext, useEffect, useRef, useState } from "react";

import { Box } from "@mui/material";
import { Tools } from "../Tool";

import "./style.css";
import { Context } from "../../context";
import { NoteBody } from "../Notes/noteBody";
import { INote } from "../../interfaces";

export const Create: React.FC<{ note: INote }> = ({ note }) => {
  const { createNote } = useContext(Context);
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  const [notification, setNotification] = useState(false);

  useEffect(() => {
    function handleListener(e: any) {
      if (e.target && !ref.current?.contains(e.target)) {
        setOpen(false);
      }
    }
    window.addEventListener("click", handleListener);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!open) createNote(note);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  return (
    <Box
      sx={{ display: "flex", justifyContent: "center", pt: "32px", pl: "16px" }}
    >
      <Box
        ref={ref}
        onClick={() => setOpen(true)}
        sx={{
          width: "600px",
          bgcolor: note.backgroundColor
            ? note.backgroundColor
            : "background.default",
          boxShadow:
            "0 1px 2px 0 rgb(60 64 67 / 30%), 0 2px 6px 2px rgb(60 64 67 / 15%)",
          borderRadius: "8px",
          border: `1px solid ${note.backgroundColor || "background.default"}`,
          display: "flex",
          flexDirection: "column",
          transition: "all .3s",
        }}
      >
        <Box sx={{ display: open ? "none" : "flex" }}>
          <input className="note" placeholder="Note..." />
        </Box>

        <Box sx={{ display: !open ? "none" : "flex", width: "100%" }}>
          <NoteBody note={note} setNotification={setNotification} />
        </Box>

        {open && (
          <Tools
            setOpen={() => setOpen((prev) => !prev)}
            note={note}
            notification={notification}
            setNotification={setNotification}
          />
        )}
      </Box>
    </Box>
  );
};
