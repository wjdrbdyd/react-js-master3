import { atom, selector } from "recoil";

export interface IToDoState {
  [key: string]: string[];
}

export const toDoState = atom<IToDoState>({
  key: "toDos",
  default: {
    "To Do": ["a", "b"],
    Doing: ["c", "d"],
    Done: ["e", "f"],
  },
});
