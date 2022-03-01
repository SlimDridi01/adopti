const express = require("express");
//import db file
const dbConnection = require("./config/connect");
//import Routes
const Router = require("./Routes/auth");

const PetsRoutes = require("./Routes/Pets.routes");

const app = express();

//middleware
app.use(express.json());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "*");
  res.setHeader("Access-Control-Allow-Headers", "*");
  next();
});
//app.use("/api/Products", Route);
app.use("/api/user", Router);
app.use("/api/Pets", PetsRoutes);

//importing port from .env
let port = process.env.PORT;
if (port == null || port == "") {
  port = 7000;
}
if (process.env.NODE_ENV === "production npm start") {
  app.use(express.static("../client/build"));
}
//connection to the database
dbConnection();

//listen to the port
app.listen(port);
