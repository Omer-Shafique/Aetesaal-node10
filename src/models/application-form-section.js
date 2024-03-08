"use strict";
exports.__esModule = true;
var Sequelize = require("sequelize");
exports.define = function (sequelize) {
    var model = sequelize.define('applicationFormSection', {
        id: {
            type: Sequelize.UUID,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        applicationId: {
            type: Sequelize.UUID,
            references: {
                model: 'application',
                key: 'id'
            }
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        helpText: {
            type: Sequelize.STRING(1000),
            allowNull: true
        },
        type: {
            type: Sequelize.STRING,
            allowNull: false
        },
        order: {
            type: Sequelize.INTEGER,
            allowNull: true
        },
        isActive: {
            type: Sequelize.BOOLEAN,
            defaultValue: true
        }
    }, {
        freezeTableName: true,
        timestamps: true
    });
    model.associate = function (models) {
        model.belongsTo(models.Application);
        model.hasMany(models.ApplicationFormField);
        model.hasMany(models.ApplicationWorkflowFieldPermission);
    };
    return model;
};
