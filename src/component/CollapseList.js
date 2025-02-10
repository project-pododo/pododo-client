import React, { useState } from "react";
import { Collapse, DatePicker } from "antd";

const { RangePicker } = DatePicker;

const items = [
  {
    key: "1",
    title: "첫 번째 항목",
    content: "이것은 첫 번째 아이템의 내용입니다.",
  },
  {
    key: "2",
    title: "두 번째 항목",
    content: "이것은 두 번째 아이템의 내용입니다.",
  },
  {
    key: "3",
    title: "세 번째 항목",
    content: "이것은 세 번째 아이템의 내용입니다.",
  },
];

const MyCollapseList = () => {
  const [dates, setDates] = useState(null);

  const onChange = (values) => {
    setDates(values ? [values[0], values[1]] : null);
  };

  return (
    <Collapse accordion>
      {items.map((item) => (
        <Collapse.Panel
          key={item.key}
          header={
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <span>{item.title}</span>
              <RangePicker showTime onChange={onChange} />
            </div>
          }
        >
          <p>{item.content}</p>
        </Collapse.Panel>
      ))}
    </Collapse>
  );
};

export default MyCollapseList;
