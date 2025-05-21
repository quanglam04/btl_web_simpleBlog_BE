const express = require("express");
const cors = require("cors");
const app = express();
const router = require("./routes/PostRouter");
const dbConnect = require("./db/dbConnect");

dbConnect();
app.use(express.json());
app.use(cors());

app.use("/api", router);

app.listen(8080, function () {
  console.log(`Server is running on port 8080`);
});
