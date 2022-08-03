//Importing packages
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const fs = require("fs");
require("dotenv").config();

//initializing app
const app = express();

//declarations
const port = process.env.PORT || 8000;

//database connection
mongoose
  .connect(
    `mongodb+srv://${process.env.DATABASE_USER}:${process.env.DATABASE_PASSWORD}@cluster0.zz9cf7z.mongodb.net/?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
    }
  )
  .then(() => {
    console.log("Database Connected");
  })
  .catch((err) => {
    console.log(err);
  });

//middlewares
//app.use(morgan('dev'));
app.use(express.json({limit: '10mb'}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

//routes middlewares
fs.readdirSync("./routes").map((route) =>
  app.use("/api", require("./routes/" + route))
);

//server
app.listen(port, () => {
  console.log(`Server is running at Port ${port}`);
});
