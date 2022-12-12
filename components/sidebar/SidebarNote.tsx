import React from "react";
import { AiFillDelete } from "react-icons/ai";
import { isPropertyAssignment } from "typescript";
import { useNotesContext } from "../../context/NotesContext";
import { Note } from "../../utils/types";

export type SidebarNoteProps = Note & {
  isActive: boolean;
};

function SidebarNote(props: SidebarNoteProps) {
  const { currentNote, setCurrNote, deleteNote } = useNotesContext();

  return (
    <div
      className={`px-2 py-1 mb-1 mr-[1px] shadow-sm rounded-sm flex justify-between cursor-pointer text-slate-200
      ${
        props.isActive
          ? "bg-zinc-700"
          : "bg-zinc-800 hover:bg-lime-400 hover:text-zinc-900 "
      }
      `}
      onClick={() => {
        if (props.note_id) setCurrNote(props.note_id);
      }}
    >
      <div>
        <div className="font-semibold">
          {props.isActive ? currentNote?.title : props.title}
        </div>
        <div className="font-light text-sm">
          {props.isActive
            ? currentNote?.description.substring(0, 20) + "..."
            : props.description.substring(0, 20) + "..."}
        </div>
      </div>
      <div className="flex items-center">
        <AiFillDelete
          className="hover:text-red-600 text-lg text-zinc-400 cursor-pointer "
          onClick={() => {
            deleteNote(props.note_id);
          }}
        />
      </div>
    </div>
  );
}

export default SidebarNote;
