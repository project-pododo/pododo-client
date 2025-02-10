import React from "react";
import { Collapse, Button } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import "../css/CustomStyle.css";

const { Panel } = Collapse;

function NoteCard({ note, onDelete }) {
  if (!note) {
    return <div style={{ fontSize: 24 }}>No note available</div>;
  }

  return (
    <Collapse
      accordion={false}
      style={{
        width: "100%",
        // marginBottom: "8px",
        backgroundColor: "#9B59B6",
      }}
    >
      <Panel
        header={note.title}
        key={note.id}
        extra={
          <Button
            type="text"
            danger
            onClick={() => onDelete(note.id)}
            style={{ color: "#6A3D9D", backgroundColor: "#F4E6F1" }}
          >
            <DeleteOutlined />
          </Button>
        }
      >
        <div
          className="ant-collapse-content"
          style={{
            backgroundColor: "#F4E6F1",
          }}
        >
          <p>{note.content}</p>
          {note.dateRange && (
            <p style={{ color: "gray", fontSize: "12px", marginTop: "8px" }}>
              📅 {dayjs(note.dateRange[0]).format("YYYY-MM-DD HH:mm")} ~{" "}
              {dayjs(note.dateRange[1]).format("YYYY-MM-DD HH:mm")}
            </p>
          )}
        </div>
      </Panel>
    </Collapse>
  );
}

export default NoteCard;
