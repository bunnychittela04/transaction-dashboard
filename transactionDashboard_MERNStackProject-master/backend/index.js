
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const port = process.env.PORT || 3000;

const app = express();
app.use(cors());

mongoose.connect("mongodb+srv://atique:V62JV2zmkB0D4KFi@cluster0.vx7cs.mongodb.net/?retryWrites=true&w=majority")
  .then(() => {
 
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

const transaction_routes = require("./router/transaction");

app.use("/allTransaction", transaction_routes);

// Run this query only once to initialize the database 
app.use("/initializeDB", transaction_routes);

app.listen(port, () => {
  console.log(`server is listening on port ${port}`);
});
