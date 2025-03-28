//importing modules
require("dotenv").config();
const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const path = require("path");
const { Pool } = require("pg");
const categoriesRouter = require("./routes/categoriesRoute");
const itemRouter = require("./routes/itemsRoutes");

//initialising express app
const app = express();

// View engine setup
app.use(expressLayouts);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.set("layout", "./layouts/layout");
app.set("layout extractScripts", true);
app.set("layout extractStyles", true);

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
app.get("/", async (req, res) => {
  try {
    const [totalBooksResult, totalCategoriesResult, lowStockResult, recentBooksResult] = await Promise.all([
      req.pool.query('SELECT COUNT(*) FROM items'),
      req.pool.query('SELECT COUNT(*) FROM categories'),
      req.pool.query('SELECT COUNT(*) FROM items WHERE quantity < 10'),
      req.pool.query('SELECT * FROM items ORDER BY created_at DESC LIMIT 5')
    ]);

    res.render("indexPage", {
      title: "Dashboard",
      currentPage: "dashboard",
      totalBooks: totalBooksResult.rows[0].count,
      totalCategories: totalCategoriesResult.rows[0].count,
      lowStockCount: lowStockResult.rows[0].count,
      recentBooks: recentBooksResult.rows
    });
  } catch (err) {
    console.error('Error:', err);
    res.render("indexPage", {
      title: "Dashboard",
      currentPage: "dashboard",
      error: "Error loading dashboard data"
    });
  }
});

app.get('/categories', async (req, res) => {
  try {
    const result = await req.pool.query(`
      SELECT 
          c.id,
          c.name,
          c.description,
          COUNT(i.id) as book_count
      FROM categories c
      LEFT JOIN items i ON c.id = i.category_id
      GROUP BY c.id, c.name, c.description
      ORDER BY c.name;
    `);
    
    // Add debug logging
    console.log('Categories with counts:', JSON.stringify(result.rows, null, 2));
    
    res.render('indexCategory', {
      title: 'Categories',
      categories: result.rows
    });
  } catch (err) {
    console.error('Error:', err);
    res.render('indexCategory', {
      title: 'Categories',
      categories: [],
      error: 'Error loading categories'
    });
  }
});

app.use("/categories", categoriesRouter);
app.use("/items", itemRouter);

//start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
