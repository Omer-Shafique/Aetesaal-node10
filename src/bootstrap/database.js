"use strict";
exports.__esModule = true;
var Sequelize = require("sequelize");
var index_1 = require("../config/index");
var logger_1 = require("../utils/logger");
var logger = new logger_1.Logger().createLogger();
exports.Database = new Sequelize({
    host: index_1["default"].postgres.host,
    port: index_1["default"].postgres.port,
    username: index_1["default"].postgres.username,
    password: index_1["default"].postgres.password,
    database: index_1["default"].postgres.database,
    dialect: 'postgres',
    dialectOptions: {
        ssl: false
    },
    timezone: '+00:00',
    pool: {
        max: 5,
        min: 0,
        idle: 20000,
        acquire: 20000
    },
    // See https://github.com/sequelize/sequelize/issues/8417
    operatorsAliases: false,
    logging: true
});
