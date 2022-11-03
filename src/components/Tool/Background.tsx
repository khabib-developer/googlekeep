import { Box, IconButton } from "@mui/material";
import { useContext, useEffect, useRef, useState } from "react";
import ColorLensOutlinedIcon from "@mui/icons-material/ColorLensOutlined";
import DoNotDisturbIcon from "@mui/icons-material/DoNotDisturb";
import { bgImages, colors } from "../../constans";
import { Context } from "../../context";
export const Background: React.FC<{ id: number }> = ({ id }) => {
  const { notes, setNotes } = useContext(Context);
  const [open, setOpen] = useState(false);
  const ref = useRef<null | HTMLDivElement>(null);
  const note = notes.find((note) => note.id === id);
  useEffect(() => {
    if (open) {
      document.body.addEventListener("click", (event: any) => {
        if (event.target && !ref?.current?.contains(event.target)) {
          setOpen(false);
        }
      });
    }
  }, [open]);

  return (
    <div className="icon" ref={ref}>
      <IconButton onClick={() => setOpen(true)}>
        <ColorLensOutlinedIcon fontSize="small" />
      </IconButton>
      <Box
        sx={{
          display: open ? "flex" : "none",
          bgcolor: "background.default",
          flexDirection: "column",
          borderRadius: "10px",
          boxShadow:
            "0 1px 2px 0 rgb(60 64 67 / 30%), 0 2px 6px 2px rgb(60 64 67 / 15%)",
          position: "absolute",
          width: "auto",
        }}
      >
        <Box sx={{ display: "flex", p: "8px 9px 3px" }}>
          {colors.map((color, i) => (
            <Box
              key={i}
              className={`colorItem ${
                color === note?.backgroundColor && "selected"
              }`}
              onClick={() => setNotes(id, "backgroundColor", color)}
              sx={{
                background: `${color} !important`,
                borderColor: `${color} !important`,
              }}
            >
              {color === null && <DoNotDisturbIcon />}
            </Box>
          ))}
        </Box>

        <Box sx={{ display: "flex", p: "5px" }}>
          {bgImages.map((image, i) => (
            <Box
              key={i}
              onClick={() => setNotes(id, "backgroundImageUrl", image)}
              className={`colorItem image ${
                image === note?.backgroundImageUrl && "selected"
              }`}
              sx={{
                backgroundImage: `url(${process.env.PUBLIC_URL}/images/${image})`,
              }}
            >
              {image === null && <DoNotDisturbIcon />}
            </Box>
          ))}
        </Box>
      </Box>
    </div>
  );
};
