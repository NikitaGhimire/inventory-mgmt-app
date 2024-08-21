//importing modules
require("dotenv").config();
const express = require("express");
const path = require("path");
const { Pool } = require("pg");
const categoriesRouter = require("./routes/categoriesRoute");
const itemRouter = require("./routes/itemsRoutes");

//initialising express app
const app = express();

//setting view engine to ejs
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

//Middleware to parse URL encoded bodies
app.use(express.urlencoded({ extended: true }));

//serve static files from public directory
app.use(express.static(path.join(__dirname, "public")));

//create connection pool
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

//make the pool available to routes
app.use((req, res, next) => {
  req.pool = pool;
  next();
});

//define routes
app.get("/", (req, res) => {
  res.render("indexPage", { title: "Bookstore Inventory Management System" });
});
app.use("/categories", categoriesRouter);
app.use("/items", itemRouter);

//start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
