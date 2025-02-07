import React from "react";
import { Row, Col, Card, Button } from "antd";
import { UndoOutlined } from "@ant-design/icons";
import dayjs from "dayjs";

function RubbishList({ rubbish, onRestore }) {
  return (
    <div style={{ padding: 20 }}>
      <h2>휴지통</h2>
      <Row gutter={[16, 16]}>
        {rubbish.length > 0 ? (
          rubbish.map((note, index) => (
            <Col xs={24} sm={12} md={8} lg={6} key={note.id || index}>
              <Card
                title={note.title}
                extra={
                  <Button type="text" onClick={() => onRestore(note.id)}>
                    <UndoOutlined /> 복원
                  </Button>
                }
                style={{ width: "100%", backgroundColor: "#f8d7da" }}
              >
                <p>{note.content}</p>
                {note.dateRange && (
                  <p
                    style={{
                      color: "gray",
                      fontSize: "12px",
                      marginTop: "8px",
                    }}
                  >
                    📅 {dayjs(note.dateRange[0]).format("YYYY-MM-DD HH:mm")} ~{" "}
                    {dayjs(note.dateRange[1]).format("YYYY-MM-DD HH:mm")}
                  </p>
                )}
              </Card>
            </Col>
          ))
        ) : (
          <div style={{ fontSize: 16, textAlign: "center", width: "100%" }}>
            휴지통이 비어 있습니다.
          </div>
        )}
      </Row>
    </div>
  );
}

export default RubbishList;
