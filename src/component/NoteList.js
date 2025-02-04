import React from 'react';
import { Row, Col } from 'antd';
import Card from "./NoteCard";

function NoteList({ notes, onDelete }) {
  if (!Array.isArray(notes)) {
    return <div style={{ fontSize : 24}}>No notes available</div>;
  }
  
  return (
    <Row gutter={[16, 16]}>
      {notes.map((note) => (
        <Col xs={24} sm={12} md={8} lg={6} key={note.id}>
          <Card note={note} onDelete={onDelete} />
        </Col>
      ))}
    </Row>
  );
}

export default NoteList;
