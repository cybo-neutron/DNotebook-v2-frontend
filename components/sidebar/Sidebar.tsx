import React from "react";
import { useAuthContext } from "../../context/AuthContext";
import { useNotesContext } from "../../context/NotesContext";
import { Note } from "../../utils/types";
import SidebarNote from "./SidebarNote";

type SidebarProps = {
  allNotes: Note[];
};

function Sidebar({ allNotes }: SidebarProps) {
  const { currentNote, createNewNote } = useNotesContext();
  const { logout } = useAuthContext();

  return (
    <div className="bg-gradient-to-tl from-zinc-700 via-zinc-700 to-zinc-600 w-4/12 h-screen flex flex-col">
      <button
        className="bg-gradient-to-l from-lime-600 to-lime-500 rounded-sm my-2 mx-2 "
        onClick={createNewNote}
      >
        New note
      </button>

      {/* notes section  */}
      <div className="overflow-y-scroll">
        {allNotes.map((item: Note) => {
          return (
            <SidebarNote
              key={item.note_id}
              {...item}
              isActive={item.note_id === currentNote?.note_id}
            />
          );
        })}
      </div>

      {/* logout */}
      <button
        className="bg-red-600 mx-2 rounded-sm mt-auto mb-2 hover:bg-red-500"
        onClick={logout}
      >
        Logout
      </button>
    </div>
  );
}

export default Sidebar;
