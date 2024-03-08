"use strict";
exports.__esModule = true;
var Sequelize = require("sequelize");
exports.define = function (sequelize) {
    var model = sequelize.define('notification', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        userId: {
            type: Sequelize.UUID,
            references: {
                model: 'user',
                key: 'id'
            }
        },
        title: {
            type: Sequelize.STRING(100),
            allowNull: false
        },
        body: {
            type: Sequelize.STRING(500),
            allowNull: false
        },
        type: {
            type: Sequelize.STRING(50),
            allowNull: false
        },
        isRead: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        createdAt: {
            allowNull: false,
            type: Sequelize.DATE,
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
        },
        updatedAt: {
            allowNull: false,
            type: Sequelize.DATE,
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
        }
    }, {
        freezeTableName: true
    });
    model.associate = function (models) {
        model.belongsTo(models.User);
    };
    return model;
};
