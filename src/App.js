import React, { useState, useEffect } from "react";
import List from "./component/List";
import "./App.css";
import { Button, Input, Box, Paper } from "@mui/material";
import Alert from "./component/Alert";

const getLocalStorage = () => {
  let list = localStorage.getItem("list");
  if (list) {
    return JSON.parse(localStorage.getItem("list"));
  } else {
    return [];
  }
};
function App() {
  const [name, setName] = useState("");
  const [list, setList] = useState(getLocalStorage());
  const [isEditing, setIsEditing] = useState(false);
  const [editID, setEditID] = useState(null);
  const [alert, setAlert] = useState({
    show: false,
    msg: "",
    type: "",
  });

  const handleSubmit = (e) => {
    if (!name) {
      showAlert(true, "please enter text", "gray");
    } else if (name && isEditing) {
      setList(
        list.map((item) => {
          if (item.id === editID) {
            return { ...item, title: name };
          }
          return item;
        })
      );
      setName("");
      setEditID(null);
      showAlert(true, "clear all item", "green");
      setIsEditing(false);
    } else {
      e.preventDefault();
      const newItem = { id: new Date().getTime().toString(), title: name };
      setList([...list, newItem]);
      console.log(list);
      setName("");
    }
  };
  const showAlert = (show = false, msg = "", type = "") => {
    setAlert({ show, msg, type });
  };
  const clearList = () => {
    showAlert(true, "clear all item", "red");
    setList("");
  };
  const removeItem = (id) => {
    showAlert(true, "clear  item", "orange");
    setList(list.filter((item) => item.id !== id));
  };
  const editItem = (id) => {
    const specificItem = list.find((item) => item.id === id);
    console.log(specificItem);
    setIsEditing(true);
    setEditID(id);
    setName(specificItem.title);
  };
  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(list));
  }, [list]);
  return (
    <>
      <Paper
        sx={{
          width: 350,
          p: 4,
          m: "auto",
          mt: 5,
        }}
      >
        <div>
          {alert.show && (
            <Alert {...alert} removeAlert={showAlert} list={list} />
          )}
        </div>
        <Box>
          <Input
            type="text"
            onChange={(e) => setName(e.target.value)}
            varient="outlined"
            placeholder="add text"
            value={name}
            sx={{ m: "auto" }}
          />
          <Button onClick={handleSubmit}>
            {isEditing ? "edit" : "submit"}
          </Button>
        </Box>
        {list.length > 0 && (
          <List item={list} editItem={editItem} removeItem={removeItem} />
        )}
        <Box
          sx={{
            width: 160,
            m: "auto",
            mt: 5,
          }}
        >
          <Button variant="outlined" onClick={clearList} color="error">
            clear all
          </Button>
        </Box>
      </Paper>
    </>
  );
}

export default App;
