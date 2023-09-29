const express = require("express");
const Schema = require("../Mongoose/Schema");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());

const router = express.Router();

router.get("/getallrecords", async (req, resp) => {
  const result = await Schema.find({}); // fetching all record from mongoose database
  resp.send(result); // returning all the records
});
router.post("/adddata", async (req, resp) => {
  try {
    const task = new Schema(req.body); // fetching task object from req.body and making new task object
    await task.save(); // saving new task object in database
    return resp.status(200).json({ message: "Data saved successfully" });
  } catch (error) {
    return resp.status(500).json({ error: "Failed to save data" });// returning error in case of error
  }
});

router.get("/getdetails/:id", async (req, resp) => {
  try {
    const result = await Schema.find({ _id: req.params.id });// finding record mongo database by fetching id from req.params 

    if (result !== null && result.length > 0) {
      return resp.status(200).json(result); // returning the task object if found with given id
    } else {
      return resp.status(404).json({ error: "Data not found" }); // returning error if record not found
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    return resp.status(500).json({ error: "Failed to fetch data" });// returning error incase of undefined errors 
  }
});

router.put("/updatedetails/:id", async (req, res) => {
  try {
    const taskId = req.params.id; // fetching id from req.params
    const { Description, DueDate, Status, Title } = req.body; //using destructuring to assign values

    // Server-side validation
    if (
      !Description ||
      typeof Description !== "string" ||
      Description.trim() === ""
    ) {
      return res
        .status(400)
        .json({
          error: "Description is required and must be a non-empty string",
        });
    }

    if (!DueDate || isNaN(Date.parse(DueDate))) {
      return res
        .status(400)
        .json({ error: "DueDate is required and must be a valid date" });
    }

    if (!Status || !["Completed", "NotCompleted"].includes(Status)) {
      return res
        .status(400)
        .json({
          error: 'Status is required and must be "Completed" or "NotCompleted"',
        });
    }

    if (!Title || typeof Title !== "string" || Title.trim() === "") {
      return res
        .status(400)
        .json({ error: "Title is required and must be a non-empty string" });
    }

    // Use Mongoose to find the task by ID and update it
    const updatedTask = await Schema.findByIdAndUpdate(
      taskId,
      {
        Description,
        DueDate,
        Status,
        Title,
      },
      { new: true } // Return the updated document
    );

    if (!updatedTask) {
      return res.status(404).json({ error: "Task not found" }); //returning not found if there is no record found
    }

    return res.status(200).json(updatedTask); // returning updated record
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server error" });  // returning error
  }
});

router.delete("/deletedetails/:id", async (req, res) => {
  try {
    const taskId = req.params.id;

    // Validate the id parameter as a MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(taskId)) {
      return res.status(400).json({ error: "Invalid task ID" });
    }

    // Use Mongoose to find the task by ID and delete it
    const deletedTask = await Schema.deleteOne({ _id: taskId });

    if (deletedTask.deletedCount === 0) {
      return res.status(404).json({ error: "Task not found" });
    }

    return res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;  // exporting all the router paths
