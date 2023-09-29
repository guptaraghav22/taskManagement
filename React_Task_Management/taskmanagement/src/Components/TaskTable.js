import React, { useEffect, useState } from "react";
import { BiEditAlt } from "react-icons/bi";
import { BiSolidEditAlt } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import axios from "axios";
import Navbars from "./Navbars";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

function TaskTable() {
  let [data, setdata] = useState([]);
  let [num, setnum] = useState(0);
  useEffect(() => {

    //fetching all records from mongodb
    fetch("http://localhost:4000/getallrecords")
      .then((ans) => ans.json())
      .then((res) => setdata(res));
  }, []);

  const navigate = useNavigate();
  
  return (
    <div>
      <Navbars></Navbars>
      <div
        style={{
          display: "flex",
          marginTop: "50px",
          marginLeft: "200px",
          marginRight: "200px",
        }}
      >
        <a href="http://localhost:3000/Addtask">
          <FontAwesomeIcon icon={faPlus} />
        </a>
        <span>ADD-STUDENT</span>
      </div>
      <div
        style={{
          display: "flex",
          marginTop: "20px",
          marginLeft: "200px",
          marginRight: "200px",
        }}
      >
        <table class="table">
          <thead class="thead-dark">
            <tr>
              <th scope="col">Id</th>
              <th scope="col">Title</th>
              <th scope="col">Description</th>
              <th scope="col">Due-Date</th>
              <th scope="col">Status</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((ans) => (
              <tr>
                <th scope="row">{++num}</th>
                <td>{ans.Title}</td>
                <td>{ans.Description}</td>
                <td>{ans.DueDate}</td>
                <td>{ans.Status}</td>
                <td>
                  <a href={`/edit/${ans._id}`}>
                    <BiSolidEditAlt />
                  </a>

                  <a
                    href="/"
                    onClick={(e) => {
                      const confirmation = window.confirm(
                        "Are you sure you want to delete this task?"
                      );

                      if (confirmation) {
                        axios.delete(
                          `http://localhost:4000/deletedetails/${ans._id}`
                        );
                      } else {
                        e.preventDefault();
                      }
                    }}
                  >
                    <AiFillDelete />
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TaskTable;
