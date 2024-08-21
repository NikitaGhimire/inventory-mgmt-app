Description
This Inventory Management App is a comprehensive solution designed for managing inventory items and categories. Developed using Express, EJS, Node.js, and PostgreSQL, it provides a robust platform to handle CRUD operations for both items and categories. Whether you’re managing groceries, car parts, baby toys, or any other inventory, this application allows users to create, read, update, and delete records efficiently.

Features
Category Management: Create, view, update, and delete categories.
Item Management: Create, view, update, and delete items within categories.
Dynamic Forms: Add new items with categories, including the ability to view and select existing categories or add new ones.
Database Integration: PostgreSQL is used for data storage and management.

Technologies Used
Express: Web framework for Node.js
EJS: Templating engine for rendering views
Node.js: JavaScript runtime environment
PostgreSQL: Relational database management system
NPM: Package manager for Node.js

Usage
Home Page: Navigate to the home page to view and manage inventory categories and items.
View Categories: Access all categories and manage them as needed.
View Items: Access all items, view details, and manage them within their categories.
Add New Item: Use the form to add new items to a category.
Edit Item: Update details of existing items.
Delete Item: Remove items from the inventory.
Add New Category: Create new categories to better organize items.

Database Schema
Categories Table
id (INTEGER, PRIMARY KEY)
name (VARCHAR, UNIQUE, NOT NULL)
description(TEXT, NOT NULL)

Items Table
id (INTEGER, PRIMARY KEY)
name (VARCHAR, NOT NULL)
description (TEXT)
price (NUMERIC, NOT NULL)
quantity (INTEGER, NOT NULL)
author (VARCHAR)
isbn (VARCHAR, UNIQUE)
category_id (INTEGER, FOREIGN KEY referencing Categories)

Contribution
Feel free to fork the repository and submit pull requests. For any issues or feature requests, please open an issue on the GitHub repository.

License
This project is licensed under the MIT License - see the LICENSE file for details.

