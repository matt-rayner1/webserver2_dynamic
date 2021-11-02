const {sequelize, DataTypes, Model} = require('./sequelize_index');

class Restaurant extends Model {
    //methods
}
Restaurant.init({
    name: DataTypes.STRING,
    image: DataTypes.STRING,
}, {
    sequelize,
    timestamps: false,
});

class Menu extends Model {
    //methods
}
Menu.init({
    title: DataTypes.STRING,
}, {
    sequelize,
    timestamps: false, 
});

class MenuItem extends Model {
    //methods
}
MenuItem.init({
    name: DataTypes.STRING,
    price: DataTypes.FLOAT,
}, {
    sequelize,
    timestamps: false,
});

Restaurant.hasMany(Menu, {as: 'menus', foreignKey: 'restaurant_id'})
Menu.belongsTo(Restaurant, {foreignKey: 'restaurant_id'})
Menu.hasMany(MenuItem, {as: 'menuItems', foreignKey: 'menu_id'})
MenuItem.belongsTo(Menu, {foreignKey: 'menu_id'})

module.exports = {Restaurant, Menu, MenuItem};
