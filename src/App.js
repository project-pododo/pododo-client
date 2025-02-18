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
  const [selectedKey, setSelectedKey] = useState("1");

  const handleUpdateNote = (id, updateNote) => {
    setNotes((prevNotes) =>
      prevNotes.map((note) => (note.id === id ? updateNote : note))
    );
  };

  const handleAddNote = (title, content, dateRange) => {
    const newNote = { id: Date.now(), title, content, dateRange };
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
        <Sider
          width={200}
          className="site-layout-background"
          style={{ backgroundColor: "#F4E6F1" }}
        >
          <Menu
            mode="inline"
            selectedKeys={[selectedKey]}
            onSelect={({ key }) => setSelectedKey(key)}
            defaultSelectedKeys={["1"]}
            style={{ height: "100vh", backgroundColor: "#F4E6F1" }}
          >
            <Menu.Item
              key="1"
              icon={<FormOutlined />}
              style={{
                backgroundColor:
                  selectedKey === "1" ? "#D1A7E1" : "transparent",
              }}
            >
              <Link
                to="/"
                style={{
                  color: selectedKey === "1" ? "#ffffff" : "#000055",
                }}
              >
                NoteForm
              </Link>
            </Menu.Item>
            <Menu.Item
              key="2"
              icon={<UnorderedListOutlined />}
              style={{
                backgroundColor:
                  selectedKey === "2" ? "#D1A7E1" : "transparent",
              }}
            >
              <Link
                to="/list"
                style={{
                  color: selectedKey === "2" ? "#ffffff" : "#000055",
                }}
              >
                NoteList
              </Link>
            </Menu.Item>
            <Menu.Item
              key="3"
              icon={<DeleteOutlined />}
              style={{
                color: "red",
                backgroundColor:
                  selectedKey === "3" ? "#D1A7E1" : "transparent",
              }}
            >
              <Link
                to="/rubbish"
                style={{
                  color: selectedKey === "3" ? "#ffffff" : "#000055",
                }}
              >
                휴지통
              </Link>
            </Menu.Item>
          </Menu>
        </Sider>

        <Layout>
          <Content
            style={{
              padding: 24,
              margin: 0,
              minHeight: 380,
              height: "100%",
              backgroundColor: "#FFF5FB",
            }}
          >
            <Routes>
              <Route path="/" element={<NoteForm onAdd={handleAddNote} />} />
              <Route
                path="/list"
                element={
                  <NoteList
                    notes={notes}
                    onDelete={handleDelete}
                    onUpdate={handleUpdateNote}
                  />
                }
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
