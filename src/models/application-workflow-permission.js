"use strict";
exports.__esModule = true;
var Sequelize = require("sequelize");
exports.define = function (sequelize) {
    var model = sequelize.define('applicationWorkflowPermission', {
        id: {
            type: Sequelize.UUID,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        applicationWorkflowId: {
            type: Sequelize.UUID,
            allowNull: false,
            references: {
                model: 'applicationWorkflow',
                key: 'id'
            }
        },
        userId: {
            type: Sequelize.UUID,
            allowNull: false,
            references: {
                model: 'user',
                key: 'id'
            }
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
        updatedAt: {
            allowNull: false,
            type: Sequelize.DATE,
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
        }
    }, {
        freezeTableName: true
    });
    model.associate = function (models) {
        model.belongsTo(models.ApplicationWorkflow);
    };
    return model;
};
