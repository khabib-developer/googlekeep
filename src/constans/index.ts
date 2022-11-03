import { INote } from "../interfaces";

export enum themeMode {
  dark = "dark",
  light = "light",
}

export enum menu {
  notification = "notification",
  background = "background",
  menu = "menu",
}

export const defaultCreatedObj: INote = {
  id: 0,
  createdAt: Date.now(),
  updatedAt: Date.now(),
  notification: null,
  pin: false,
  archived: false,
  deleted: false,
  title: "",
  description: "",
  backgroundColor: null,
  backgroundImageUrl: null,
};

export const colors = [
  null,
  "#f28b82",
  "#fbbc04",
  "#fff475",
  "#ccff90",
  "#a7ffeb",
  "#cbf0f8",
  "#aecbfa",
  "#d7aefb",
  "#fdcfe8",
  "#e6c9a8",
  "#e8eaed",
];

export const bgImages = [
  null,
  "1.svg",
  "2.svg",
  "3.svg",
  "4.svg",
  "5.svg",
  "6.svg",
  "7.svg",
  "8.svg",
  "9.svg",
];

export const today =
  Date.parse(new Date(Date.now()).toDateString()) + 3600 * 1000 * 20;

export const tommorrow =
  Date.parse(new Date(Date.now() + 86400 * 1000).toDateString()) +
  +3600 * 1000 * 8;

export const nextWeek =
  Date.parse(new Date(Date.now() + 86400 * 1000 * 7).toDateString()) +
  +3600 * 1000 * 8;
