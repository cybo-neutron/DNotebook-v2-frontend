import React, {
  InputHTMLAttributes,
  TextareaHTMLAttributes,
  useEffect,
  useState,
} from "react";
import CreatableSelect from "react-select/creatable";
import { useNotesContext } from "../../context/NotesContext";
import { Note } from "../../utils/types";

function MainContent(note: Note) {
  const { title, description } = note;
  const { currentNote } = useNotesContext();

  const [noteData, setNoteData] = useState({ title, description });

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setNoteData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  useEffect(() => {
    setNoteData(currentNote ?? { title: "", description: "" });
  }, [currentNote]);

  return (
    <div className="flex flex-1 flex-col bg-zinc-500 gap-y-2">
      {/* Title  */}
      <input
        type="text"
        name="title"
        placeholder="Enter title"
        className="bg-transparent border-b-[1px] outline-none mx-2 text-2xl"
        value={noteData.title}
        onChange={handleChange}
      />
      {/* Tags  */}
      {/* <CreatableSelect isMulti /> */}

      {/* Description  */}
      <textarea
        name="description"
        placeholder="Enter the description here"
        className="flex-1 bg-transparent outline-none mx-2"
        value={noteData.description}
        onChange={handleChange}
      ></textarea>
    </div>
  );
}

export default MainContent;
