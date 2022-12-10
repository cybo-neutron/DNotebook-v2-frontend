import React from "react";
import { useState } from "react";
import MainContent from "../../components/main-content/MainContent";
import NoteCard from "../../components/NoteCard";
import Sidebar from "../../components/sidebar/Sidebar";
import { Note } from "../../utils/types";

function Home() {
  const testNotes: Note[] = [
    {
      title: "title1",
      description: "description1 what a heavy description",
      id: "1",
      user_id: "",
    },
    { title: "title2", description: "description2", id: "2", user_id: "" },
    { title: "title3", description: "description3", id: "3", user_id: "" },
  ];

  const [currentNoteId, setCurrentNoteId] = useState<null | string>(null);

  const defaultNote: Note = {
    title: "",
    description: "",
    id: "",
    user_id: "",
    onSelectNote: onSelectNote,
  };
  const [currentNote, setCurrentNote] = useState<Note>(defaultNote);

  function onSelectNote(id: string) {
    setCurrentNoteId(id);
    setCurrentNote((prev) => testNotes.filter((item) => item.id === id)[0]);
  }

  return (
    <div>
      {/* Header */}

      {/* Body */}
      <div className="flex">
        <Sidebar
          allNotes={testNotes}
          onSelectNote={onSelectNote}
          currentNoteId={currentNoteId}
        />
        <MainContent {...currentNote} />
      </div>
      {/* Footer */}
    </div>
  );
}

export default Home;
