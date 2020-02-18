const express = require('express')
const Handlebars = require('express-handlebars')
const app = express()
const port = process.env.port || 3000

const absPath='C:/Users/szabo1anna130/Desktop/braininghub/sza-inventory/public'

app.engine('handlebars', Handlebars());
app.set('view engine', 'handlebars');
//Handlebars.registerPartial("header", "{{header}}");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'))

app.get('/products', (req, res)=> {
    res.render('products')
})


app.listen(port, console.log(`App is listening on port ${port}`))