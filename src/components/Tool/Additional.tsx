import {
  Box,
  Checkbox,
  IconButton,
  List,
  ListItemButton,
  Typography,
} from "@mui/material";
import { useContext, useEffect, useRef, useState } from "react";
import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import { Context } from "../../context";
export const Additional = ({ id }: { id: number }) => {
  const { note_labels, labels, setNoteLabels, setLabels } = useContext(Context);

  const ref = useRef<null | HTMLDivElement>(null);

  const [open, setOpen] = useState(false);

  const [label, setLabel] = useState("");

  const [addLabel, setAddLabel] = useState(false);

  const [possibleLabels, setPossibleLabels] = useState(labels);

  const handleAdd = (labelId: number) => {
    const isHave = note_labels.find(
      (label) => label.labelId === labelId && label.noteId === id
    );
    setNoteLabels(id, labelId, Boolean(isHave));
  };

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setLabel(value);
    if (value.trim() === "") {
      setPossibleLabels(labels);
    } else {
      setPossibleLabels(labels.filter((l) => l.text.includes(value)));
    }
  };

  const handleCreate = () => {
    if (label.trim() !== "") {
      const newLabel = { id: Date.now(), text: label };
      setLabels(newLabel.id, label, true);
      setLabel("");
      setPossibleLabels([...labels, newLabel]);
    }
  };

  useEffect(() => {
    if (open) {
      document.body.addEventListener("click", (event: any) => {
        if (event.target && !ref?.current?.contains(event.target)) {
          setOpen(false);
          setAddLabel(false);
        }
      });
    }
  }, [open]);

  return (
    <div className="icon" ref={ref}>
      <IconButton onClick={() => setOpen(true)}>
        <MoreVertOutlinedIcon fontSize="small" />
      </IconButton>
      <Box
        className="menu"
        sx={{
          py: 1,
          borderRadius: 2,
          display: open ? "block" : "none",
          bgcolor: "background.default",
          width: "225px",
        }}
      >
        <List sx={{ py: 0, display: !addLabel ? "block" : "none" }}>
          <ListItemButton
            onClick={() => setAddLabel(true)}
            className="listItem additional"
          >
            Add Label
          </ListItemButton>
        </List>
        <Box
          sx={{
            fontSize: "smaller",
            mb: 1,
            display: addLabel ? "block" : "none",
          }}
        >
          <Typography sx={{ px: 1 }}>Add Label</Typography>
          <Box sx={{ display: "flex", px: 1, alignItems: "center" }}>
            <input
              placeholder="Enter label name"
              className="note"
              value={label}
              onChange={handleInput}
              style={{ height: "25px", padding: "2px", fontSize: "small" }}
            />
            <SearchIcon fontSize="small" />
          </Box>

          <Box sx={{ py: "6px" }}>
            <Box>
              <List sx={{ p: 0 }}>
                {possibleLabels.map((label) => (
                  <ListItemButton
                    key={label.id}
                    sx={{ p: 0, px: 1 }}
                    onClick={() => handleAdd(label.id)}
                  >
                    <label>
                      <Checkbox
                        sx={{ p: 0, pr: 1 }}
                        size="small"
                        color="default"
                        checked={
                          !!note_labels
                            .filter((lab) => lab.labelId === label.id)
                            .find((lab) => lab.noteId === id)
                        }
                        name={label.text}
                      />
                      <span>{label.text}</span>
                    </label>
                  </ListItemButton>
                ))}
              </List>
            </Box>
          </Box>

          <Box
            sx={{
              borderTop: "1px solid #dadce0",
              cursor: "pointer",
              display: !labels.find((l) => l.text === label) ? "flex" : "none",
              alignItems: "center",
              pt: "5px",
              px: 1,
              mt: 1,
            }}
            onClick={handleCreate}
          >
            <AddIcon fontSize="small" />
            <Typography sx={{ fontSize: "0.8rem", pl: 1 }}>
              Create label <span style={{ fontWeight: 800 }}>"{label}"</span>
            </Typography>
          </Box>
        </Box>
      </Box>
    </div>
  );
};
