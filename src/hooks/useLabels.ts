import { useState } from "react";
import { ILabel } from "../interfaces";

export const useLabels = () => {
  const [labels, setlabel] = useState<ILabel[]>([]);

  const setLabels = (
    id: number,
    text: string,
    create: boolean = false,
    remove: boolean = false
  ) => {
    if (remove)
      return setlabel((prev) => [...prev.filter((label) => label.id !== id)]);
    if (create) return setlabel((prev) => [...prev, { id, text }]);
    setlabel((prev) => [
      ...prev.filter((label) => label.id !== id),
      { id, text },
    ]);
  };
  return { labels, setLabels };
};
