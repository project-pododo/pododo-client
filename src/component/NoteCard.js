import React from 'react';
import { Card, Button } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';

function NoteCard({ note, onDelete }) {
  if (!note) {
    return <div style={{ fontSize : 24}}>No note available</div>;
  }

  return (
    <Card
      title={note.title}
      extra={
        <Button type="text" danger onClick={() => onDelete(note.id)}>
          <DeleteOutlined />
        </Button>
      }
      style={{ width: '100%' }}
    >
      <p>{note.content}</p>
    </Card>
  );
}

export default NoteCard;
