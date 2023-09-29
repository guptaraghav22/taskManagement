const mongoose = require("mongoose");


//definf Schema of the collection Document
const schema = new mongoose.Schema({
  Description: {
    type: String,
    // required : true
  },
  DueDate: {
    type: String,
    // required:true
  },

  Status: {
    type: String,
    // required:true
  },
  Title: {
    type: String,
  },
});

const Task = mongoose.model("TaskManagement", schema);

module.exports = Task;
