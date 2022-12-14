import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";
import { useState, useEffect } from "react";
import MainContent from "../../components/main-content/MainContent";
import LoadingBar from "../../components/misc/LoadingBar";
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

  if (!isLoggedIn) {
    return <LoadingBar />;
  }

  return (
    <div>
      {/* Body */}

      <Head>
        <title>DNotebook</title>
      </Head>
      <div className="flex">
        <Sidebar allNotes={notes} />
        <MainContent {...currentNote} />
      </div>
    </div>
  );
}

export default Home;
