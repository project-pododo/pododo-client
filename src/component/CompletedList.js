import React, { useEffect, useState, useMemo } from "react";
import { Collapse, Button, Dropdown, Menu, Input, message, Switch } from "antd";
import { MoreOutlined, SearchOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import axios from "axios";

const { Panel } = Collapse;

function CompletedList() {
  const [notes, setNotes] = useState([]);
  const [searchText, setSearchText] = useState("");

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
          //   isCompleted: true,
        }));
        setNotes(formattedData);
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      console.error("Error fetching completed notes:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete("/api/v1/todo", {
        data: { todoMstId: id },
      });
      if (response.status === 200 && response.data.code === "10003") {
        message.success(response.data.message);
        fetchCompletedNotes();
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      message.error("삭제 중 오류가 발생했습니다.");
    }
  };

  const filteredNotes = useMemo(() => {
    return notes.filter((note) =>
      note.title.toLowerCase().includes(searchText.toLowerCase())
    );
  }, [notes, searchText]);

  return (
    <div style={{ padding: 20, margin: "0 auto" }}>
      <h2>완료된 항목</h2>
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
        <Collapse accordion={false}>
          {filteredNotes.map((note) => {
            const deleteMenu = (
              <Menu>
                <Menu.Item onClick={() => handleDelete(note.id)} danger>
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
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "20px",
                      }}
                    >
                      <Switch
                        checkedChildren="완료"
                        unCheckedChildren="미완료"
                        checked={note.isCompleted}
                        size="large"
                        className="ant-switch02"
                      />
                      <div
                        style={{
                          color: "#7D7D7D",
                          fontSize: "16px",
                          fontWeight: "bold",
                        }}
                      >
                        {note.title}
                      </div>
                    </div>
                    {note.endDate && (
                      <p
                        style={{
                          color: "#000",
                          fontSize: "16px",
                          marginTop: "8px",
                          marginBottom: "8px",
                          marginRight: "10px",
                          minWidth: "258px",
                        }}
                      >
                        완료일: {note.endDate.format("YYYY-MM-DD HH:mm")}
                      </p>
                    )}
                  </div>
                }
                key={note.id}
                extra={
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                    }}
                  >
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
                  </div>
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
