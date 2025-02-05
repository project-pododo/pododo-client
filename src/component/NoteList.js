// import React, { useState } from "react";
import React from "react";
import { Row, Col } from "antd";
import NoteCard from "./NoteCard";

function NoteList({ notes, onDelete }) {
  // 샘플 테스트 데이터
  // const [notes, setNotes] = useState([
  //   { id: 1, title: "첫 노트 테스트", content: "내용 테스트." },
  //   {
  //     id: 2,
  //     title: "02 노트 테스트",
  //     content:
  //       "긴 내용 테스트긴 내용 테스트긴 내용 테스트긴 내용 테스트긴 내용 테스트긴 내용 테스트.",
  //   },
  //   { id: 3, title: "03 노트 테스트", content: "내용 테스트03." },
  // ]);

  // const [notes, setNotes] = useState([]);

  // // 노트 추가 함수
  // const handleAddNote = (title, content) => {
  //   const newNote = { id: Date.now(), title, content };
  //   setNotes([...notes, newNote]);
  // };

  // const handleDelete = (id) => {
  //   setNotes(notes.filter((note) => note.id !== id));
  // };
  return (
    <div style={{ padding: 20 }}>
      {/* <NoteForm onAdd={handleAddNote} /> */}
      {notes.length > 0 ? (
        <Row gutter={[16, 16]}>
          {notes.map((note, index) => (
            <Col xs={24} sm={12} md={8} lg={6} key={note.id || index}>
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
