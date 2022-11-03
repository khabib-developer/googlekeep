import { useState } from "react";

export const useSideBar = () => {
  const index = localStorage.getItem("indexMenu")
    ? Number(localStorage.getItem("indexMenu"))
    : 1;
  const [open, setOpen] = useState(true);
  const [selectedMenu, setSelectedIndex] = useState(index);

  const setSelectedNumber = (index: number) => {
    localStorage.setItem("indexMenu", String(index));
    setSelectedIndex(index);
  };

  return { open, setOpen, selectedMenu, setSelectedNumber };
};
