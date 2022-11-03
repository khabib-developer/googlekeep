/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useState } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import MenuIcon from "@mui/icons-material/Menu";
import DragHandleOutlinedIcon from "@mui/icons-material/DragHandleOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import { Context } from "../../context";

const Search = styled("form")(({ theme }) => ({
  position: "relative",
  backgroundColor: "#f1f3f4",
  border: "0.5px solid transparent",
  borderRadius: "8px",
  marginRight: "164px",
  height: "46px",
  display: "flex",
  alignItems: "center",
  [theme.breakpoints.up("sm")]: {
    width: "50%",
  },
  transition: "background 100ms ease-in,width 100ms ease-out",
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  marginLeft: "56px",
  marginRight: "49px",
  width: "100%",
}));

const focusedStyles = {
  backgroundColor: "#fff",
  boxShadow:
    "0 1px 1px 0 rgb(65 69 73 / 30%), 0 1px 3px 1px rgb(65 69 73 / 15%)",
};

export default function Navbar() {
  const { setOpen, open } = useContext(Context);
  const [focus, setFocus] = useState(false);

  return (
    <Box
      sx={{
        flexGrow: 1,
        height: "64px",
        boxShadow: "inset 0 -1px 0 0 #dadce0",
      }}
    >
      <Box sx={{ display: "flex", p: "8px", alignItems: "center" }}>
        <Box
          sx={{
            display: "flex",
            minWidth: "232px",
            alignItems: "center",
            color: "text.primary",
            paddingLeft: "16px",
          }}
        >
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
            onClick={() => setOpen(!open)}
          >
            <MenuIcon />
          </IconButton>
          <Typography component="span" sx={{ fontSize: "22px" }}>
            Keep
          </Typography>
        </Box>

        <Search sx={focus ? focusedStyles : {}}>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            onFocus={() => setFocus(true)}
            onBlur={() => setFocus(false)}
            placeholder={"Search"}
            inputProps={{ "aria-label": "search" }}
          />
        </Search>

        <Box>
          <IconButton
            size="large"
            aria-label="show more"
            aria-haspopup="true"
            color="inherit"
          >
            <DragHandleOutlinedIcon />
          </IconButton>
          <IconButton
            size="large"
            aria-label="show more"
            aria-haspopup="true"
            color="inherit"
          >
            <SettingsOutlinedIcon />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
}
