import React from "react";
import NoteCard from "./NoteCard";

function NoteList({ notes, onDelete, onUpdate }) {
  const pendingNotes = notes.filter((note) => !note.isCompleted);
  const completedNotes = notes.filter((note) => note.isCompleted);

  return (
    <div
      style={{
        padding: 20,
        height: "calc(100vh - 64px)",
        overflowY: "auto",
        margin: "0 auto",
      }}
    >
      <h2>할 일</h2>
      {pendingNotes.length > 0 ? (
        pendingNotes.map((note) => (
          <NoteCard
            key={note.id}
            note={note}
            onDelete={onDelete}
            onUpdate={onUpdate}
          />
        ))
      ) : (
        <div style={{ fontSize: 16, textAlign: "center", width: "100%" }}>
          할 일이 비어 있습니다.
        </div>
      )}
      <h2 style={{ marginTop: 30 }}>완료된 일</h2>
      {completedNotes.length > 0 ? (
        completedNotes.map((note) => (
          <NoteCard
            key={note.id}
            note={note}
            onDelete={onDelete}
            onUpdate={onUpdate}
          />
        ))
      ) : (
        <div style={{ fontSize: 16, textAlign: "center", width: "100%" }}>
          완료된 일이 없습니다.
        </div>
      )}
    </div>
  );
}

export default NoteList;
