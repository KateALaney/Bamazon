var mysql = require("mysql");
var inquirer = require("inquirer");

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
    console.log("connected as id " + connection.threadId + "\n");
    itemsAvailable();
});


// Show customer all available products.
function itemsAvailable() {
    connection.query("SELECT * FROM products", function(err, res) {
      if (err) throw err;
      for (var i = 0; i < res.length; i++) {
        console.log(res[i].item_id + " | " + res[i].product_name + " | " + res[i].department_name + " | $" + res[i].price + " | " + res[i].stock_quantity + " available");
      }
      console.log("-----------------------------------");
    });
    connection.end();
  }

// Ask customer ID number of item customer wants to buy.

// Ask customer how many units of item customer wants to buy.

// Check to see if enough items of product are available.

// Fulfill the customer's order:

// Update database to show remaining quantity.

// Show the customer total cost of their purchase.