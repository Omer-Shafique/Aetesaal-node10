"use strict";
exports.__esModule = true;
var Sequelize = require("sequelize");
exports.define = function (sequelize) {
    var model = sequelize.define('userGroup', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        groupId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: 'group',
                key: 'id'
            }
        },
        userId: {
            type: Sequelize.UUIDV4,
            allowNull: false,
            references: {
                model: 'user',
                key: 'id'
            }
        },
        isActive: Sequelize.BOOLEAN
    }, {
        freezeTableName: true
    });
    model.associate = function (models) {
        model.belongsTo(models.User);
        model.belongsTo(models.Group);
    };
    return model;
};
