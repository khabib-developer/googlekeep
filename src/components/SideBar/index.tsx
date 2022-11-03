import { useContext, useState } from "react";

import { Box, List } from "@mui/material";
import EmojiObjectsOutlinedIcon from "@mui/icons-material/EmojiObjectsOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import ModeEditOutlinedIcon from "@mui/icons-material/ModeEditOutlined";
import ArchiveOutlinedIcon from "@mui/icons-material/ArchiveOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import LabelIcon from "@mui/icons-material/Label";
import { Context } from "../../context";
import { useLocation, useNavigate } from "react-router-dom";
import { AddLabel } from "./addLabel";

import "./style.css";

export const SideBar = () => {
  const { open, labels } = useContext(Context);

  const location = useLocation();

  const pathname = location.pathname;

  const selectedLabel =
    pathname.slice(1, 6) === "label" ? pathname.slice(7, pathname.length) : 1;

  const [openSideBar, setOpenSideBar] = useState(false);

  const navigate = useNavigate();

  const openOnHover = () => {
    if (!open)
      setTimeout(() => {
        setOpenSideBar(true);
      }, 300);
  };

  const closeOnLeave = () => {
    setTimeout(() => {
      setOpenSideBar(false);
    }, 300);
  };

  const [modal, setModal] = useState(false);

  return (
    <Box onMouseEnter={openOnHover} onMouseLeave={closeOnLeave}>
      <List
        sx={{ bgcolor: "background.default" }}
        className={`list listWrapper ${openSideBar ? "open" : ""} ${
          open ? "" : "close"
        } `}
      >
        <li
          className={`${location.pathname === "/home" && "selected"}`}
          onClick={() => navigate("/home")}
        >
          <EmojiObjectsOutlinedIcon />
          <span>Notes</span>
        </li>
        <li
          className={`${location.pathname === "/reminders" && "selected"}`}
          onClick={() => navigate("/reminders")}
        >
          <NotificationsNoneOutlinedIcon />
          <span>Reminder</span>
        </li>
        {labels.map((label) => (
          <li
            key={label.id}
            className={`${+selectedLabel === label.id && "selected"}`}
            onClick={() => navigate(`/label/${label.id}`)}
          >
            <LabelIcon />
            <span>{label.text}</span>
          </li>
        ))}
        <li onClick={() => setModal(true)}>
          <ModeEditOutlinedIcon />
          <span>Changing shortcuts</span>
        </li>
        <li
          className={`${location.pathname === "/archive" && "selected"}`}
          onClick={() => navigate("/archive")}
        >
          <ArchiveOutlinedIcon />
          <span>Archive</span>
        </li>
        <li
          className={`${location.pathname === "/trash" && "selected"}`}
          onClick={() => navigate("/trash")}
        >
          <DeleteOutlineOutlinedIcon />
          <span>Basket</span>
        </li>
      </List>

      <AddLabel modal={modal} setModal={setModal} />
    </Box>
  );
};
