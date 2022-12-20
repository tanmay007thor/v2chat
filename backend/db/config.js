const mongoose = require("mongoose");
const dotenv = require("dotenv");
mongoose.set("strictQuery", false);

dotenv.config();
mongoose
  .connect(process.env.DB_CONNECT, {
   
  })
  .then(() => {
    console.log("Connected");
  })
  .catch((e) => {
    console.log("Connection Error !");
  });
