const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('newInventory.db')

db.serialize(function () {
    db.run("CREATE TABLE IF NOT EXISTS product (productId INTEGER(30), name VARCHAR(100), category VARCHAR(60), description TEXT(2000))");
    db.run("CREATE TABLE IF NOT EXISTS inventory (productId INTEGER(30), count VARCHAR(30))");
    db.run("CREATE TABLE IF NOT EXISTS category (categoryId INTEGER(30), name VARCHAR(100))");

});



// db.close();