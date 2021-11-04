const {Restaurant, Menu, MenuItem} = require('./db/models.js');

//for UPDATE and DELETE methods
const methodOverride = require('method-override');

const express = require('express');
const { check, validationResult } = require('express-validator');

const app = express();
const port = 3001;

app.use(express.static('public'));

app.use(express.urlencoded( {extended: true}));
app.use(express.json());
//add this to use methodOverride properly
app.use(methodOverride('_method'));


// BASIC ENDPOINT EXAMPLES
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


//RESTAURANT CRUD EXAMPLES

//read all
app.get('/restaurants', (req, res) => {
    Restaurant.findAll()
        .then(data => {
            res.send(data)
        })
})

//read 1 restaurant
app.get('/restaurants/:id', (req, res) => {
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

//Create restaurant
app.post(
    '/restaurants',
    //name must be alphanumeric and less than 50 characters
    check('name').isAlphanumeric(),
    check('name').isByteLength({min:0, max:50}),
    //image url must be valid url
    check('image').isURL(),
    (req, res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            res.sendStatus(403);
        } else {
            Restaurant.create( {name: req.body.name, image: req.body.image});
            res.sendStatus(201);
        }
    }
)

//Delete restaurant
app.delete(
    '/restaurants',
    check('name').isAlphanumeric(),
    check('name').isByteLength({min:0, max:50}),
    (req, res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            res.sendStatus(403);
        } else {
            Restaurant.destroy({where: {name:req.body.name}});
            res.sendStatus(202);
        }
    }
)

//Update restaurant
app.put(
    '/restaurants',
    //name must be alphanumeric and less than 50 characters
    check('name').isAlphanumeric(),
    check('name').isByteLength({min:0, max:50}),
    //image url must be valid url
    check('image').isURL(),
    (req, res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            res.sendStatus(403);
        } else {Restaurant.update(
                {name: req.body.name, image: req.body.image},
                {where: {id: req.body.id}}
            )
            res.sendStatus(202);
        }
    }
)

//Create local listener
app.listen(port, () => {
    console.log(`server listening at http://localhost:${port}`);
})

