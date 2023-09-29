import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Navbars from "./Navbars";
import { useNavigate } from "react-router-dom";

function EditInfo() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [status, setStatus] = useState("");
  const [title, setTitle] = useState("");

  // Validation state and error messages
  const [descriptionError, setDescriptionError] = useState("");
  const [dueDateError, setDueDateError] = useState("");
  const [statusError, setStatusError] = useState("");
  const [titleError, setTitleError] = useState("");

  useEffect(() => {
    
    //fetching all records
    axios
      .get(`http://localhost:4000/getdetails/${id}`)
      .then((response) => {
        if (response.status === 200) {
          const data = response.data[0];
          setDescription(data.Description);
          setDueDate(data.DueDate);
          setStatus(data.Status);
          setTitle(data.Title);
        } else {
          throw new Error("Request failed");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, [id]);

  //handeling onchange events
  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
    setDescriptionError("");
  };

  const handleDueDateChange = (event) => {
    setDueDate(event.target.value);
    setDueDateError("");
  };

  const handleSelectChange = (event) => {
    setStatus(event.target.value);
    setStatusError("");
  };

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
    setTitleError("");
  };

  function submitbutton(e) {
    e.preventDefault();

    // Perform validation before submitting
    if (description.trim() === "") {
      setDescriptionError("Description is required");
      return;
    }
    if (dueDate.trim() === "") {
      setDueDateError("Due Date is required");
      return;
    }
    if (status === "") {
      setStatusError("Status is required");
      return;
    }
    if (title.trim() === "") {
      setTitleError("Title is required");
      return;
    }

    // Check if the dueDate is in the past
    const today = new Date();
    const selectedDueDate = new Date(dueDate);

    if (selectedDueDate < today) {
      setDueDateError("Due Date cannot be in the past");
      return;
    }
    // If all fields are valid, proceed with the submission
    let data = {
      Description: description,
      DueDate: dueDate,
      Status: status,
      Title: title,
    };

    axios
      .put(`http://localhost:4000/updatedetails/${id}`, data)
      .then((res) => {
        console.log(res);
        alert("Data updated successfully");
        navigate("/");
      })
      .catch((err) => {
        throw new Error(err);
      });
  }

  return (
    <>
      <Navbars />
      <div className="container">
        <div className="row justify-content-center mt-3">
          <div className="col-md-8 col-sm-12">
            <form onSubmit={submitbutton}>
              <div className="form-group">
                <label htmlFor="Description">Description</label>
                <input
                  type="text"
                  value={description}
                  onChange={handleDescriptionChange}
                  className={`form-control ${
                    descriptionError ? "is-invalid" : ""
                  }`}
                  id="Description"
                  placeholder="Enter Description"
                />
                {descriptionError && (
                  <div className="invalid-feedback">{descriptionError}</div>
                )}
              </div>
              <div className="form-group">
                <label htmlFor="Title">Title</label>
                <input
                  type="text"
                  value={title}
                  onChange={handleTitleChange}
                  className={`form-control ${titleError ? "is-invalid" : ""}`}
                  id="Title"
                  placeholder="Enter Title"
                />
                {titleError && (
                  <div className="invalid-feedback">{titleError}</div>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="DueDate">DueDate</label>
                <input
                  type="date"
                  value={dueDate}
                  onChange={handleDueDateChange}
                  className={`form-control ${dueDateError ? "is-invalid" : ""}`}
                  id="DueDate"
                  placeholder="DueDate"
                />
                {dueDateError && (
                  <div className="invalid-feedback">{dueDateError}</div>
                )}
              </div>
              <div className="form-group">
                <label htmlFor="Status">Status</label>
                <select
                  id="dropdown"
                  value={status}
                  onChange={handleSelectChange}
                  className={`form-control ${statusError ? "is-invalid" : ""}`}
                >
                  <option value="">Select Status</option>
                  <option value="Completed">Completed</option>
                  <option value="NotCompleted">Not Completed</option>
                </select>
                {statusError && (
                  <div className="invalid-feedback">{statusError}</div>
                )}
              </div>

              <button
                type="submit"
                style={{ width: "100%", marginTop: "20px" }}
                className="btn btn-primary btn-block"
              >
                Update
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default EditInfo;
