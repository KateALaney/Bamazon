var mysql = require("mysql");
var inquirer = require("inquirer");
var cli = require("pixl-cli");
const chalk = require("chalk");

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
function start() {
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
        purchaseItem();
      } else {
        connection.end();
      }
    });
}

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
        purchaseItem();
      } else if (response.purchaseExit === "Exit") {
        connection.end();
      }
    });
}

// Show customer all available products.
var productInfo = [];

function itemsAvailable() {
  connection.query("SELECT * FROM products", function (err, res) {
    if (err) throw err;
    // console.log("ID | Item | Department | Price | Units Available")
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
}

// Offes users the ability to purchase an item.
function purchaseItem() {
  connection.query("SELECT * FROM products", function (err, res) {
    if (err) throw err;
    inquirer
      .prompt([{
        name: "choice",
        type: "rawlist",
        choices: function () {
          var choiceArray = [];
          for (var i = 0; i < res.length; i++) {
            choiceArray.push(res[i].product_name);
          }
          return choiceArray;
        },
        message: "What item would you like to purchase? (Please use item ID.)"
      }, ])
      .then(function (answer) {
        var chosenItem;
        for (var i = 0; i < res.length; i++) {
          if (res[i].item_id === answer.choice) {
            chosenItem = res[i];
          }
        }

        // // determine if bid was high enough
        // if (chosenItem.highest_bid < parseInt(answer.bid)) {
        //   // bid was high enough, so update db, let the user know, and start over
        //   connection.query(
        //     "UPDATE auctions SET ? WHERE ?",
        //     [
        //       {
        //         highest_bid: answer.bid
        //       },
        //       {
        //         id: chosenItem.id
        //       }
        //     ],
        //     function(error) {
        //       if (error) throw err;
        //       console.log("Bid placed successfully!");
        //       start();
        //     }
        //   );
        // }
        // else {
        //   // bid wasn't high enough, so apologize and start over
        //   console.log("Your bid was too low. Try again...");
      });
  })
}

start();


// Ask customer how many units of item customer wants to buy.

// Check to see if enough items of product are available.

// Fulfill the customer's order.

// Update database to show remaining quantity.

// Show the customer total cost of their purchase.