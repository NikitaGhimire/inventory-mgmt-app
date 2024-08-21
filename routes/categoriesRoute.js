//initialise the router

const express = require("express");
const categoriesRouter = express.Router();
const pool = require("../db/pool");

//setting up the index category route
categoriesRouter.get("/", async (req, res) => {
  try {
    const { rows: categories } = await pool.query(
      "SELECT * FROM categories ORDER BY name"
    );
    res.render("indexCategory", {
      title: "Bookstore Inventory Application",
      categories,
    });
  } catch (err) {
    console.error(err);
    res.send("Error" + err);
  }
});

//adding a new category
categoriesRouter.get("/new", (req, res) => {
  res.render("formCategory", {
    title: "Add a new category",
    action: "/categories/new",
    category: null,
  });
});

//posting the new category
categoriesRouter.post("/new", async (req, res) => {
  const categoryName = req.body.categoryName;
  const categoryDescription = req.body.categoryDescription;

  //add category to the array
  try {
    await pool.query(
      'INSERT INTO categories("name", "description") VALUES ($1, $2)',
      [categoryName, categoryDescription]
    );
    res.redirect("/categories");
  } catch (err) {
    console.error(err);
    res.send("Error" + err);
  }
});

// Route to display the form for updating a category
categoriesRouter.get("/:id/edit", async (req, res) => {
  const { id } = req.params;
  try {
    const {
      rows: [category],
    } = await pool.query("SELECT * FROM categories WHERE id = $1", [id]);
    res.render("formCategory", {
      title: "Edit category",
      action: `/categories/${id}/edit`, // Form action URL
      category, // Pass category data to the form
    });
  } catch (err) {
    console.error(err);
    res.send("Error: " + err);
  }
});

// Route to handle form submission for updating a category
categoriesRouter.post("/:id/edit", async (req, res) => {
  const { id } = req.params;
  const categoryName = req.body.categoryName;
  const categoryDescription = req.body.categoryDescription;

  try {
    await pool.query(
      "UPDATE categories SET name = $1, description = $2 WHERE id = $3",
      [categoryName, categoryDescription, id]
    );
    res.redirect("/categories");
  } catch (err) {
    console.error(err);
    res.send("Error: " + err);
  }
});

// Route to handle deleting a category
categoriesRouter.post("/:id/delete", async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query("DELETE FROM categories WHERE id = $1", [
      id,
    ]);

    if (result.rowCount === 0) {
      return res.status(404).send("Category not found");
    }

    res.redirect("/categories");
  } catch (err) {
    console.error(err);
    res.send("Error: " + err);
  }
});

// Route to display category details and its items
categoriesRouter.get("/:id/items", async (req, res) => {
  const { id } = req.params;
  try {
    // Fetch the category
    const {
      rows: [category],
    } = await pool.query("SELECT * FROM categories WHERE id = $1", [id]);

    if (!category) {
      return res.status(404).send("Category not found");
    }

    // Fetch items related to the category
    const { rows: items } = await pool.query(
      "SELECT * FROM items WHERE category_id = $1",
      [id]
    );

    // Render the new EJS file with category details and items
    res.render("categoryItems", {
      title: "Category Details and Items",
      category, // Pass category data to the form
      items, // Pass items data to the form
    });
  } catch (err) {
    console.error(err);
    res.send("Error: " + err);
  }
});

module.exports = categoriesRouter;
