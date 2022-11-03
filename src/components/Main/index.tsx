import { Box } from "@mui/system";
import { useContext } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { Context } from "../../context";
import { Archive } from "../Archive";
import { Basket } from "../Basket";
import { Create } from "../Create";
import { Label } from "../Label";
import { NoteModal } from "../Modal";
import { Notes } from "../Notes";
import { Reminder } from "../Reminder";

export const Main = () => {
  const { open } = useContext(Context);
  return (
    <Box sx={{ flexGrow: 1, px: 4, pl: open ? 0 : "72px" }}>
      {/* <Create /> */}
      <NoteModal />
      <Routes>
        <Route path="/home" element={<Notes />} />
        <Route path="/reminders" element={<Reminder />} />
        <Route path="/label/:name" element={<Label />} />
        <Route path="/archive" element={<Archive />} />
        <Route path="/trash" element={<Basket />} />
        <Route path="*" element={<Navigate replace to="/home" />} />
      </Routes>
    </Box>
  );
};
