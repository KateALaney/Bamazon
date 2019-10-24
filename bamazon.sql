DROP DATABASE IF EXISTS bamazon_db;

CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE products (
item_id INTEGER AUTO_INCREMENT NOT NULL,
PRIMARY KEY (item_id),
product_name VARCHAR (255) NULL,
department_name VARCHAR (255) NULL,
price DECIMAL (10,2) NULL,
stock_quantity INTEGER NULL
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Eloquent Javascript", "Books", 16.95, 10), ("HTML & CSS", "Books", 22.95, 15), ("Javascript & JQuery", "Books", 22.95, 15), ("Theft By Finding", "Books", 35.99, 25), ("Helen & Troy's Epic Road Quest", "Books", 12.55, 100),
("Starry Night", "Art", 150.00, 5), ("Vitruvian Man", "Art", 200.00, 10), ("Mona Lisa", "Art", 150.00, 6), ("David", "Art", 250.00, 10), ("Wheatfield with Crows", "Art", 250.00, 10),
("I Wish I Had An Angel", "Music", 25.99, 150), ("Enter Sandman", "Music", 25.99, 125), ("Rapunzel", "Music", 18.99, 100), ("Snuff", "Music", 22.95, 140), ("Beethoven's Fifth Symphony", "Music", 35.99, 125);

SELECT * FROM products;

ALTER USER 'root'@'localhost' IDENTIFIED BY 'Y7A6G99L';
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'Y7A6G99L';