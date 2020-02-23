const express = require('express');
const handlebars = require('express-handlebars');
const sqlite3 = require('sqlite3').verbose();
const app = express();
const port = process.env.port || 3000
const db = new sqlite3.Database('newInventory.db');

const hbshelpers = require("handlebars-helpers");
const multihelpers = hbshelpers();

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.engine('handlebars', handlebars({
    helpers: multihelpers,
    extname: 'handlebars',
    defaultView: 'default',
    // layoutsDir: __dirname + '/views/layouts/',
    partialsDir: __dirname + '/views/partials/'
}));


app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'))


let newId = 0;
let newCatId = 0;
app.get('/products', (req, res) => {
    
    db.serialize(function () {

        
        db.all("SELECT productId as id, name, category, description from product", function (err, results) {
            if (err != null) {
                console.error(err.toString())
            }

            res.render('products', {
                title: 'Termékek',
                items: results
            })

        });
    });
});
generateId()
function generateId() {
    db.all("SELECT MAX(productId) as maxId from product", function(err, result) {
    if(err != null){
        console.log(err.toString());
    }
    const maxId =(result[0].maxId)
    console.log(maxId)
    newId = maxId+1
    console.log(newId)
    
});
}

generateCategoryId()
function generateCategoryId() {
    db.all("SELECT MAX(categoryId) as maxCatId from category", function(err, result) {
    if(err != null){
        console.log(err.toString());
    }
    const maxCatId =(result[0].maxCatId)
    console.log(maxCatId)
    newCatId = maxCatId+1
    console.log(newCatId)
    
});
}
app.post('/addproduct', (req,res) => {
    const {newproduct,newgroup, newProductDesc} = req.body;
    let count = 1;
  
        db.serialize(function () {    
            console.log(newId)
            db.run("INSERT INTO product VALUES (?, ?, ?, ?)",[newId,newproduct,newgroup,newProductDesc]);
            db.run("INSERT INTO inventory VALUES (?, ?)",[newId, count]);
            db.all("SELECT productId as id, name, category, description from product", function (err, results) {
                if (err != null) {
                    console.error(err.toString())
                }
                console.log(results);
            });
        });
        newId++
        res.redirect('products');
    })

    


app.post('/editproduct', (req,res) => {
    console.log(req.body);
    const {product_id,newname,newcategory, newProductDesc} = req.body;

    db.serialize(function () {    
        
        db.run(`UPDATE product SET name = "${newname}", category = "${newcategory}", description = "${newProductDesc}" where productId = ${product_id}`);        
    })
    res.redirect('products');
})

app.post('/deleteproduct', (req,res) => {
    console.log(req.body);
    const {product_id} = req.body;

    db.serialize(function () {    
       
        db.run(`DELETE FROM product WHERE productId = ${product_id}`);
        db.run(`DELETE FROM inventory WHERE productId = ${product_id}`);            
    })
    res.redirect('products');
})

app.get('/storage', (req, res) => {
    title = "Készlet"
    db.serialize(function () {
        db.all("SELECT inventory.*, product.name from inventory INNER JOIN product WHERE inventory.productId = product.productId", function (err, results) {
            if (err != null) {
                console.error(err.toString())
            }

            res.render('storage', {
                title: 'Készlet',
                items: results
            })

        });
    });
    
})

app.get('/category', (req, res) => {
    title = "Csoportok"
    db.serialize(function () {
        db.all("SELECT * FROM category", function (err, results) {
            if (err != null) {
                console.error(err.toString())
            }

            res.render('groups', {
                title: title,
                items: results
            })

        });
    });
    
  
})

app.post('/newcategory', (req,res) => {
    const {categoryId,newCategory} = req.body;
  
        db.serialize(function () {    
            console.log(newCatId)
            db.run("INSERT INTO category VALUES (?, ?)",[newCatId,newCategory]);
       
            db.all("SELECT * FROM category", function (err, results) {
                if (err != null) {
                    console.error(err.toString())
                }
                console.log(results);
            });
        });
        newCatId++
        res.redirect('category');
    })

app.listen(port, console.log(`App is listening on port ${port}`))