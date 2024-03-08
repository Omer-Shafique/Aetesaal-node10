"use strict";
exports.__esModule = true;
var Sequelize = require("sequelize");
exports.define = function (sequelize) {
    var model = sequelize.define('applicationWorkflow', {
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
        type: {
            type: Sequelize.STRING,
            allowNull: false
        },
        order: {
            type: Sequelize.INTEGER,
            allowNull: true
        },
        assignTo: {
            type: Sequelize.STRING,
            allowNull: true
        },
        groupId: {
            type: Sequelize.INTEGER,
            allowNull: true,
            references: {
                model: 'group',
                key: 'id'
            }
        },
        canWithdraw: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: true
        },
        stepId: {
            type: Sequelize.UUID,
            allowNull: true,
            references: {
                model: 'applicationWorkflow',
                key: 'id'
            }
        },
        showMap: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: true
        },
        isActive: {
            type: Sequelize.BOOLEAN,
            defaultValue: true
        },
        createdBy: {
            type: Sequelize.UUID,
            allowNull: true,
            references: {
                model: 'user',
                key: 'id'
            }
        },
        updatedBy: {
            type: Sequelize.UUID,
            allowNull: true,
            references: {
                model: 'user',
                key: 'id'
            }
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
        freezeTableName: true,
        timestamps: true
    });
    model.associate = function (models) {
        model.belongsTo(models.Application);
        model.hasMany(models.ApplicationWorkflowPermission);
        model.hasMany(models.ApplicationWorkflow, { foreignKey: 'stepId', as: 'step' });
        model.hasMany(models.ApplicationExecutionWorkflow);
    };
    return model;
};
