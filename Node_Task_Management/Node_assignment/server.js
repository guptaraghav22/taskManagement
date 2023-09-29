const express = require("express");
const connection = require("./Mongoose/Connection");
const cors = require("cors");
const Schema = require("./Mongoose/Schema");
const app = express();
const controller = require("./Controller/taskController");


//enabling cors error in order to share resourses from one server to another
app.use(express.json());
const corsOptions = {
  origin: "http://localhost:3000", // all allowed origin
  optionsSuccessStatus: 200, 
  allowedHeaders: ["Content-Type", "Authorization", "Custom-Header"],// allowing headers 
};
app.use(cors(corsOptions));

app.use("/", controller);

//running server on port 4000
app.listen(4000, () => {
  console.log("application is running on port 4000");
});