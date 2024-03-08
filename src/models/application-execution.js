"use strict";
exports.__esModule = true;
var Sequelize = require("sequelize");
exports.define = function (sequelize) {
    var model = sequelize.define('applicationExecution', {
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
        startedAt: {
            type: Sequelize.DATE,
            allowNull: false
        },
        status: {
            type: Sequelize.STRING,
            allowNull: false
        },
        title: {
            type: Sequelize.STRING,
            allowNull: true
        },
        latitude: {
            type: Sequelize.FLOAT,
            allowNull: true
        },
        longitude: {
            type: Sequelize.FLOAT,
            allowNull: true
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
        model.belongsTo(models.User, { foreignKey: 'createdBy', as: 'createdByUser' });
        model.hasMany(models.ApplicationExecutionForm);
        model.hasMany(models.ApplicationExecutionWorkflow);
    };
    return model;
};
