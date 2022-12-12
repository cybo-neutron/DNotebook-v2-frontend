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
    <div className="bg-gradient-to-tl from-zinc-900 via-zinc-900 to-zinc-800 w-4/12 h-screen flex flex-col">
      <button
        className="bg-gradient-to-l from-lime-600 to-lime-500 rounded-sm my-2 mx-2 "
        onClick={createNewNote}
      >
        New note
      </button>
      <hr className="mb-1" />

      {/* notes section  */}
      <div className=" h-full overflow-y-scroll">
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
        className="bg-red-600 mx-2 rounded-sm mt-auto mb-2 hover:bg-red-500 font-bold text-zinc-100"
        onClick={logout}
      >
        Logout
      </button>
    </div>
  );
}

export default Sidebar;
