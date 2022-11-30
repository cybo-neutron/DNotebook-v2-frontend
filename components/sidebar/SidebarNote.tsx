import React from "react";
import { AiFillDelete } from "react-icons/ai";
import { Note, SidebarNoteProps } from "../../utils/types";

function SidebarNote({
  id,
  title,
  description,
  isActive,
  onSelectNote,
}: SidebarNoteProps) {
  return (
    <div
      className={`px-2 py-1 mb-1 mr-[1px] shadow-sm rounded-sm flex justify-between cursor-pointer ${
        isActive ? "bg-lime-700" : "bg-zinc-500 hover:bg-lime-300 "
      }`}
      onClick={() => {
        onSelectNote(id);
      }}
    >
      <div>
        <div className="font-semibold">{title}</div>
        <div className="font-light text-sm">{description.substring(0, 20)}</div>
      </div>
      <div className="flex items-center">
        <AiFillDelete className="hover:text-red-600 text-lg text-zinc-400 cursor-pointer " />
      </div>
    </div>
  );
}

export default SidebarNote;
