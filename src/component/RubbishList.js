import React, { useState, useEffect } from "react";
import axios from "axios";
import { Collapse, Button, Input, Dropdown, Menu, message } from "antd";
import { MoreOutlined, SearchOutlined } from "@ant-design/icons";
import dayjs from "dayjs";

const { Panel } = Collapse;

function RubbishList() {
  const [rubbish, setRubbish] = useState([]);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    fetchRubbishList();
  }, []);

  const fetchRubbishList = async () => {
    try {
      const response = await axios.get("/api/v1/todo/rubbish");

      if (response.data.code === "10000") {
        const transformedData = response.data.data.map((item) => ({
          id: item.todoMstId,
          title: item.todoName,
          content: item.todoDetail,
          dateRange: [item.startDate, item.endDate],
        }));
        setRubbish(transformedData);
      }
    } catch (error) {
      message.error("조회 중 오류가 발생했습니다.");
    }
  };

  const handleRestore = async (id) => {
    try {
      const response = await axios.patch("/api/v1/todo/use", { todoMstId: id });

      if (response.data.code === "10004") {
        message.success(response.data.message);
        fetchRubbishList();
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      message.error("복원 중 오류가 발생했습니다.");
    }
  };

  const filteredRubbish = rubbish.filter((note) =>
    note.title.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div style={{ padding: 20, margin: "0 auto" }}>
      <h2>휴지통</h2>
      <Input.Search
        placeholder="Search in Trash"
        prefix={<SearchOutlined />}
        allowClear
        enterButton="Search"
        size="large"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        style={{ marginBottom: 20 }}
      />
      {filteredRubbish.length > 0 ? (
        <Collapse accordion={false}>
          {filteredRubbish.map((note, index) => {
            const restoreMenu = (
              <Menu>
                <Menu.Item onClick={() => handleRestore(note.id)}>
                  복원
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
                    {note.dateRange && (
                      <p
                        style={{
                          fontSize: "14px",
                          margin: 0,
                        }}
                      >
                        {dayjs(note.dateRange[0]).format("YYYY-MM-DD HH:mm")} ~{" "}
                        {dayjs(note.dateRange[1]).format("YYYY-MM-DD HH:mm")}
                      </p>
                    )}
                  </div>
                }
                key={note.id || index}
                extra={
                  <Dropdown
                    overlay={restoreMenu}
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
          휴지통이 비어 있습니다.
        </div>
      )}
    </div>
  );
}

export default RubbishList;
