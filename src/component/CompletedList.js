import React from "react";
import { Collapse, Button, Dropdown, Menu } from "antd";
import { MoreOutlined } from "@ant-design/icons";
import dayjs from "dayjs";

const { Panel } = Collapse;

function CompletedList({ notes, onDelete }) {
  // 현재 날짜보다 이전에 등록된 완료된 항목 필터링
  const pastCompletedNotes = notes.filter(
    (note) => note.isCompleted && dayjs(note.dateRange[1]).isBefore(dayjs())
  );

  return (
    <div style={{ padding: 20, margin: "0 auto" }}>
      <h2>완료된 항목 (과거 날짜)</h2>
      {pastCompletedNotes.length > 0 ? (
        <Collapse accordion>
          {pastCompletedNotes.map((note) => {
            const deleteMenu = (
              <Menu>
                <Menu.Item onClick={() => onDelete(note.id)} danger>
                  삭제
                </Menu.Item>
              </Menu>
            );

            return (
              <Panel
                header={
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      width: "100%",
                    }}
                  >
                    <div style={{ fontWeight: "bold" }}>{note.title}</div>
                    <p
                      style={{
                        color: "gray",
                        fontSize: "14px",
                        margin: 0,
                      }}
                    >
                      완료일:{" "}
                      {dayjs(note.dateRange[1]).format("YYYY-MM-DD HH:mm")}
                    </p>
                  </div>
                }
                key={note.id}
                extra={
                  <Dropdown
                    overlay={deleteMenu}
                    trigger={["hover"]}
                    placement="bottomLeft"
                    arrow
                  >
                    <Button
                      type="text"
                      icon={<MoreOutlined />}
                      onClick={(e) => e.stopPropagation()}
                    />
                  </Dropdown>
                }
              >
                <div style={{ padding: "10px", backgroundColor: "#F4E6F1" }}>
                  <p style={{ whiteSpace: "pre-line" }}>{note.content}</p>
                </div>
              </Panel>
            );
          })}
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
