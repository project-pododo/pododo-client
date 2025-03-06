import React, { useEffect, useState } from "react";
import { BackTop, message } from "antd";
import NoteCard from "./NoteCard";
import dayjs from "dayjs";
import axios from "axios";

function NoteList({ onDelete, onUpdate, onOverdueChange }) {
  const [notes, setNotes] = useState([]);
  const [completedNotes, setCompletedNotes] = useState([]);

  // 투두 조회
  const fetchNotes = async () => {
    try {
      const response = await axios.get("/api/v1/todo");

      if (response.data && response.data.code === "10000") {
        const formattedNotes = response.data.data.map((item) => ({
          id: item.todoMstId,
          isCompleted: item.todoStatus === "DONE",
          title: item.todoName,
          content: item.todoDetail,
          dateRange: [dayjs(item.startDate), dayjs(item.endDate)],
        }));
        setNotes(formattedNotes);
      } else {
        message.error(
          response.data.message || "리스트를 불러오는 데 실패했습니다."
        );
      }
    } catch (error) {
      message.error("할 일 목록을 불러오는 중 오류 발생.");
      console.error("Error:", error);
    }
  };

  // 완료 조회
  const fetchCompletedNotes = async () => {
    const today = dayjs().format("YYYY-MM-DD");
    // const startDate = today;
    const startDate = "2025-01-01";
    const endDate = today;

    try {
      const response = await axios.get(`/api/v1/todo/completed`, {
        params: { startDate, endDate },
      });

      if (response.data && response.data.code === "10000") {
        const formattedCompletedNotes = response.data.data.map((item) => ({
          id: item.todoMstId,
          isCompleted: item.todoStatus === "DONE",
          title: item.todoName,
          content: item.todoDetail,
          dateRange: [dayjs(item.startDate), dayjs(item.endDate)],
        }));
        setCompletedNotes(formattedCompletedNotes);
      } else {
        message.error(
          response.data.message || "완료된 목록을 불러오는 데 실패했습니다."
        );
      }
    } catch (error) {
      message.error("완료된 목록을 불러오는 중 오류 발생.");
      console.error("Error:", error);
    }
  };

  // 페이지 로드 시 api호출
  useEffect(() => {
    fetchNotes();
    fetchCompletedNotes();
  }, []);

  // 투두 업데이트 API
  const handleUpdate = async (updatedNote) => {
    try {
      const response = await axios.put("/api/v1/todo", {
        todoMstId: updatedNote.id,
        todoName: updatedNote.title,
        todoDetail: updatedNote.content,
        startDate: updatedNote.dateRange[0].format("YYYY-MM-DD HH:mm"),
        endDate: updatedNote.dateRange[1].format("YYYY-MM-DD HH:mm"),
      });

      if (response.data && response.data.code === "10002") {
        message.success(response.data.message);
        await fetchNotes();
        await fetchCompletedNotes();
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      message.error("API 호출 중 오류 발생.");
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
      {notes.length > 0 ? (
        notes.map((note) => (
          <NoteCard
            key={note.id}
            note={note}
            onDelete={onDelete}
            onUpdate={handleUpdate}
            onOverdueChange={onOverdueChange}
            fetchNotes={fetchNotes}
            fetchCompletedNotes={fetchCompletedNotes}
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
            fetchNotes={fetchNotes}
            fetchCompletedNotes={fetchCompletedNotes}
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
