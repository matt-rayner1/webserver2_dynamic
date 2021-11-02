const {Sequelize, DataTypes, Model} = require('sequelize');

const sequelize = new Sequelize('database', 'username', 'password', {
    dialect: 'sqlite',
    storage: '/home/user0/multiverse_tasks/webserver2_dynamic/db/restuarants-seq.sqlite'
});

module.exports = {sequelize, DataTypes, Model};