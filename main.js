const express = require('express')
const handlebars = require('express-handlebars')
const app = express()
const port = process.env.port || 3000

const absPath='C:/Users/szabo1anna130/Desktop/braininghub/sza-inventory/public'




app.engine( 'handlebars', handlebars( {
    extname: 'handlebars',
    defaultView: 'default',
    // layoutsDir: __dirname + '/views/layouts/',
    partialsDir: __dirname + '/views/partials/'
}));

app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'))

app.get('/products', (req, res)=> {
    title = "Termékek"
    res.render('products', {title: title})
})

app.get('/storage', (req, res)=> {
    title = "Készlet"
    res.render('storage', {title: title})
})

app.get('/groups', (req, res)=> {
    title = "Csoportok"
    res.render('groups', {title: title})
})


app.listen(port, console.log(`App is listening on port ${port}`))