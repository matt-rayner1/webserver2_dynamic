const {sequelize} = require('./sequelize_index');
const {Restaurant, Menu, MenuItem} = require('./models');
const data = require('./restaurants.json');

sequelize
    .sync()
    .then(async function () {
        for (let i = 0; i < data.length; i++) {
            //populate restaurants
            var restaurant = await Restaurant.create({name: data[i].name, image: data[i].image})

            //populate menus
            for (let j = 0; j < data[i].menus.length; j++) {
                var menu = await Menu.create( {title: data[i].menus[j].title})
                await restaurant.addMenu(menu)

                //populate menu items
                for (let k = 0; k < data[i].menus[j].items.length; k++) {
                    var menuItem = await MenuItem.create( {name: data[i].menus[j].items[k].name, price: data[i].menus[j].items[k].price})
                    await menu.addMenuItem(menuItem)
                }
            }
        }
    })