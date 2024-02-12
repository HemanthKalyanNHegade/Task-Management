import React from "react";
import "../styles/Task.css";
import Checkbox from "./Checkbox";
import { URL } from "../constants/urlConstants";
import AuthContext from "../context/AuthContext";

const Task = ({ task, updateTasks, updateTask, editTask }) => {
  const { authorizationToken } = React.useContext(AuthContext);
  const deleteTask = async (task) => {
    try {
      const response = await fetch(`${URL.DELETE_TASK}/${task.id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: authorizationToken,
        },
      });
      const jsonData = await response.json();
      if (jsonData.statusCode === 200) {
        updateTasks((prev) => prev.filter((t) => t.id !== task.id));
      } else {
        console.error("Delete error: ", jsonData.message);
      }
      console.log("Delete task:", jsonData);
    } catch (err) {
      console.error("Delete error: ", err.message);
    }
  };
  return (
    <div className="task-card">
      <div className="task-header">
        <div>
          <p className="task-title">{task.title}</p>
        </div>
        <Checkbox
          checked={task.completed}
          onChange={(e) => {
            e.stopPropagation();
            updateTask({ ...task, completed: !task.completed });
          }}
        />
      </div>
      <p className="task-description">{task.description}</p>
      <dl className="task-post-info">
        <div className="task-cr">
          <dd className="task-dd">Due date</dd>
          <dt className="task-dt">{task.dueDate}</dt>
        </div>
      </dl>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-end",
        }}
      >
        <button
          className="btn btn-danger mx-2"
          onClick={() => deleteTask(task)}
        >
          Delete
        </button>
        <button className="btn btn-primary" onClick={() => editTask(task)}>
          Edit
        </button>
      </div>
    </div>
  );
};

export default Task;
