import React, { useContext, useEffect, useState, useRef } from "react";
import "../styles/Homepage.css";
import AuthContext from "../context/AuthContext";
import Task from "../components/Task";
import { URL } from "../constants/urlConstants";
import Modal from "../components/Modal";
import Loader from "../components/Loader";

const Homepage = () => {
  const buttonRef = useRef(null);
  const { searchText, authorizationToken } = useContext(AuthContext);
  const [data, setData] = useState([]);
  const [newTask, setNewTask] = useState(undefined);
  const [task, setTask] = useState({
    title: "",
    description: "",
    completed: false,
    dueDate: "",
  });
  const [loading, setLoading] = useState(false);

  const getTasks = async () => {
    setLoading(true);
    try {
      const response = await fetch(URL.GET_TASKS, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: authorizationToken,
        },
      });
      const jsonData = await response.json();
      setData(jsonData.tasks);
    } catch (err) {
      console.error(err.message);
    }
    setLoading(false);
  };

  const addNewTask = async (newTask) => {
    try {
      const response = await fetch(URL.CREATE_TASK, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: authorizationToken,
        },
        body: JSON.stringify(newTask),
      });
      const jsonData = await response.json();
      if (jsonData.statusCode === 201) {
        setData((prev) => [...prev, jsonData.task]);
        setNewTask(false);
      } else {
        console.error("Add Task Error: ", jsonData.message);
      }
    } catch (error) {
      console.error("New Task Error: ", error.message);
    }
  };

  const updateTask = async (task) => {
    try {
      const response = await fetch(URL.UPDATE_TASK, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: authorizationToken,
        },
        body: JSON.stringify(task),
      });
      const jsonData = await response.json();
      let updateIndex = data.findIndex((t) => t.id === jsonData.task.id);
      let newData = [...data];
      newData[updateIndex] = jsonData.task;
      setData(newData);
      setNewTask(false);
    } catch (error) {
      console.error("Update Task Error: ", error.message);
    }
  };

  const editTask = (task) => {
    setTask(task);
    setNewTask(false);
    buttonRef.current.click();
  };

  useEffect(() => {
    getTasks();
  }, []);
  return (
    <div className="main-container">
      {loading ? (
        <div
          style={{
            position: "absolute",
            width: "80vw",
            height: "92vh",
            alignItems: "center",
            justifyContent: "center",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Loader />
        </div>
      ) : (
        <>
          <Modal
            newTask={newTask}
            task={task}
            addNewTask={addNewTask}
            updateTask={updateTask}
            setTask={setTask}
          />
          <button
            type="button"
            className="btn btn-primary"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
            style={{ display: "none" }}
            ref={buttonRef}
          >
            Launch demo modal
          </button>
          <div
            style={{
              display: "flex",
              width: "80vw",
              flexDirection: "row",
              flexWrap: "wrap",
            }}
          >
            {data?.length === 0 ? (
              <div
                style={{
                  position: "absolute",
                  width: "80vw",
                  height: "92vh",
                  alignItems: "center",
                  justifyContent: "center",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <h1 style={{ textAlign: "center" }}>No tasks found!</h1>
              </div>
            ) : (
              data?.filter((_task) =>
                  _task.title.toLowerCase().includes(searchText.toLowerCase())
                )
                .map((_task) => (
                  <Task
                    key={_task.id}
                    task={_task}
                    updateTasks={setData}
                    updateTask={updateTask}
                    editTask={editTask}
                  />
                ))
            )}
          </div>
          <div style={{ position: "absolute", bottom: 50, right: 50 }}>
            <button
              className="btn btn-primary"
              onClick={() => {
                setNewTask(true);
                setTask({
                  title: "",
                  description: "",
                  completed: false,
                  dueDate: "",
                });
                buttonRef.current.click();
              }}
            >
              Create Task
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Homepage;
