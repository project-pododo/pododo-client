import "./App.css";
import {
  Route,
  Routes,
  Link,
  useNavigate,
  useLocation,
} from "react-router-dom";
import { Layout, Menu, Avatar, Badge } from "antd";
import {
  FormOutlined,
  UnorderedListOutlined,
  DeleteOutlined,
  CheckCircleOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useState, useEffect } from "react";
import NoteForm from "./component/NoteForm";
import NoteList from "./component/NoteList";
import RubbishList from "./component/RubbishList";
import CompletedList from "./component/CompletedList";
import dayjs from "dayjs";

const { Content, Sider, Header } = Layout;

function App() {
  const [notes, setNotes] = useState([]);
  const [rubbish, setRubbish] = useState([]);
  const [selectedKey, setSelectedKey] = useState("1");
  const [isOverdueCount, setIsOverdueCount] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();

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

  const handleOverdueChange = () => {
    const overdueCount = notes.filter(
      (note) => note.dateRange && dayjs().isAfter(dayjs(note.dateRange[1]))
    ).length;
    setIsOverdueCount(overdueCount);
  };

  useEffect(() => {
    switch (location.pathname) {
      case "/":
        setSelectedKey("1");
        break;
      case "/list":
        setSelectedKey("2");
        break;
      case "/completed":
        setSelectedKey("3");
        break;
      case "/rubbish":
        setSelectedKey("4");
        break;
      default:
        setSelectedKey("1");
    }
  }, [location.pathname]);

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header
        style={{
          backgroundColor: "#D1A7E1",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0 20px",
          cursor: "pointer",
        }}
      >
        <h1 style={{ color: "white", margin: 0 }} onClick={() => navigate("/")}>
          PODODO
          <img
            src="/images/icon-grapes.png"
            alt="logo"
            style={{ width: "28px", marginLeft: "4px" }}
          />
        </h1>{" "}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            marginRight: "20px",
          }}
        >
          <Badge count={isOverdueCount} offset={[10, 0]}>
            <Avatar size="large" icon={<UserOutlined />} />{" "}
          </Badge>
        </div>
      </Header>
      <Layout style={{}}>
        <Sider
          width={200}
          className="site-layout-background"
          style={{ backgroundColor: "#F4E6F1" }}
        >
          <Menu
            mode="inline"
            selectedKeys={[selectedKey]}
            onSelect={({ key }) => {
              setSelectedKey(key);
              switch (key) {
                case "1":
                  navigate("/");
                  break;
                case "2":
                  navigate("/list");
                  break;
                case "3":
                  navigate("/completed");
                  break;
                case "4":
                  navigate("/rubbish");
                  break;
                default:
                  navigate("/");
              }
            }}
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
              icon={<CheckCircleOutlined />}
              style={{
                backgroundColor:
                  selectedKey === "3" ? "#D1A7E1" : "transparent",
              }}
            >
              <Link
                to="/completed"
                style={{
                  color: selectedKey === "3" ? "#ffffff" : "#000055",
                }}
              >
                CompletedList
              </Link>
            </Menu.Item>
            <Menu.Item
              key="4"
              icon={<DeleteOutlined />}
              style={{
                color: "red",
                backgroundColor:
                  selectedKey === "4" ? "#D1A7E1" : "transparent",
              }}
            >
              <Link
                to="/rubbish"
                style={{
                  color: selectedKey === "4" ? "#ffffff" : "#000055",
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
                    onOverdueChange={handleOverdueChange}
                  />
                }
              />
              <Route
                path="/completed"
                element={
                  <CompletedList
                    notes={notes}
                    onDelete={handleDelete}
                    onOverdueChange={handleOverdueChange}
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
    </Layout>
  );
}

export default App;
