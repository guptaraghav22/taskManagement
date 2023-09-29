import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import TaskDisplay from "./TaskDisplay";
import TaskTable from "./TaskTable";
import EditInfo from "./EditInfo";
import AddTask from "./AddTask";
//defing routing for defined router paths for whole application
function RouterDisplay() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<TaskDisplay />} />
          <Route path="/edit/:id" element={<EditInfo />} />
          <Route path="/Addtask" element={<AddTask />} />
        </Routes>
      </div>
    </Router>
  );
}

export default RouterDisplay;
