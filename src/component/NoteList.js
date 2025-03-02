import React from "react";
import { BackTop, message } from "antd";
import NoteCard from "./NoteCard";
import dayjs from "dayjs";
import axios from "axios";

function NoteList({ notes, onDelete, onUpdate, onOverdueChange }) {
  const pendingNotes = notes.filter((note) => !note.isCompleted);
  const completedNotes = notes.filter((note) => {
    if (!note.isCompleted || !note.dateRange) return false;
    return dayjs().diff(dayjs(note.dateRange[1]), "day") < 1;
  });

  const handleUpdate = async (updatedNote) => {
    try {
      const response = await axios.put("/api/v1/todo", {
        todoMstId: updatedNote.id,
        todoName: updatedNote.title,
        todoDetail: updatedNote.content,
        startDate: updatedNote.dateRange[0].format("YYYY-MM-DD HH:mm"),
        endDate: updatedNote.dateRange[1].format("YYYY-MM-DD HH:mm"),
      });

      if (response.data && response.data.message) {
        message.success(response.data.message);
        onUpdate(updatedNote);
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      message.error("API 호출 중 오류 발생.");
      console.error("Error:", error);
    }
  };

  return (
    <div
      style={{
        padding: 20,
        height: "calc(100vh - 64px)",
        overflowY: "auto",
        margin: "0 auto",
      }}
    >
      <h2>할 일</h2>
      {pendingNotes.length > 0 ? (
        pendingNotes.map((note) => (
          <NoteCard
            key={note.id}
            note={note}
            onDelete={onDelete}
            onUpdate={handleUpdate}
            onOverdueChange={onOverdueChange}
          />
        ))
      ) : (
        <div style={{ fontSize: 16, textAlign: "center", width: "100%" }}>
          할 일이 비어 있습니다.
        </div>
      )}
      <h2 style={{ marginTop: 30 }}>완료된 일</h2>
      {completedNotes.length > 0 ? (
        completedNotes.map((note) => (
          <NoteCard
            key={note.id}
            note={note}
            onDelete={onDelete}
            onUpdate={handleUpdate}
            onOverdueChange={onOverdueChange}
          />
        ))
      ) : (
        <div style={{ fontSize: 16, textAlign: "center", width: "100%" }}>
          완료된 일이 없습니다.
        </div>
      )}
      <BackTop />
    </div>
  );
}

export default NoteList;
