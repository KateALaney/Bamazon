# Bamazon

## Introduction ##
Bamazon is a CLI application that allows users to participate in a storefront experience (like Amazon).  It utilizes MySQL and Node to take in user input, as well as and query and update a database.
### Before Running Application ###
You will need to install the `inquirer` and `pixl-cli` packages.  The password necessary for opening and running the `.sql` file in MySQL is in the `bamazonCustomer.js` file.
## Customer View ##
The customer view offers customers the ability to view and purchase products, updates the inventory accordingly, and displays the total cost of the customer's purchase.
<br></br>
This is the entry menu the customer sees on opening the program.
<br></br>
![Customer View Intro](images/CustomerViewIntro.png)
<br></br>
This shows the view of all products when the customer selects "view".  Once "view" has been selected, users are then given the option to make a purchase or exit the program.
<br></br>
![Customer View Select](images/CustomerViewSelect.png)
<br></br>
This shows what happens when the customer selects "purchase".  The customer is prompted to choose the item number of the product they want to purchase, and then the quantity of that product.  If there is enough product in stock, they are told their purchase has been a success, and are given the total cost of their purchase.  The quantity is then updated in the stock database.
<br></br>
![Customer View Complete](images/CustomerViewComplete.png)
<br></br>
This last view is what happens when a user attempts to purchase a product that is no longer in stock, or when they attempt to purchase more items than are available.  They are given the option to return to the main menu to either make a purchase or exit.
<br></br>
![Out of Stock](images/OutofStock.png)

## Manager View ##
The manager view offers managers the ability to view all products for sale, view low inventory (inventory with less than 20 items in stock), add or delete stock, and add new products to the inventory.
<br></br>
This is the entry menu the manager sees on opening the program.
<br></br>
![Manager View Intro](images/ManagerViewIntro.png)
<br></br>
This is the view if "View Inventory" is selected.
<br></br>
![Manager View Inventory](images/ManagerViewInventory.png)
<br></br>
If "View Low Inventory" is selected, all products with less than 20 items in stock are shown.
<br></br>
![Manager Low Inventory](images/ManagerLowInventory.png)
<br></br>
The next view allows managers to either increase or decrease the number of products in stock.
<br></br>
![Manager Update Inventory](images/ManagerUpdateInventory.png)
<br></br>
If "Add Inventory" is selected, the manager is able to increase the stock for a product.
<br></br>
![Manager Add Inventory](images/ManagerAddInventory.png)
<br></br>
If "Delete Inventory" is selected, the manager is able to decrease the stock for a product.
<br></br>
![Manager Delete Inventory](images/ManagerDeleteInventory.png)
<br></br>
The last view allows managers to add a new product to the inventory.  This is the before image showing products as they currently exist:
<br></br>
![Manager Before Add](images/ManagerBeforeAdd.png)
<br></br>
This shows the view for adding a new product and the results of the product being added.
<br></br>
![Manager After Add](images/ManagerAfterAdd.png)
<br></br>
## Technologies Used
1. Javascript
2. Node.js
3. MySQL
