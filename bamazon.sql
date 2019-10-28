DROP DATABASE IF EXISTS bamazon_db;

CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE products (
item_id INTEGER AUTO_INCREMENT NOT NULL,
PRIMARY KEY (item_id),
product_name VARCHAR (255) NULL,
author_artist VARCHAR (255) NULL,
department_name VARCHAR (255) NULL,
price DECIMAL (10,2) NULL,
stock_quantity INTEGER NULL
);

INSERT INTO products (product_name, author_artist, department_name, price, stock_quantity)
VALUES ("Eloquent Javascript", "Haverbeke", "Books", 16.95, 40), ("HTML & CSS", "Duckett", "Books", 22.95, 50), ("Javascript & JQuery", "Duckett", "Books", 22.95, 35), ("Theft By Finding", "Sedaris", "Books", 35.99, 25), ("Helen & Troy's Epic Road Quest", "Martinez", "Books", 12.55, 10),
("Starry Night (Print)", "Van Gogh", "Art", 149.99, 10), ("Wheatfield with Crows (Print)", "Van Gogh", "Art", 249.99, 10), ("Vitruvian Man (Print)", "Da Vinci", "Art", 199.99, 10), ("Mona Lisa (Print)", "Da Vinci", "Art", 149.99, 10), ("David (Statue)", "Michelangelo", "Art", 249.99, 10),
("Once", "Nightwish", "Music", 25.99, 15), ("Metallica", "Metallica", "Music", 25.99, 25), ("Enchant", "Emilie Autumn", "Music", 18.99, 10), ("All Hope Is Gone", "Slipknot", "Music", 22.95, 40), ("Fifth Symphony", "Beethoven", "Music", 35.99, 25);

SELECT * FROM products;

ALTER USER 'root'@'localhost' IDENTIFIED BY 'Y7A6G99L';
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'Y7A6G99L';