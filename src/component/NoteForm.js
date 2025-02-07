import React, { useState } from "react";
import { Input, Button, Card, DatePicker } from "antd";

const { TextArea } = Input;
const { RangePicker } = DatePicker;

function NoteForm({ onAdd }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [dateRange, setDateRange] = useState(null);

  const handleAdd = () => {
    if (!title.trim() || !content.trim() || !dateRange) return;
    onAdd(title, content, dateRange);
    setTitle("");
    setContent("");
    setDateRange(null);
  };

  return (
    <Card style={{ marginBottom: 16 }}>
      <div style={{ display: "flex", gap: "8px", marginBottom: "8px" }}>
        <Input
          placeholder="제목을 입력하세요"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{ flex: 1 }}
        />
        <RangePicker
          showTime
          value={dateRange}
          onChange={(dates) => setDateRange(dates)}
          style={{ width: "300px" }}
        />
      </div>
      <TextArea
        placeholder="노트 내용을 입력하세요."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        autoSize={{ minRows: 2, maxRows: 6 }}
      />
      <Button
        type="primary"
        onClick={handleAdd}
        style={{ marginTop: 8, width: "100%" }}
      >
        추가하기
      </Button>
    </Card>
  );
}

export default NoteForm;
