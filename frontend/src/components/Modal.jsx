import React, { useRef } from "react";
import Checkbox from "./Checkbox";

const Modal = ({ newTask, task, setTask, addNewTask, updateTask }) => {
  const closeButton = useRef(null);
  const handleOnChange = (e) => {
    setTask((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const closeModal = () => {
    closeButton.current.click();
  };
  return (
    <div
      className="modal fade"
      id="exampleModal"
      tabIndex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content" style={{ backgroundColor: "#d2d3db" }}>
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="exampleModalLabel">
              {newTask ? "Add New Task" : "Edit Task"}
            </h1>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              ref={closeButton}
            ></button>
          </div>
          <div className="modal-body">
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Title
              </label>
              <input
                type="text"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                value={task.title}
                name="title"
                onChange={handleOnChange}
                placeholder="Enter title"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">
                Description
              </label>
              <textarea
                type="text"
                className="form-control"
                id="exampleInputPassword1"
                value={task.description}
                name="description"
                onChange={handleOnChange}
                placeholder="Enter description"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputDuedate1" className="form-label">
                Due Date
              </label>
              <input
                type="date"
                className="form-control"
                id="exampleInputDuedate1"
                value={task.duedate}
                name="dueDate"
                onChange={handleOnChange}
                placeholder="Enter description"
              />
            </div>
            <div
              className="mb-3 form-check"
              style={{ display: "flex", flexDirection: "row" }}
            >
              <Checkbox
                checked={task.completed}
                onChange={() =>
                  setTask((prev) => ({ ...prev, completed: !prev.completed }))
                }
              />
              <label className="form-check-label" htmlFor="exampleCheck1">
                Mark as completed
              </label>
            </div>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-danger"
              data-bs-dismiss="modal"
              onClick={closeModal}
            >
              Close
            </button>
            <button
              type="button"
              className="btn btn-success"
              onClick={() => {
                newTask ? addNewTask(task) : updateTask(task);
                closeModal();
              }}
            >
              {newTask ? "Add Task" : "Save Changes"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
