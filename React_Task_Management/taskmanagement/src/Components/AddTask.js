import React, { useState } from "react";
import axios from "axios";
import Navbars from "./Navbars";
import { useNavigate } from "react-router-dom";

function AddTask() {
  const navigate = useNavigate();
  //defining initial states
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [status, setStatus] = useState("Completed");
  const [title, setTitle] = useState("");

  // Validation state and error messages
  const [descriptionError, setDescriptionError] = useState("");
  const [titleError, setTitleError] = useState("");
  const [dueDateError, setDueDateError] = useState("");

  //handeling input box change event 
  const handleSelectChange = (event) => {
    setStatus(event.target.value);
  };

  //onclick event for form
  async function formsubmit(event) {
    event.preventDefault();

    // Reset error messages
    setDescriptionError("");
    setTitleError("");
    setDueDateError("");

    // Perform validation before submitting
    if (!description.trim()) {
      setDescriptionError("Description is required");
      return;
    }

    if (!title.trim()) {
      setTitleError("Title is required");
      return;
    }

    if (!dueDate) {
      setDueDateError("Due Date is required");
      return;
    }

    // Check if the dueDate is in the past
    const today = new Date();
    const selectedDueDate = new Date(dueDate);

    if (selectedDueDate < today) {
      setDueDateError("Due Date cannot be in the past");
      return;
    }

    // Create the task object
    const task = {
      Description: description,
      DueDate: dueDate,
      Status: status,
      Title: title,
    };

    // Send a POST request to add the task
    axios
      .post("http://localhost:4000/adddata", task)
      .then((res) => {
        console.log(res);
        navigate("/");
      })
      .catch((err) => {
        console.error(err);
        throw new Error(err);
      });
  }

  return (
    <>
      <Navbars />
      <div className="container">
        <div className="row justify-content-center mt-3">
          <div className="col-md-8 col-sm-12">
            <form onSubmit={formsubmit}>
              <div className="form-group">
                <label htmlFor="Description">Description</label>
                <input
                  type="text"
                  className={`form-control ${
                    descriptionError ? "is-invalid" : ""
                  }`}
                  id="Description"
                  onChange={(e) => {
                    setDescription(e.target.value);
                  }}
                  placeholder="Enter Description"
                />
                {descriptionError && (
                  <div className="invalid-feedback">{descriptionError}</div>
                )}
              </div>
              <div className="form-group">
                <label htmlFor="title">Title</label>
                <input
                  type="text"
                  className={`form-control ${titleError ? "is-invalid" : ""}`}
                  id="title"
                  onChange={(e) => {
                    setTitle(e.target.value);
                  }}
                  placeholder="Title"
                />
                {titleError && (
                  <div className="invalid-feedback">{titleError}</div>
                )}
              </div>
              <div className="form-group">
                <label htmlFor="DueDate">Due Date</label>
                <input
                  type="date"
                  className={`form-control ${dueDateError ? "is-invalid" : ""}`}
                  id="DueDate"
                  onChange={(e) => {
                    setDueDate(e.target.value);
                  }}
                />
                {dueDateError && (
                  <div className="invalid-feedback">{dueDateError}</div>
                )}
              </div>
              <div className="form-group">
                <label htmlFor="Status">Status</label>
                <select
                  id="dropdown"
                  className="form-control"
                  value={status}
                  onChange={handleSelectChange}
                >
                  <option value="Completed">Completed</option>
                  <option value="NotCompleted">Not Completed</option>
                </select>
              </div>

              <button
                type="submit"
                style={{ width: "100%", marginTop: "20px" }}
                className="btn btn-primary btn-block"
              >
                Add Task
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default AddTask;
