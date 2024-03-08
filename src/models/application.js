"use strict";
exports.__esModule = true;
var Sequelize = require("sequelize");
exports.define = function (sequelize) {
    var model = sequelize.define('application', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        shortDescription: {
            type: Sequelize.STRING(1000),
            allowNull: true
        },
        subject: {
            type: Sequelize.STRING,
            allowNull: true
        },
        userIds: {
            type: Sequelize.STRING(1000),
            allowNull: true
        },
        canAllStart: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: true
        },
        canAllEdits: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: true
        },
        editableUserIds: {
            type: Sequelize.STRING,
            allowNull: true
        },
        isPublished: {
            type: Sequelize.BOOLEAN,
            defaultValue: false
        },
        isActive: {
            type: Sequelize.BOOLEAN,
            defaultValue: true
        },
        createdAt: {
            allowNull: false,
            type: Sequelize.DATE,
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
        },
        createdBy: {
            type: Sequelize.UUID,
            allowNull: true,
            references: {
                model: 'user',
                key: 'id'
            }
        },
        updatedAt: {
            allowNull: false,
            type: Sequelize.DATE,
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
        },
        deletedAt: {
            type: Sequelize.DATE,
            allowNull: true
        },
        deletedBy: {
            type: Sequelize.UUID,
            allowNull: true,
            references: {
                model: 'user',
                key: 'id'
            }
        }
    }, {
        freezeTableName: true
    });
    model.associate = function (models) {
        model.hasMany(models.ApplicationWorkflowFieldPermission);
        model.hasMany(models.ApplicationWorkflow);
        model.hasMany(models.ApplicationFormSection);
        model.hasMany(models.ApplicationExecution);
    };
    return model;
};
