"use strict";
exports.__esModule = true;
var Sequelize = require("sequelize");
exports.define = function (sequelize) {
    var model = sequelize.define('lookupData', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        lookupId: {
            type: Sequelize.INTEGER,
            references: {
                model: 'lookup',
                key: 'id'
            }
        },
        display: {
            type: Sequelize.STRING,
            allowNull: false
        },
        value: {
            type: Sequelize.STRING,
            allowNull: false
        },
        isActive: Sequelize.BOOLEAN,
        createdAt: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
        },
        updatedAt: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
        },
        createdBy: {
            type: Sequelize.UUID,
            references: {
                model: 'user',
                key: 'id'
            }
        }
    }, {
        freezeTableName: true
    });
    model.associate = function (models) {
        model.belongsTo(models.Lookup);
    };
    return model;
};
