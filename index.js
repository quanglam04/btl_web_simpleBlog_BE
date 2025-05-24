const express = require("express");
const cors = require("cors");
const app = express();
const routerPost = require("./routes/PostRouter");
const routerUser = require("./routes/UserRouter");
const dbConnect = require("./db/dbConnect");

dbConnect();
app.use(express.json());
app.use(cors());

app.use("/api/post", routerPost);
app.use("/api/user", routerUser);

app.listen(8080, function () {
  console.log(`Server is running on port 8080`);
});
