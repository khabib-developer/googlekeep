import { IconButton } from "@mui/material";
import { useContext } from "react";
import { Context } from "../../context";
import { INote } from "../../interfaces";
import PushPinOutlinedIcon from "@mui/icons-material/PushPinOutlined";
import PushPinIcon from "@mui/icons-material/PushPin";

export const Pin: React.FC<{ note: INote }> = ({ note }) => {
  const { setNotes } = useContext(Context);
  return (
    <>
      <IconButton
        onClick={() => setNotes(note.id, "pin", false)}
        sx={{
          mx: 1,
          width: "34px",
          height: "34px",
          display: note.pin ? "flex" : "none",
          justifyContent: "center",
        }}
      >
        <PushPinIcon />
      </IconButton>
      <IconButton
        onClick={() => setNotes(note.id, "pin", true)}
        sx={{
          mx: 1,
          width: "34px",
          height: "34px",
          display: !note.pin ? "flex" : "none",
          justifyContent: "center",
        }}
      >
        <PushPinOutlinedIcon />
      </IconButton>
    </>
  );
};
