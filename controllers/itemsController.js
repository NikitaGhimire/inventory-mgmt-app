const pool = require('../db/pool');

const itemController = {
    // Get all items
    getAllItems: async (req, res) => {
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
    },

    // Show new item form
    showNewItemForm: async (req, res) => {
        try {
            const categoryId = req.query.category_id;
            const categoriesResult = await pool.query(
                "SELECT * FROM categories ORDER BY name"
            );

            res.render("formItem", {
                title: "Add New Book",
                categories: categoriesResult.rows,
                selectedCategory: categoryId,
                item: null,
                action: "/items/new",
            });
        } catch (err) {
            console.error("Error:", err);
            res.redirect("/items");
        }
    },

    // Create new item
    createItem: async (req, res) => {
        try {
            const {
                itemName,
                itemDescription,
                itemPrice,
                itemQuantity,
                itemAuthor,
                itemISBN,
                itemCategory,
            } = req.body;

            await pool.query(
                `INSERT INTO items (name, description, price, quantity, author, isbn, category_id) 
                VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id`,
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

            const redirectUrl = req.query.category_id
                ? `/categories/${req.query.category_id}/items`
                : "/items";

            res.redirect(redirectUrl);
        } catch (err) {
            console.error("Error:", err);
            res.redirect("/items/new");
        }
    },

    // Show edit item form
    showEditItemForm: async (req, res) => {
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
                action: `/items/${id}/edit`,
                item,
                categories,
            });
        } catch (err) {
            console.error(err);
            res.send("Error: " + err);
        }
    },

    // Update item
    updateItem: async (req, res) => {
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
    },

    // Delete item
    deleteItem: async (req, res) => {
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
    },
};

module.exports = itemController;