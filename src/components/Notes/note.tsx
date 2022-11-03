import { Box } from "@mui/system";
import { useContext, useEffect, useRef, useState } from "react";
import { Tools } from "../Tool";
import { INote } from "../../interfaces";
import { Chips } from "./chips";
import { Pin } from "./Pin";
import { useLocation, useNavigate } from "react-router-dom";
import { Context } from "../../context";
export const Note: React.FC<{ note: INote }> = ({ note }) => {
  const { note_labels, labels } = useContext(Context);
  const [notification, setNotification] = useState(false);
  const [opacity, setOpacity] = useState(1);
  const navigate = useNavigate();
  const location = useLocation();
  const ref = useRef<null | HTMLDivElement>(null);

  useEffect(() => {
    if (location.hash) {
      if (Number(location.hash.slice(1)) === note.id) setOpacity(0);
      else setOpacity(1);
    } else setOpacity(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  const belongLabels = note_labels
    .filter((lab) => lab.noteId === note.id)
    .map((lab) => labels.find((label) => label.id === lab.labelId)!);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    navigate(`#${note.id}`);
  };

  return (
    <Box
      sx={{
        width: "240px",
        border: `1px solid ${note.backgroundColor || "#e0e0e0"}`,
        borderRadius: "8px",
        color: "#000",
        position: "relative",
        m: "16px",
        height: "fit-content",
        cursor: "pointer",
        bgcolor: note.backgroundColor
          ? note.backgroundColor
          : "background.default",
        backgroundImage:
          note.backgroundImageUrl &&
          `url(${process.env.PUBLIC_URL}/images/${note.backgroundImageUrl})`,
        transition: "all .13s ease",
        opacity,
        transform: opacity === 0 ? "scale(1.05)" : "scale(1)",
      }}
    >
      <Box
        ref={ref}
        sx={{ position: "absolute", right: 0, top: 8, zIndex: 100 }}
      >
        <Pin note={note} />
      </Box>
      <Box>
        <div onClick={handleClick}>
          <Box sx={{ padding: "16px 16px 0 16px" }}>{note.title}</Box>
          <Box sx={{ padding: "4px 16px 12px 16px" }}>{note.description}</Box>
        </div>

        <Chips
          note={note}
          belongLabels={belongLabels}
          setNotification={setNotification}
        />

        <Tools
          setOpen={() => {}}
          note={note}
          notification={notification}
          setNotification={setNotification}
          full={false}
        />
      </Box>
    </Box>
  );
};
