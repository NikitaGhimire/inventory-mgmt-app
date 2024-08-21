-- Insert categories
INSERT INTO categories (name, description) VALUES
('Fiction', 'Books that contain stories created from the imagination of the author.'),
('Non-Fiction', 'Books that provide factual information and real-life events.'),
('Mystery', 'Books that involve solving a crime or uncovering a secret.'),
('Science Fiction', 'Books that explore futuristic concepts and advanced technology.'),
('Fantasy', 'Books that include magical elements and mythical creatures.')
ON CONFLICT (name) DO NOTHING;

-- Insert items
INSERT INTO items (name, description, price, quantity, category_id, author, isbn) VALUES
('The Great Gatsby', 'A novel written by American author F. Scott Fitzgerald.', 10.99, 100, 1, 'F. Scott Fitzgerald', '9780743273565'),
('Sapiens: A Brief History of Humankind', 'A book by Yuval Noah Harari exploring the history of humanity.', 15.99, 50, 2, 'Yuval Noah Harari', '9780062316110'),
('Gone Girl', 'A thriller novel by Gillian Flynn about a woman who goes missing.', 12.99, 75, 3, 'Gillian Flynn', '9780307588371'),
('Dune', 'A science fiction novel by Frank Herbert set in a distant future.', 14.99, 60, 4, 'Frank Herbert', '9780441013593'),
('Harry Potter and the Sorcerer''s Stone', 'The first book in J.K. Rowling''s Harry Potter series.', 9.99, 200, 5, 'J.K. Rowling', '9780590353427');
