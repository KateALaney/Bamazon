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

// Start the program by offering users three options: view items, purchase an item, or exit the program.
function startCustomer() {
  inquirer
    .prompt({
      name: "viewPurchase",
      type: "list",
      message: "Would you like to view available items or make a purchase?",
      choices: ["View", "Purchase", "Exit"]
    })
    .then(function (answer) {
      if (answer.viewPurchase === "View") {
        itemsAvailable();
      } else if (answer.viewPurchase === "Purchase") {
        promptUserPurchase();
      } else {
        connection.end();
      }
    });
};

// Offer users the opportunity to either purchase an item or exit the program.
function purchaseOrExit() {
  inquirer
    .prompt({
      name: "purchaseExit",
      type: "list",
      message: "Would you like to make a purchase or exit?",
      choices: ["Purchase", "Exit"]
    })
    .then(function (response) {
      if (response.purchaseExit === "Purchase") {
        promptUserPurchase();
      } else if (response.purchaseExit === "Exit") {
        console.log("Thank you for shopping with us!")
        connection.end();
      }
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
  purchaseOrExit();
};

// Offers users the ability to purchase an item, and asks how many they need.  Then checks request against available inventory, and returns either: a) a positive confirmation
// of purchase, including total cost; or b) a message that there is not enough inventory, and asks user to place purchase again.
function promptUserPurchase() {
  inquirer.prompt([{
      type: "input",
      name: "item_id",
      message: "Please enter the item ID which you would like to purchase. (Please use item numbers only.)",
      filter: Number
    },
    {
      type: "input",
      name: "quantity",
      message: "How many units of the item would you like to purchase?",
      filter: Number
    }
  ]).then(function (input) {
    var item = input.item_id;
    var quantity = input.quantity;
    var queryStr = "SELECT * FROM products WHERE ?";
    connection.query(queryStr, {
      item_id: item
    }, function (err, data) {
      if (err) throw err;
      if (data.length === 0) {
        console.log("ERROR: Invalid item ID. Please select a valid item ID.");
        itemsAvailable();

      } else {
        var productData = data[0];
        if (quantity <= productData.stock_quantity) {
          console.log("The product you requested is in stock.");
          var updateQueryStr = "UPDATE products SET stock_quantity = " + (productData.stock_quantity - quantity) + " WHERE item_id = " + item;
          connection.query(updateQueryStr, function (err, data) {
            if (err) throw err;
            console.log("Your order has been placed. Your total is $" + productData.price * quantity);
            console.log("Thank you for shopping with us!");
            console.log("\n---------------------------------------------------------------------\n");
            connection.end();
          })
        } else {
          console.log("Sorry, there are not enough units in stock.  Please place a new order.");
          console.log("\n---------------------------------------------------------------------\n");
          itemsAvailable();
        }
      };
    });
  });
};

startCustomer();

module.exports = customerView;