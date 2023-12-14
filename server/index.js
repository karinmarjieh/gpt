const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");

const chatRoutes = require("./routes/chatRoutes");

const app = express();
app.use(cors());
app.use(bodyParser.json());

dotenv.config();
const port = process.env.PORT || 3000;

app.use("/", chatRoutes);

app.listen(port, () => {
  console.log(`server running on port ${port}`);
});
