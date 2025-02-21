import React, { useState } from "react";
import { Input, Button, Card, DatePicker, message, Spin } from "antd";
import dayjs from "dayjs";
import weekday from "dayjs/plugin/weekday";
import localeData from "dayjs/plugin/localeData";

dayjs.extend(weekday);
dayjs.extend(localeData);

const { TextArea } = Input;
const { RangePicker } = DatePicker;

function NoteForm({ onAdd }) {
  const defaultStart = dayjs();
  const defaultEnd = dayjs().add(24, "hour");

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [dateRange, setDateRange] = useState([defaultStart, defaultEnd]);
  const [loading, setLoading] = useState(false);

  const handleAdd = () => {
    if (!title.trim()) {
      message.warning("제목을 입력해주세요. - CD");
      return;
    }

    if (!content.trim()) {
      message.warning("내용을 입력해주세요.");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      const finalDateRange = dateRange || [defaultStart, defaultEnd];

      onAdd(title, content, finalDateRange);
      message.success("일정이 추가되었습니다.");
      setTitle("");
      setContent("");
      setDateRange([defaultStart, defaultEnd]);
      setLoading(false);
    }, 1500); //임시로 로딩시간 1.5초 세팅. api 적용 후 제거.
  };

  return (
    <Card
      style={{
        marginBottom: 16,
        borderColor: "#6A0DAD",
        backgroundColor: "#F3E5F5",
      }}
    >
      <div style={{ display: "flex", gap: "8px", marginBottom: "8px" }}>
        <Input
          placeholder="제목을 입력하세요"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{ flex: 1, borderColor: "#6A0DAD" }}
        />
        <RangePicker
          showTime
          value={dateRange}
          onChange={(dates) =>
            setDateRange(dates || [defaultStart, defaultEnd])
          }
          style={{ width: "300px", borderColor: "#6A0DAD" }}
        />
      </div>
      <TextArea
        placeholder="노트 내용을 입력하세요."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        autoSize={{ minRows: 2, maxRows: 6 }}
      />
      <div style={{ marginTop: 8, width: "100%", textAlign: "center" }}>
        <Spin spinning={loading} tip="Loading...">
          <Button
            type="primary"
            onClick={handleAdd}
            style={{
              marginTop: 8,
              width: "100%",
              backgroundColor: "#6A0DAD",
              borderColor: "#6A0DAD",
            }}
            loading={loading}
          >
            추가하기
          </Button>
        </Spin>
      </div>
    </Card>
  );
}

export default NoteForm;
