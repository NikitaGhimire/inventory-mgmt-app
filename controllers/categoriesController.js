const pool = require("../db/pool");

//getting all categories
exports.getAllCategories = async (req, res) => {
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
};

//display form to add a new category
exports.displayAddCategoryForm = async (req, res) => {
  res.render("formCategory", {
    title: "Add a new category",
    action: "/categories/new",
  });
};

// Handle adding a new category
exports.addCategory = async (req, res) => {
  const categoryName = req.body.categoryName;
  const categoryDescription = req.body.description;

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
};

// Display form to update a category
exports.displayEditCategoryForm = async (req, res) => {
  const { id } = req.params;

  try {
    const {
      rows: [category],
    } = await pool.query("SELECT * FROM categories WHERE id=$1", [id]);
    if (!category) {
      return res.status(404).send("Category not found");
    }
    res.render("formCategory", {
      title: "Edit Category",
      action: `/categories/${id}/edit`,
      category,
    });
  } catch (err) {
    console.error(err);
    res.send("Error: " + err);
  }
};

// Handle updating a category
exports.updateCategory = async (req, res) => {
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
};

// Handle deleting a category
exports.deleteCategory = async (req, res) => {
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
};
