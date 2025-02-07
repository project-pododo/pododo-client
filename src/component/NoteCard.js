import React from "react";
import { Card, Button } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import dayjs from "dayjs";

function NoteCard({ note, onDelete }) {
  if (!note) {
    return <div style={{ fontSize: 24 }}>No note available</div>;
  }

  return (
    <Card
      title={note.title}
      extra={
        <Button type="text" danger onClick={() => onDelete(note.id)}>
          <DeleteOutlined />
        </Button>
      }
      style={{ width: "100%" }}
    >
      <p>{note.content}</p>
      {note.dateRange && (
        <p style={{ color: "gray", fontSize: "12px", marginTop: "8px" }}>
          📅 {dayjs(note.dateRange[0]).format("YYYY-MM-DD HH:mm")} ~{" "}
          {dayjs(note.dateRange[1]).format("YYYY-MM-DD HH:mm")}
        </p>
      )}
    </Card>
  );
}

export default NoteCard;
