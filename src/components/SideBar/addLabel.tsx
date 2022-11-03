import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import {
  Box,
  DialogActions,
  DialogContent,
  Divider,
  IconButton,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CheckIcon from "@mui/icons-material/Check";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { FormEvent, useContext, useEffect, useRef, useState } from "react";
import { Context } from "../../context";
export const AddLabel: React.FC<{
  modal: boolean;
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ modal, setModal }) => {
  const [create, setCreate] = useState("");
  const { labels, setLabels } = useContext(Context);
  const ref = useRef<null | HTMLInputElement>(null);

  const [error, setError] = useState(false);

  const handleCreate = (event: FormEvent<HTMLElement>) => {
    event.preventDefault();
    if (create.trim() !== "") {
      if (labels.find((label) => label.text === create)) return setError(true);
      setError(false);
      setLabels(Date.now(), create.trim(), true);
      setCreate("");
    }
  };

  useEffect(() => {
    if (modal)
      setTimeout(() => {
        ref.current?.focus();
      });
  }, [modal]);

  const [id, setId] = useState<null | number>(null);

  return (
    <div>
      <Dialog maxWidth="xs" open={modal} onClose={() => setModal(false)}>
        <DialogContent sx={{ p: "15px" }}>
          <Box sx={{ width: "270px" }}>
            <span>Change Shortcuts</span>

            <Box
              component={"form"}
              onSubmit={() => console.log("Success")}
              sx={{ display: "flex", alignItems: "center", height: "45px" }}
            >
              <IconButton size="small">
                <AddIcon fontSize="small" />
              </IconButton>
              <input
                ref={ref}
                className="createLabel"
                type="text"
                value={create}
                onChange={(e) => setCreate(e.target.value)}
                placeholder="Create label"
              />
              <IconButton type="submit" onClick={handleCreate} size="small">
                <CheckIcon fontSize="small" />
              </IconButton>
            </Box>

            {error && (
              <Typography
                color="error"
                sx={{ fontSize: "0.8rem", fontStyle: "italic" }}
              >
                This shortcut already exists
              </Typography>
            )}

            {labels
              .sort((a, b) => b.id - a.id)
              .map((label) => (
                <Box
                  key={label.id}
                  onSubmit={handleCreate}
                  sx={{ display: "flex", alignItems: "center", height: "45px" }}
                >
                  <IconButton onClick={() => setId(label.id)} size="small">
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                  <input
                    className="createLabel"
                    type="text"
                    placeholder="Enter label name"
                    id={`${label.id}_label`}
                    value={label.text}
                    onChange={(e) => setLabels(label.id, e.target.value)}
                  />
                  <IconButton size="small">
                    <label htmlFor={`${label.id}_label`}>
                      <EditIcon fontSize="small" />
                    </label>
                  </IconButton>
                </Box>
              ))}
          </Box>

          <Divider />
          <Box sx={{ pt: 1, display: "flex", justifyContent: "end" }}>
            <Button
              sx={{ px: 2 }}
              color="inherit"
              onClick={() => setModal(false)}
            >
              Ready
            </Button>
          </Box>
        </DialogContent>

        <Dialog maxWidth="xs" open={Boolean(id)} onClose={() => setId(null)}>
          <DialogContent sx={{ p: "24px", pb: "10px" }}>
            The label will be removed. It will disappear from all notes, while
            the notes themselves will be saved.
            <DialogActions>
              <Button size="small" color="inherit" onClick={() => setId(null)}>
                Cancel
              </Button>
              <Button
                size="small"
                color="inherit"
                onClick={() => {
                  setLabels(id!, "", false, true);
                  setId(null);
                }}
                autoFocus
              >
                Delete
              </Button>
            </DialogActions>
          </DialogContent>
        </Dialog>
      </Dialog>
    </div>
  );
};
