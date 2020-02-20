const express = require('express')
const handlebars = require('express-handlebars')
const sqlite3 = require('sqlite3').verbose();
const app = express()
const port = process.env.port || 3000

app.engine('handlebars', handlebars({
    extname: 'handlebars',
    defaultView: 'default',
    // layoutsDir: __dirname + '/views/layouts/',
    partialsDir: __dirname + '/views/partials/'
}));

app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'))

app.get('/products', (req, res) => {
    const db = new sqlite3.Database('inventory.db')
    db.serialize(function () {
        db.all("SELECT rowId as id, name, category from products", function (err, results) {
            if (err != null) {
                console.error(err.toString())
            }

            res.render('products', {
                title: 'Termékek',
                items: results
            })

        });
    });
})

app.get('/storage', (req, res) => {
    title = "Készlet"
    res.render('storage', { title: title })
})

app.get('/groups', (req, res) => {
    title = "Csoportok"
    res.render('groups', { title: title })
})


app.listen(port, console.log(`App is listening on port ${port}`))