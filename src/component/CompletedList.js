import React from "react";
import { Collapse } from "antd";
import dayjs from "dayjs";

const { Panel } = Collapse;

function CompletedList({ notes }) {
  // 현재 날짜보다 이전에 등록된 완료된 항목 필터링
  const pastCompletedNotes = notes.filter(
    (note) => note.isCompleted && dayjs(note.dateRange[1]).isBefore(dayjs())
  );

  return (
    <div style={{ padding: 20, margin: "0 auto" }}>
      <h2>완료된 항목 (과거 날짜)</h2>
      {pastCompletedNotes.length > 0 ? (
        <Collapse accordion>
          {pastCompletedNotes.map((note) => (
            <Panel header={note.title} key={note.id}>
              <p>{note.content}</p>
              <p style={{ color: "gray", fontSize: "12px" }}>
                완료일: {dayjs(note.dateRange[1]).format("YYYY-MM-DD HH:mm")}
              </p>
            </Panel>
          ))}
        </Collapse>
      ) : (
        <div style={{ fontSize: 16, textAlign: "center", width: "100%" }}>
          완료된 과거 항목이 없습니다.
        </div>
      )}
    </div>
  );
}

export default CompletedList;
