const express = require("express");
const cors = require("cors");
const products = require("./products");
const mongoose = require("mongoose");

const app = express();

require("dotenv").config();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Shop API");
});

app.get("/products", (req, res) => {
  res.send(products);
});

const port = process.env.PORT || 5000;
const uri = process.env.DB_URI;

app.listen(port, console.log("server running on port " + port));

mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("connected to MongoDB..."))
  .catch((err) => console.log("MongoDB connection failed", err.message));
