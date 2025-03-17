import React, { useEffect, useState } from "react";
import { BackTop, message, Pagination } from "antd";
import NoteCard from "./NoteCard";
import dayjs from "dayjs";
import axios from "axios";

function NoteList({ onDelete, onUpdate, onOverdueChange }) {
  const [notes, setNotes] = useState([]);
  const [completedNotes, setCompletedNotes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [completedCurrentPage, setCompletedCurrentPage] = useState(1);
  const [completedPageSize, setCompletedPageSize] = useState(5);

  useEffect(() => {
    fetchNotes();
    fetchCompletedNotes();
  }, []);

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
        message.error(response.data.message);
      }
    } catch (error) {
      message.error("할 일 목록을 불러오는 중 오류 발생.");
    }
  };

  // 완료 조회
  const fetchCompletedNotes = async () => {
    const today = dayjs().format("YYYY-MM-DD");
    const startDate = "2025-01-01";
    const endDate = today;
    // const startDate = dayjs(today).startOf("day").format("YYYY-MM-DD HH:mm");
    // const endDate = dayjs(today).endOf("day").format("YYYY-MM-DD HH:mm");

    try {
      const response = await axios.get("/api/v1/todo/completed", {
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
        message.error(response.data.message);
      }
    } catch (error) {
      message.error("완료된 목록을 불러오는 중 오류 발생.");
    }
  };

  const paginatedNotes = notes.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );
  const paginatedCompletedNotes = completedNotes.slice(
    (completedCurrentPage - 1) * completedPageSize,
    completedCurrentPage * completedPageSize
  );

  // 페이지 로드 시 api호출
  // useEffect(() => {
  //   fetchNotes();
  //   fetchCompletedNotes();
  // }, []);

  // const expiredCompletedNotes = completedNotes.filter(
  //   (note) =>
  //     note.isCompleted &&
  //     note.dateRange &&
  //     dayjs().diff(dayjs(note.dateRange[1]), "day") >= 1
  // );
  // const expiredCompletedNotesCount = expiredCompletedNotes.length;

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
      {paginatedNotes.length > 0 ? (
        paginatedNotes.map((note) => (
          <NoteCard
            key={note.id}
            note={note}
            onDelete={onDelete}
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
      <Pagination
        current={currentPage}
        pageSize={pageSize}
        total={notes.length}
        onChange={(page, size) => {
          setCurrentPage(page);
          setPageSize(size);
        }}
        showSizeChanger
        onShowSizeChange={(current, size) => setPageSize(size)}
        style={{ textAlign: "center", marginTop: 20 }}
      />

      <h2 style={{ marginTop: 30 }}>완료된 일</h2>
      {paginatedCompletedNotes.length > 0 ? (
        paginatedCompletedNotes.map((note) => (
          <NoteCard
            key={note.id}
            note={note}
            onDelete={onDelete}
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
      <Pagination
        current={completedCurrentPage}
        pageSize={completedPageSize}
        total={completedNotes.length}
        onChange={(page, size) => {
          setCompletedCurrentPage(page);
          setCompletedPageSize(size);
        }}
        showSizeChanger
        onShowSizeChange={(current, size) => setCompletedPageSize(size)}
        style={{ textAlign: "center", marginTop: 20 }}
      />
      <BackTop />
    </div>
  );
}

export default NoteList;
