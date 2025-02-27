import React, { useState } from "react";
import { Collapse, Button, Input, Dropdown, Menu } from "antd";
import { MoreOutlined, SearchOutlined } from "@ant-design/icons";
import dayjs from "dayjs";

const { Panel } = Collapse;

function RubbishList({ rubbish, onRestore }) {
  const [searchText, setSearchText] = useState("");

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
        <Collapse
          accordion={false}
          // style={{
          //   width: "100%",
          //   // marginBottom: "8px",
          //   backgroundColor: "#9B59B6",
          // }}
        >
          {filteredRubbish.map((note, index) => {
            const restoreMenu = (
              <Menu>
                <Menu.Item onClick={() => onRestore(note.id)}>복원</Menu.Item>
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
                          // color: "gray",
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
