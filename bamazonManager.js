// List a set of menu options:
// Add New Product
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
        productUpdate();
      } else if (answer.viewOptions === "Add A Product") {
        // TODO
        productAdd();
      } else(answer.viewOptions === "Exit")
      //connection.end();
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

// Show users all items that have a quantity of less than 20.
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

// Allow users to update the inventory by increasing or decreasing quantities from the database.
function productUpdate() {
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
        decreaseInventory();
      } else(answer.viewOptions === "Exit")
    });
};

// Allow users to increase quantity in the database.
function addInventory() {
  inquirer
    .prompt([{
        name: "addItem",
        type: "input",
        message: "What is the item number of the product you want to add?",
        filter: Number
      },
      {
        name: "stockNumber",
        type: "input",
        message: "How much stock would you like to add?",
        filter: Number
      }
    ]).then(function (input) {
      var item = input.addItem;
      var quantity = input.stockNumber;
      var queryStr = "SELECT * FROM products WHERE ?";
      connection.query(queryStr,
        [{
            item_ID: item
          },
          {
            stock_quantity: quantity
          },
        ],
        function (err, data) {
          if (err) throw err;
          else {
            var productData = data[0];
            var updateQueryStr = "UPDATE products SET stock_quantity = " + (productData.stock_quantity + quantity) + " WHERE item_id = " + item;
            connection.query(updateQueryStr, function (err, data) {
              if (err) throw err;
              console.log("The stock has been updated.");
              console.log("\n---------------------------------------------------------------------\n");
              connection.end();
            })
          };
        })
    });
};

// Allow users to decrease quantity in the database.
function decreaseInventory() {
  inquirer
    .prompt([{
        name: "decreaseItem",
        type: "input",
        message: "What is the item number of the product you want to decrease?",
        filter: Number
      },
      {
        name: "stockNumber",
        type: "input",
        message: "How much stock would you like to delete?",
        filter: Number
      }
    ]).then(function (input) {
      var item = input.decreaseItem;
      var quantity = input.stockNumber;
      var queryStr = "SELECT * FROM products WHERE ?";
      connection.query(queryStr,
        [{
            item_ID: item
          },
          {
            stock_quantity: quantity
          },
        ],
        function (err, data) {
          if (err) throw err;
          else {
            var productData = data[0];
            var updateQueryStr = "UPDATE products SET stock_quantity = " + (productData.stock_quantity - quantity) + " WHERE item_id = " + item;
            connection.query(updateQueryStr, function (err, data) {
              if (err) throw err;
              console.log("The stock has been updated.");
              console.log("\n---------------------------------------------------------------------\n");
              connection.end();
            })
          };
        })
    });
};

// Allow users to add a new product to the inventory.
function productAdd() {
  inquirer
    .prompt([
      {
        name: "product_name",
        type: "input",
        message: "What is the name of the product you would like to add?",
      },
      {
        name: "department_name",
        type: "input",
        message: "What department is the product in?",
      },
      {
        name: "author_artist",
        type: "input",
        message: "What is the name of the author/artist?",
      },
      {
        name: "price",
        type: "input",
        message: "What is the cost of the item?",
        filter: Number
      },
      {
        name: "stock_quantity",
        type: "input",
        message: "How many items of the product would you like to stock?",
        filter: Number
      },
    ]).then(function (answers) {
      var queryStr = "INSERT INTO products SET ?";
      connection.query(queryStr, answers, function (err, res, fields) {
        if (err) throw err;
        console.log("New product has been added to the inventory.")
      })
      itemsAvailable();
    })
};

startManager();