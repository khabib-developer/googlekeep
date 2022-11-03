import * as React from "react";

import {
  Box,
  Button,
  Divider,
  IconButton,
  List,
  ListItemButton,
  NativeSelect,
} from "@mui/material";

import { useEffect, useRef, useState } from "react";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import TextField from "@mui/material/TextField";
import moment from "moment";

import { Context } from "../../context";
import { nextWeek, today, tommorrow } from "../../constans";
import { INotification } from "../../interfaces";

interface INotificationComponent {
  id: number;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Notification: React.FC<INotificationComponent> = ({
  id,
  open,
  setOpen,
}) => {
  const { setNotes, notes } = React.useContext(Context);

  const note = notes.find((note) => note.id === id)!;

  const notification = useRef<null | HTMLDivElement>(null);

  const [date, setDate] = React.useState(
    moment(Date.now() + 86400 * 1000).format("YYYY-MM-DD")
  );
  const [time, setTime] = React.useState("08:00");

  const [repeat, setRepeat] = React.useState("0");

  const [error, setError] = useState(false);

  const [secondPiece, setSecondPiece] = useState(false);

  const late = new Date().getHours() >= 20;

  useEffect(() => {
    function handleListener(e: any) {
      if (e.target && !notification.current?.contains(e.target)) {
        setOpen(false);
      }
      if (
        note?.notification &&
        document
          .querySelector(`.notificationChip_${note.id}`)
          ?.contains(e.target)
      ) {
        setOpen(true);
      }
    }
    if (notification) {
      window.addEventListener("click", handleListener);
    }

    return () => {
      window.removeEventListener("click", handleListener);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [notification]);

  const handleChoose = (date: number) => {
    setNotes(note.id, "notification", {
      repeated: null,
      date,
    } as INotification);
    setOpen(false);
  };

  const handleSave = () => {
    if (Date.now() > Date.parse(`${date} ${time}`)) {
      setError(true);
      return;
    }
    setError(false);
    setNotes(id, "notification", {
      repeated: Number(repeat),
      date: Date.parse(`${date} ${time}`),
    } as INotification);
    setOpen(false);
  };

  return (
    <div className={`icon notification_${id}`} ref={notification}>
      <IconButton onClick={() => setOpen(true)}>
        <NotificationsOutlinedIcon fontSize="small" />
      </IconButton>

      <Box
        className="menu"
        sx={{
          display: open ? (!secondPiece ? "block" : "none") : "none",
          bgcolor: "background.default",
          width: "300px",
        }}
      >
        <Box className="item">Notification:</Box>
        <List>
          {!late && (
            <ListItemButton
              onClick={() => handleChoose(today)}
              className="listItem"
            >
              <span>Today</span>
              <span>20:00</span>
            </ListItemButton>
          )}

          <ListItemButton
            onClick={() => handleChoose(tommorrow)}
            className="listItem"
          >
            <span>Tomorrow</span>
            <span>08:00</span>
          </ListItemButton>
          <ListItemButton
            onClick={() => handleChoose(nextWeek)}
            className="listItem"
          >
            <span>Next Week</span>
            <span>M, 08:00</span>
          </ListItemButton>
          <ListItemButton
            className="listItem"
            onClick={() => setSecondPiece(true)}
          >
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <AccessTimeIcon fontSize="small" sx={{ pr: 1 }} /> Select date and
              time
            </Box>
          </ListItemButton>
        </List>
      </Box>

      <Box
        className="menu"
        sx={{
          display: open ? (secondPiece ? "block" : "none") : "none",
          bgcolor: "background.default",
          width: "300px",
        }}
      >
        <Box
          className="item"
          sx={{
            display: "flex",
            alignItems: "center",
            p: "0 !important",
          }}
        >
          <IconButton sx={{ pr: 1 }} onClick={() => setSecondPiece(false)}>
            <ArrowBackIcon fontSize="small" />
          </IconButton>
          <span>Select date and time</span>
        </Box>
        <Divider />

        <Box sx={{ display: "flex", px: "15px", flexDirection: "column" }}>
          <div className="otherTime">
            <TextField
              error={error}
              type="date"
              value={date}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setDate(moment(e.target.value).format("YYYY-MM-DD"));
              }}
              sx={{ width: "100%" }}
              variant="standard"
            />
          </div>
          <div className="otherTime">
            <TextField
              error={error}
              value={time}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setTime(e.target.value);
              }}
              type="time"
              sx={{ width: "100%" }}
              variant="standard"
            />
          </div>
          <div className="otherTime">
            <NativeSelect
              sx={{ width: "100%" }}
              value={repeat}
              onChange={(e) => setRepeat(e.target.value)}
            >
              <option value={0}>No repeat</option>
              <option value={86400 * 1000}>Every Day</option>
              <option value={86400 * 1000 * 7}>Every Week</option>
              <option value={86400 * 1000 * 7 * 30}>Every Month</option>
            </NativeSelect>
          </div>
          <Box sx={{ pt: 1, display: "flex", justifyContent: "end" }}>
            <Button onClick={handleSave} color="inherit">
              Save
            </Button>
          </Box>
        </Box>
      </Box>
    </div>
  );
};
