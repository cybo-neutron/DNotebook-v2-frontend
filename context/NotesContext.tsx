import { useContext, createContext, useState, useEffect } from "react";
import { useAuthContext } from "./AuthContext";
import NotesService from "../services/NotesService";
import TokenService from "../utils/TokenService";
import { Note } from "../utils/types";

interface NotesContextInitialData {
  notes: Note[];
  currentNote: Note | null;
  setCurrNote: (note_id: string) => void;
}

export const NotesContext = createContext<NotesContextInitialData>(
  {} as NotesContextInitialData
);

export const useNotesContext = () => {
  const context = useContext(NotesContext);
  return context;
};

export const NotesProvider = ({ children }: { children: React.ReactNode }) => {
  const { userDetails } = useAuthContext();

  const [notes, setNotes] = useState<Note[]>([]);
  const [currentNote, setCurrentNote] = useState<Note | null>(null);

  function fetchAllNotes(user_id: string, token: string) {
    NotesService.fetchAllNotes(user_id, token)
      .then((res) => {
        setNotes(
          res.data.map((elem: any) => {
            return {
              title: elem.title,
              description: elem.description,
              user_id: elem.user_id,
              note_id: elem._id,
            };
          })
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function setCurrNote(note_id: string) {
    const foundNote = notes.find((elem) => {
      return elem.note_id == note_id;
    });
    if (foundNote) setCurrentNote(foundNote);
  }

  useEffect(() => {
    const token = TokenService.getToken();
    if (token) {
      fetchAllNotes(userDetails.user_id, token);
      if (notes.length > 0) setCurrNote(notes[0].note_id);
    }
  }, []);

  return (
    <NotesContext.Provider value={{ notes, currentNote, setCurrNote }}>
      {children}
    </NotesContext.Provider>
  );
};
