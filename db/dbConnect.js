const mongoose = require("mongoose");
require("dotenv").config();
async function dbConnect() {
  mongoose
    .connect(process.env.DB_URL)
    .then(() => {
      console.log("Successfully connected to MongoDB Atlas!");
    })
    .catch((error) => {
      console.error("Lỗi : ", error);
    });
}
module.exports = dbConnect;
