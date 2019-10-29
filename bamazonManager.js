// List a set of menu options:
// View Products for Sale
// View Low Inventory
// Add to Inventory
// Add New Product
// If a manager selects View Products for Sale, the app should list every available item: the item IDs, names, prices, and quantities.
// If a manager selects View Low Inventory, then it should list all items with an inventory count lower than five.
// If a manager selects Add to Inventory, your app should display a prompt that will let the manager "add more" of any item currently in the store.
// If a manager selects Add New Product, it should allow the manager to add a completely new product to the store.

var mysql = require("mysql");
var inquirer = require("inquirer");
var cli = require("pixl-cli");

var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306.
  port: 3306,

  // Your username.
  user: "root",

  // Your password.
  password: "Y7A6G99L",
  database: "bamazon_db"
});

// Connection ID.
connection.connect(function (err) {
  if (err) throw err;
});

// Start the program by offering users four options: view items, view low inventory, update product, or add new product.
function startManager() {
  inquirer
    .prompt({
      name: "viewOptions",
      type: "list",
      message: "Would you like to view items, view low inventory (products below 20 units), update a product, or add a new product?",
      choices: ["View Inventory", "View Low Inventory", "Update A Product", "Add A Product", "Exit"]
    })
    .then(function (answer) {
      if (answer.viewOptions === "View Inventory") {
        itemsAvailable();
      } else if (answer.viewOptions === "View Low Inventory") {
        lowInventory();
      } else if (answer.viewOptions === "Update A Product") {
        // TODO
        productUpdate();
      } else if (answer.viewOptions === "Add A Product") {
        // TODO
        productAdd();
      } else(answer.viewOptions === "Exit")
      connection.end();
    });
};

// Show customer all available products.
var productInfo = [];

function itemsAvailable() {
  connection.query("SELECT * FROM products", function (err, res) {
    if (err) throw err;
    for (var i = 0; i < res.length; i++) {
      productInfo.push([
        res[i].item_id,
        res[i].product_name,
        res[i].author_artist,
        res[i].department_name,
        "$" + res[i].price,
        res[i].stock_quantity + " available",
      ]);
    }
    var rows = [
      ["ID", "Product", "Author/Artist", "Department", "Price", "Quantity"],
      ...productInfo
    ];
    // Prints the inventory in a table format.
    cli.print(
      cli.table(rows) + "\n"
    );
    productInfo = []
  });
};

function lowInventory() {
  var query = "SELECT * FROM products WHERE stock_quantity < 20";
  connection.query(query, function (err, res) {
    if (err) throw err;
    for (var i = 0; i < res.length; i++) {
      productInfo.push([
        res[i].item_id,
        res[i].product_name,
        res[i].author_artist,
        res[i].department_name,
        "$" + res[i].price,
        res[i].stock_quantity + " available",
      ]);
    }
    var rows = [
      ["ID", "Product", "Author/Artist", "Department", "Price", "Quantity"],
      ...productInfo
    ];
    // Prints the inventory in a table format.
    cli.print(
      cli.table(rows) + "\n"
    );
    productInfo = []
  });
};

function productUpdate (answer) {
  inquirer
    .prompt({
      name: "viewOptions",
      type: "list",
      message: "Would you like to update inventory?",
      choices: ["Add Inventory", "Delete Inventory", "Exit"]
    })
    .then(function (answer) {
      if (answer.viewOptions === "Add Inventory") {
        addInventory();
      } else if (answer.viewOptions === "Delete Inventory") {
        // TODO
        deleteInventory();
      } else(answer.viewOptions === "Exit")
      connection.end();
    });
}

startManager();

var addInventory = function() {

	inquirer.prompt([
		{
			name: "item_id",
			type: "input",
			message: "Enter product ID where you would like to add stock."
		},
		{
			name: "stock",
			type: "input",
			message: "How much stock would you like to add?"
		}
	]).then(function(answer) {
		connection.query("SELECT * FROM products", function(err, results) {
			var chosenItem;
			for (var i = 0; i < results.length; i++) {
				if (results[i].item_id === parseInt(answer.item_id)) {
					chosenItem = results[i];
			var updatedStock = parseInt(chosenItem.stock_quantity) + parseInt(answer.stock);
			connection.query("UPDATE products SET ? WHERE ?", [{
				stock_quantity: updatedStock
			}, {
				item_id: answer.item_id
			}], function (err, res) {
				if (err) {
					throw err;
				} else {
          // TODO
					selectAction();
				}
			});
			
		});

	});
};