import React from "react";
import { Row, Col } from "antd";
import NoteCard from "./NoteCard";

function NoteList({ notes, onDelete }) {
  return (
      <div style={{ padding: 20, maxWidth: "800px", margin: "0 auto" }}>
        {notes.length > 0 ? (
          notes
            .filter((note) => note !== null && note !== undefined)
            .map((note) => <NoteCard key={note.id} note={note} onDelete={onDelete} />)
        ) : (
          <div style={{ fontSize: 16, textAlign: "center", width: "100%" }}>
            "No Notes available"
          </div>
        )}
      </div>
    );
  }

export default NoteList;
