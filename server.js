const {Restaurant, Menu, MenuItem} = require('./db/models.js')

const express = require('express');

const app = express();
const port = 3001;

app.use(express.static('public'));

app.use(express.urlencoded( {extended: true}));

//app.get are endpoints, which return dynamic content
app.get('/now', (req, res) => {
    const date = new Date();
    res.send(date.toString());
})

app.get('/flipcoin', (req, res) => {
    const coin = Math.random();
    res.send( (coin <= 0.5) ? "heads, I win": "tails, you lose");
})

app.get('/user', function(req, res) {
    response = {
        first_name: req.query.first_name,
        last_name: req.query.last_name,
        gender: req.query.gender
    };

    console.log(response);

res.send(JSON.stringify(response));
})

app.get('/restaurants', function(req, res) {
    Restaurant.findAll()
        .then(data => {
            res.send(data)
        })
})

app.get('/restaurants/:id', function(req, res) {
    Restaurant.findByPk(req.params.id, {
        include: {
            model: Menu,
            as: 'menus',
            include: {
                model: MenuItem,
                as: 'menuItems'
            }}
        })
        .then(data => {
            res.send(data)
        })
})

app.listen(port, () => {
    console.log(`server listening at http://localhost:${port}`);
})

