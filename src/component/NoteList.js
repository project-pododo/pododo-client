import React from "react";
import { Row, Col } from "antd";
import NoteCard from "./NoteCard";

function NoteList({ notes, onDelete }) {
  return (
    <div style={{ padding: 20 }}>
      {notes.length > 0 ? (
        <Row gutter={[16, 16]}>
          {notes
            .filter((note) => note !== null && note !== undefined)
            .map((note) => (
              <Col xs={24} sm={12} md={8} lg={6} key={note.id}>
                <NoteCard note={note} onDelete={onDelete} />
              </Col>
            ))}
        </Row>
      ) : (
        <div style={{ fontSize: 16, textAlign: "center", width: "100%" }}>
          "No Notes available"
        </div>
      )}
    </div>
  );
}

export default NoteList;
