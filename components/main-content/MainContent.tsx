import React, {
  InputHTMLAttributes,
  TextareaHTMLAttributes,
  useEffect,
  useState,
  useCallback,
} from "react";
import CreatableSelect from "react-select/creatable";
import { useNotesContext } from "../../context/NotesContext";
import { debounce } from "../../utils/Debounce";
import { Note } from "../../utils/types";

function MainContent(note: Note) {
  const { notes, currentNote, setCurrentNote, setCurrentNoteData, updateNote } =
    useNotesContext();

  let firstRender: boolean = true;

  useEffect(() => {
    if (firstRender) {
      console.log("First render");
      firstRender = false;
    }
  }, [currentNote?.note_id]);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    // setCurrentNote((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setCurrentNoteData(e.target.name, e.target.value);
    debouncedHandleChange(e);
  }

  const debouncedHandleChange = debounce(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      updateNote(e.target.name, e.target.value);
    },
    200
  );

  return (
    <div className="flex flex-1 flex-col bg-zinc-800 text-white gap-y-2 w-full">
      {/* Title  */}
      <input
        type="text"
        name="title"
        placeholder="Enter title"
        className="bg-transparent border-b-[1px] outline-none mx-2 text-2xl font-bold"
        value={currentNote?.title}
        onChange={handleChange}
      />
      {/* Tags  */}
      {/* <CreatableSelect isMulti /> */}

      {/* Description  */}
      <textarea
        name="description"
        placeholder="Enter the description here"
        className="flex-1 bg-transparent outline-none mx-2"
        value={currentNote?.description}
        onChange={handleChange}
      ></textarea>
    </div>
  );
}

export default MainContent;
