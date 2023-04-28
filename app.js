const express = require("express");
const app = express();
const mongoose = require("mongoose");

const port = process.env.PORT || 6000;

require('dotenv').config();

const cors = require("cors");
app.use(cors());

mongoose.set('strictQuery', false); 

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Failed to connect to MongoDB:", error);
  });

require("./models/user");
require("./models/post");

app.use(express.json());
app.use(require("./routes/auth"));
app.use(require("./routes/post"));

app.listen(port, () => {
  console.log("Server is Running", port);
});
