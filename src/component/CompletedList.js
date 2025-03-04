import React, { useEffect, useState, useMemo } from "react";
import { Collapse, Button, Dropdown, Menu, Input, message } from "antd";
import { MoreOutlined, SearchOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import axios from "axios";

const { Panel } = Collapse;

function CompletedList({ onDelete }) {
  const [notes, setNotes] = useState([]);
  const [searchText, setSearchText] = useState("");

  // 완료된 항목 조회 API 호출
  useEffect(() => {
    fetchCompletedNotes();
  }, []);

  const fetchCompletedNotes = async () => {
    try {
      const response = await axios.get(
        "/api/v1/todo/completed?startDate=&endDate="
      );

      if (response.status === 200 && response.data.code === "10000") {
        const formattedData = response.data.data.map((item) => ({
          id: item.todoMstId,
          title: item.todoName,
          content: item.todoDetail,
          startDate: dayjs(item.startDate),
          endDate: dayjs(item.endDate),
        }));
        setNotes(formattedData);
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      console.error("Error fetching completed notes:", error);
    }
  };

  // 검색 적용
  const filteredNotes = useMemo(() => {
    return notes.filter((note) =>
      note.title.toLowerCase().includes(searchText.toLowerCase())
    );
  }, [notes, searchText]);

  return (
    <div style={{ padding: 20, margin: "0 auto" }}>
      <h2>완료된 항목 (과거 날짜)</h2>
      <Input.Search
        placeholder="검색어 입력"
        prefix={<SearchOutlined />}
        allowClear
        enterButton="검색"
        size="large"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        style={{ marginBottom: 20 }}
      />

      {filteredNotes.length > 0 ? (
        <Collapse accordion>
          {filteredNotes.map((note) => {
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
                      완료일: {note.endDate.format("YYYY-MM-DD HH:mm")}
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
