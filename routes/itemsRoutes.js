const express = require("express");
const itemRouter = express.Router();
const pool = require("../db/pool");

// Setting up index item route
itemRouter.get("/", async (req, res) => {
  try {
    const { rows: items } = await pool.query(
      "SELECT * FROM items ORDER BY name"
    );
    res.render("indexItem", {
      title: "All inventory items",
      items,
    });
  } catch (err) {
    console.error(err);
    res.send("Error: " + err);
  }
});

// Adding new item
itemRouter.get("/new", async (req, res) => {
  try {
    const { rows: categories } = await pool.query(
      "SELECT id, name FROM categories ORDER BY name"
    );

    res.render("formItem", {
      title: "Add a new item",
      action: "/items/new",
      item: null,
      categories, // Pass categories to the view
    });
  } catch (err) {
    console.error(err);
    res.send("Error: " + err);
  }
});

// Posting the new item
itemRouter.post("/new", async (req, res) => {
  const {
    itemName,
    itemDescription,
    itemPrice,
    itemAuthor,
    itemISBN,
    itemQuantity,
    itemCategory,
  } = req.body;

  try {
    await pool.query(
      "INSERT INTO items(name, description, price, quantity, author, isbn, category_id) VALUES ($1, $2, $3, $4, $5, $6, $7)",
      [
        itemName,
        itemDescription,
        itemPrice,
        itemQuantity,
        itemAuthor,
        itemISBN,
        itemCategory,
      ]
    );
    res.redirect("/items");
  } catch (err) {
    console.error(err);
    res.send("Error: " + err);
  }
});

// Route to display the form for updating an item
itemRouter.get("/:id/edit", async (req, res) => {
  const { id } = req.params;
  try {
    const { rows: categories } = await pool.query(
      "SELECT id, name FROM categories ORDER BY name"
    );
    const {
      rows: [item],
    } = await pool.query("SELECT * FROM items WHERE id = $1", [id]);

    res.render("formItem", {
      title: "Edit item",
      action: `/items/${id}/edit`, // Form action URL
      item, // Pass item data to the form
      categories, // Pass categories to the form
    });
  } catch (err) {
    console.error(err);
    res.send("Error: " + err);
  }
});

// Route to handle form submission for updating an item
itemRouter.post("/:id/edit", async (req, res) => {
  const { id } = req.params;
  const {
    itemName,
    itemDescription,
    itemPrice,
    itemAuthor,
    itemISBN,
    itemQuantity,
    itemCategory,
  } = req.body;

  try {
    await pool.query(
      "UPDATE items SET name = $1, description = $2, price = $3, author = $4, isbn = $5, quantity = $6, category_id = $7 WHERE id = $8",
      [
        itemName,
        itemDescription,
        itemPrice,
        itemAuthor,
        itemISBN,
        itemQuantity,
        itemCategory,
        id,
      ]
    );
    res.redirect("/items");
  } catch (err) {
    console.error(err);
    res.send("Error: " + err);
  }
});

// Route to handle deleting an item
itemRouter.post("/:id/delete", async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query("DELETE FROM items WHERE id = $1", [id]);

    if (result.rowCount === 0) {
      return res.status(404).send("Item not found");
    }

    res.redirect("/items");
  } catch (err) {
    console.error(err);
    res.send("Error: " + err);
  }
});

module.exports = itemRouter;
