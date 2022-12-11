import { useRouter } from "next/router";
import React from "react";
import { useState, useEffect } from "react";
import MainContent from "../../components/main-content/MainContent";
import NoteCard from "../../components/NoteCard";
import Sidebar from "../../components/sidebar/Sidebar";
import { useAuthContext } from "../../context/AuthContext";
import { useNotesContext } from "../../context/NotesContext";
import { Note } from "../../utils/types";

function Home() {
  const { notes } = useNotesContext();
  const { isLoggedIn } = useAuthContext();

  const router = useRouter();

  const defaultNote: Note = {
    title: "",
    description: "",
    note_id: "",
    user_id: "",
  };

  const [currentNote, setCurrentNote] = useState<Note>(defaultNote);

  //if not logged in redirect to login page
  useEffect(() => {
    if (!isLoggedIn) {
      router.push("/auth/login");
    }
  }, [isLoggedIn]);

  return (
    <div>
      {/* Header */}

      {/* Body */}
      <div className="flex">
        <Sidebar allNotes={notes} />
        <MainContent {...currentNote} />
      </div>
      {/* Footer */}
    </div>
  );
}

export default Home;
