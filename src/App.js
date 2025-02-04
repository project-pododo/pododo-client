import "./App.css";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import { Layout, Menu } from "antd";
import {
  FormOutlined,
  UnorderedListOutlined,
  CreditCardOutlined,
} from "@ant-design/icons";
import Form from "./component/NoteForm";
import List from "./component/NoteList";
import Card from "./component/NoteCard";

const { Content, Sider } = Layout;

function App() {
  return (
    <BrowserRouter>
      <Layout style={{}}>
        <Sider width={200} className="site-layout-background">
          <Menu
            mode="inline"
            defaultSelectedKeys={["1"]}
            style={{ height: "100%" }}
          >
            <Menu.Item key="1" icon={<FormOutlined />}>
              <Link to="/">NoteForm</Link>
            </Menu.Item>
            <Menu.Item key="2" icon={<UnorderedListOutlined />}>
              <Link to="/list">NoteList</Link>
            </Menu.Item>
            <Menu.Item key="3" icon={<CreditCardOutlined />}>
              <Link to="/card">NoteCard</Link>
            </Menu.Item>
          </Menu>
        </Sider>

        <Layout style={{ padding: "0 24px 24px" }}>
          <Content
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
              height: "100%",
            }}
          >
            <Routes>
              <Route path="/" element={<Form />} />
              <Route path="/list" element={<List />} />
              <Route path="/card" element={<Card />} />
            </Routes>
          </Content>
        </Layout>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
