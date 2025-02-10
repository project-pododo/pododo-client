import React from "react";
import NoteCard from "./NoteCard";

function NoteList({ notes, onDelete }) {
  return (
    <div
      style={{
        padding: 20,
        height: "calc(100vh - 64px)",
        overflowY: "auto",
        margin: "0 auto",
      }}
    >
      {notes.length > 0 ? (
        notes
          .filter((note) => note !== null && note !== undefined)
          .map((note) => (
            <NoteCard key={note.id} note={note} onDelete={onDelete} />
          ))
      ) : (
        <div style={{ fontSize: 16, textAlign: "center", width: "100%" }}>
          "No Notes available"
        </div>
      )}
    </div>
  );
}

export default NoteList;
