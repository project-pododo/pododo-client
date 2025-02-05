import "./App.css";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import { Layout, Menu } from "antd";
import {
  FormOutlined,
  UnorderedListOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { useState } from "react";
import NoteForm from "./component/NoteForm";
import NoteList from "./component/NoteList";
import RubbishList from "./component/RubbishList";

const { Content, Sider } = Layout;

function App() {
  const [notes, setNotes] = useState([]);
  const [rubbish, setRubbish] = useState([]);

  const handleAddNote = (title, content) => {
    const newNote = { id: Date.now(), title, content };
    setNotes([...notes, newNote]);
  };

  const handleDelete = (id) => {
    const deleteNote = notes.find((note) => note.id === id);
    if (!deleteNote) return;

    const updateNotes = notes.filter((note) => note.id !== id);
    setNotes([...updateNotes]);

    setRubbish((prevRubbish) => [...prevRubbish, deleteNote]);
    console.log("upodated Note:", updateNotes);
  };

  const handleRestore = (id) => {
    const restoreNote = rubbish.find((note) => note.id === id);
    if (restoreNote) {
      setNotes([...notes, restoreNote]);
      setRubbish(rubbish.filter((note) => note.id !== id));
    }
  };

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
            <Menu.Item
              key="3"
              icon={<DeleteOutlined />}
              style={{ color: "red" }}
            >
              <Link to="/rubbish">휴지통</Link>
            </Menu.Item>
          </Menu>
        </Sider>

        <Layout style={{ padding: "0 24px 24px" }}>
          <Content
            style={{
              padding: 24,
              margin: 0,
              minHeight: 380,
              height: "100%",
            }}
          >
            <Routes>
              <Route path="/" element={<NoteForm onAdd={handleAddNote} />} />
              <Route
                path="/list"
                element={<NoteList notes={notes} onDelete={handleDelete} />}
              />
              <Route
                path="/rubbish"
                element={
                  <RubbishList rubbish={rubbish} onRestore={handleRestore} />
                }
              />
            </Routes>
          </Content>
        </Layout>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
