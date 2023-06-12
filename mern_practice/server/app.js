const express = require("express");
const cors = require("cors");
const app = express();
const Connection = require("./db/conn");
const router = require("./route/router");

const port = 5001;
app.use(express.json());
app.use(cors());
app.use(router);
Connection();

app.listen(port, () => {
  console.warn(`server is running on port number ${port}`);
});
