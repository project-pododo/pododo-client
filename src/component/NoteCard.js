import React, { useState } from "react";
import { Collapse, Button, Input, Switch } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import "../css/CustomStyle.css";

const { Panel } = Collapse;

function NoteCard({ note, onDelete, onUpdate }) {
  const [title, setTitle] = useState(note.title);
  const [content, setContent] = useState(note.content);
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [isEditingContent, setIsEditingContent] = useState(false);

  const handleTitleChange = (e) => setTitle(e.target.value);
  const handleContentChange = (e) => setContent(e.target.value);
  const isOverdue = note.dateRange && dayjs().isAfter(dayjs(note.dateRange[1]));

  const saveTitle = () => {
    setIsEditingTitle(false);
    onUpdate(note.id, { ...note, title });
  };

  const saveContent = () => {
    setIsEditingContent(false);
    onUpdate(note.id, { ...note, content });
  };

  const handleSwitchChange = (checked, e) => {
    e.stopPropagation(); // Collapse 동작방지.
    onUpdate(note.id, { ...note, isCompleted: checked });
  };

  if (!note) {
    return <div style={{ fontSize: 24 }}>No note available</div>;
  }

  return (
    <Collapse
      accordion={false}
      style={{
        backgroundColor: note.isCompleted ? "#D5F5E3" : "#9B59B6", // 완료된 경우 색상 변경
      }}
    >
      <Panel
        header={
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <Switch
                checkedChildren="완료"
                unCheckedChildren="미완료"
                checked={note.isCompleted}
                onChange={handleSwitchChange}
                size="large"
                className="ant-switch02"
              />
              {isEditingTitle ? (
                <Input
                  value={title}
                  onChange={handleTitleChange}
                  onBlur={saveTitle}
                  autoFocus
                />
              ) : (
                <div
                  onClick={() => setIsEditingTitle(true)}
                  style={{
                    textDecoration: note.isCompleted ? "line-through" : "none",
                    color: note.isCompleted
                      ? "#7D7D7D"
                      : isOverdue
                      ? "red"
                      : "inherit",
                  }}
                >
                  {title}
                </div>
              )}
            </div>
            {note.dateRange && (
              <p
                style={{
                  color: "#fff",
                  fontSize: "14px",
                  marginTop: "8px",
                  marginBottom: "8px",
                  marginRight: "10px",
                  minWidth: "258px",
                }}
              >
                📅 {dayjs(note.dateRange[0]).format("YYYY-MM-DD HH:mm")} ~{" "}
                {dayjs(note.dateRange[1]).format("YYYY-MM-DD HH:mm")}
              </p>
            )}
          </div>
        }
        key={note.id}
        extra={
          <Button
            type="text"
            danger
            onClick={() => onDelete(note.id)}
            className="button-hover-effect"
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
          {isEditingContent ? (
            <Input.TextArea
              value={content}
              onChange={handleContentChange}
              onBlur={saveContent}
              autoSize={{ minRows: 2, maxRows: 6 }}
              autoFocus
            />
          ) : (
            <p onClick={() => setIsEditingContent(true)}>{content}</p>
          )}
        </div>
      </Panel>
    </Collapse>
  );
}

export default NoteCard;
