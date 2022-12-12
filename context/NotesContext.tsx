import {
  useContext,
  createContext,
  useState,
  useEffect,
  Dispatch,
  SetStateAction,
  useCallback,
} from "react";
import { useAuthContext } from "./AuthContext";
import NotesService from "../services/NotesService";
import TokenService from "../utils/TokenService";
import { Note } from "../utils/types";
import { debounce } from "../utils/Debounce";

interface NotesContextInitialData {
  notes: Note[];
  currentNote: Note | null;
  setCurrentNote: Dispatch<SetStateAction<Note>>;
  setCurrNote: (note_id: string) => void;
  createNewNote: () => void;
  deleteNote: (note_id: string) => void;
  updateNote: (name: string, value: string) => void;
  setCurrentNoteData: (name: string, value: string) => void;
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
  const [currentNote, setCurrentNote] = useState<Note>({} as Note);

  function fetchAllNotes(token: string) {
    NotesService.fetchAllNotes(token)
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

  function createNewNote() {
    const token = TokenService.getToken();
    if (token) {
      NotesService.createNewNote(token)
        .then((res) => {
          console.log(res.data._id);
          fetchAllNotes(token as string);
          setFirstCurrentNote();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  const setFirstCurrentNote = useCallback(() => {
    if (notes && notes.length > 0) setCurrNote(notes[0].note_id);
  }, [notes]);

  function deleteNote(note_id: string) {
    const token = TokenService.getToken();
    if (token != null) {
      NotesService.deleteNote(note_id, token)
        .then((res) => {
          console.log(res);
          fetchAllNotes(token as string);
        })
        .catch((err) => {});
    }
  }

  function updateNote(name: string, value: string) {
    const token = TokenService.getToken();
    if (token) {
      NotesService.updatNote(currentNote.note_id, token, name, value)
        .then((res) => {
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  //Updates the values of current note on typing in the MainContent
  function setCurrentNoteData(name: string, value: string) {
    setCurrentNote((prev) => ({ ...prev, [name]: value }));
    const currNoteIndex = notes.findIndex(
      (elem) => elem.note_id == currentNote.note_id
    );
    if (name === "title") notes[currNoteIndex].title = value;
    if (name === "description") notes[currNoteIndex].description = value;
  }

  //updates the current note on clicking the sidebar
  function setCurrNote(note_id: string) {
    const foundNote = notes.find((elem) => {
      return elem.note_id == note_id;
    });
    if (foundNote) {
      setCurrentNote(foundNote);
    }
  }

  useEffect(() => {
    const token = TokenService.getToken();
    if (token) {
      fetchAllNotes(token);
      // if (notes.length > 0) setCurrNote(notes[0].note_id);
      setFirstCurrentNote();
    }
  }, []);

  return (
    <NotesContext.Provider
      value={{
        notes,
        currentNote,
        setCurrNote,
        createNewNote,
        deleteNote,
        updateNote,
        setCurrentNote,
        setCurrentNoteData,
      }}
    >
      {children}
    </NotesContext.Provider>
  );
};
