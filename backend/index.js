const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require('dotenv');
require("./src/config/database")();

dotenv.config();
 
let PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());



app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api/users", require("./src/routes/user.routes"));
app.use("/api/tasks", require("./src/routes/task.routes"));

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
