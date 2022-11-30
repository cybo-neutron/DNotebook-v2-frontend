import React from "react";

type propsType = {
  title: string;
  description: string;
};

function NoteCard(props: propsType) {
  const { title, description } = props;

  return (
    <div className="bg-blue-500 w-[200px] h-[300px] rounded-sm shadow-lg px-2 ">
      <h1 className="font-bold text-lg ">{title || "Untitled"}</h1>
      <p>{description || ""}</p>
    </div>
  );
}

export default NoteCard;
