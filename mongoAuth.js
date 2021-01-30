//Express
const express = require("express");
const app = express();
const mongoose = require("mongoose");
//Environment Variables
const dotenv = require("dotenv");
dotenv.config();

//connect to db
mongoose.connect(process.env.DB_CONNECT, {useNewUrlParser: true}, () =>
  console.log("connected to db")
);

//Middleware
app.use(express.json());
//route middleware
app.use("/api/user", authRoute);
app.use("/api/posts", postRoute);
//import routes
const postRoute = require('./Routes/posts')
const authRoute = require("./Routes/auth");
//Add a port
const port = process.env.PORT || 3000
app.listen(port, () => console.log(` server up and running on port ${port}`));
