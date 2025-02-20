import React from "react";
import { Collapse, Button } from "antd";
import { UndoOutlined } from "@ant-design/icons";
import dayjs from "dayjs";

const { Panel } = Collapse;

function RubbishList({ rubbish, onRestore }) {
  return (
    <div style={{ padding: 20, margin: "0 auto" }}>
      <h2>휴지통</h2>
      {rubbish.length > 0 ? (
        <Collapse
          accordion={false}
          style={{
            width: "100%",
            // marginBottom: "8px",
            backgroundColor: "#9B59B6",
          }}
        >
          {rubbish.map((note, index) => (
            <Panel
              header={note.title}
              key={note.id || index}
              extra={
                <Button
                  type="text"
                  onClick={() => onRestore(note.id)}
                  style={{ color: "#6A3D9D", backgroundColor: "#F4E6F1" }}
                >
                  <UndoOutlined /> 복원
                </Button>
              }
            >
              <p style={{ whiteSpace: "pre-line" }}>{note.content}</p>
              {note.dateRange && (
                <p
                  style={{ color: "gray", fontSize: "12px", marginTop: "8px" }}
                >
                  📅 {dayjs(note.dateRange[0]).format("YYYY-MM-DD HH:mm")} ~{" "}
                  {dayjs(note.dateRange[1]).format("YYYY-MM-DD HH:mm")}
                </p>
              )}
            </Panel>
          ))}
        </Collapse>
      ) : (
        <div style={{ fontSize: 16, textAlign: "center", width: "100%" }}>
          휴지통이 비어 있습니다.
        </div>
      )}
    </div>
  );
}

export default RubbishList;
