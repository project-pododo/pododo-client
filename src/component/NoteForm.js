import React, { useState } from 'react';
import { Input, Button, Card } from 'antd';

const { TextArea } = Input;

function NoteForm({ onAdd }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleAdd = () => {
    if (!title.trim() || !content.trim()) return;
    onAdd(title, content);
    setTitle('');
    setContent('');
  };

  return (
    <Card style={{ marginBottom: 16 }}>
      <Input
        placeholder="제목을 입력하세요"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        style={{ marginBottom: 8 }}
      />
      <TextArea
        placeholder="노트 내용을 입력하세요..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        autoSize={{ minRows: 2, maxRows: 6 }}
      />
      <Button type="primary" onClick={handleAdd} style={{ marginTop: 8, width: '100%' }}>
        추가하기
      </Button>
    </Card>
  );
}

export default NoteForm;
