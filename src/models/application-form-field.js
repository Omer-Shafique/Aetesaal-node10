"use strict";
exports.__esModule = true;
var Sequelize = require("sequelize");
exports.define = function (sequelize) {
    var model = sequelize.define('applicationFormField', {
        id: {
            type: Sequelize.UUID,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        applicationFormSectionId: {
            type: Sequelize.UUID,
            references: {
                model: 'applicationFormSection',
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
        fieldId: {
            type: Sequelize.STRING,
            allowNull: false
        },
        key: {
            type: Sequelize.STRING,
            allowNull: false
        },
        type: {
            type: Sequelize.STRING,
            allowNull: false
        },
        defaultValue: {
            type: Sequelize.STRING,
            allowNull: true
        },
        icon: {
            type: Sequelize.STRING,
            allowNull: true
        },
        templateName: {
            type: Sequelize.STRING,
            allowNull: true
        },
        templateOptions: {
            type: Sequelize.JSONB,
            allowNull: true
        },
        lookupId: {
            type: Sequelize.INTEGER,
            allowNull: true
        },
        order: {
            type: Sequelize.INTEGER,
            allowNull: false
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
        model.belongsTo(models.ApplicationFormSection);
        // model.belongsTo(models.Lookup);
        model.hasMany(models.ApplicationWorkflowFieldPermission);
    };
    return model;
};
