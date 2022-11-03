import React from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Box } from "@mui/material";
import { Context } from "./context";
import { useTheme } from "./hooks/useTheme";
import Navbar from "./components/Navbar";
import { themeMode } from "./constans";
import { SideBar } from "./components/SideBar";
import { Main } from "./components/Main";
import { useSideBar } from "./hooks/useSideBar";
import { useNote } from "./hooks/useNote";
import { BrowserRouter as Router } from "react-router-dom";
import { useLabels } from "./hooks/useLabels";

function App() {
  const { theme, setDarkTheme } = useTheme();
  const { open, setOpen, setSelectedNumber, selectedMenu } = useSideBar();
  const { notes, setNotes, note_labels, setNoteLabels, createNote } = useNote();
  const { labels, setLabels } = useLabels();

  const darkTheme = createTheme({
    palette: {
      mode: theme,
      text: {
        ...(theme === themeMode.light
          ? {
              primary: "#5f6368",
            }
          : {
              primary: "#fff",
            }),
      },
    },
  });

  return (
    <Context.Provider
      value={{
        theme,
        setDarkTheme,
        open,
        setOpen,
        selectedMenu,
        setSelectedNumber,
        notes,
        setNotes,
        createNote,
        labels,
        setLabels,
        note_labels,
        setNoteLabels,
      }}
    >
      <ThemeProvider theme={darkTheme}>
        <Router>
          <Box
            sx={{
              minHeight: "100vh",
              bgcolor: "background.default",
              color: "text.primary",
            }}
          >
            <Navbar />
            <Box sx={{ display: "flex" }}>
              <SideBar />
              <Main />
            </Box>
          </Box>
        </Router>
      </ThemeProvider>
    </Context.Provider>
  );
}

export default App;
