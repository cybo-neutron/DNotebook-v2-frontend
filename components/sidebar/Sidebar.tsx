import React from "react";
import { Note } from "../../utils/types";
import SidebarNote from "./SidebarNote";

type SidebarProps = {
  allNotes: Note[];
  onSelectNote: (id: string) => void;
  currentNoteId: string | null;
};

function Sidebar({ allNotes, onSelectNote, currentNoteId }: SidebarProps) {
  return (
    <div className="bg-gradient-to-tl from-zinc-700 via-zinc-700 to-zinc-600 w-4/12 h-screen flex flex-col">
      <button className="bg-gradient-to-l from-lime-600 to-lime-500 rounded-sm my-2 mx-2 ">
        New note
      </button>

      {/* notes section  */}
      <div>
        {allNotes.map((item: Note) => {
          return (
            <SidebarNote
              key={item.id}
              {...item}
              isActive={item.id === currentNoteId}
              onSelectNote={onSelectNote}
            />
          );
        })}
      </div>

      {/* logout */}
      <button className="bg-red-600 mx-2 rounded-sm mt-auto mb-2 hover:bg-red-500">
        Logout
      </button>
    </div>
  );
}

export default Sidebar;
