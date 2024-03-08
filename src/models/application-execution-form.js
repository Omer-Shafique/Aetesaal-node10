"use strict";
exports.__esModule = true;
var Sequelize = require("sequelize");
exports.define = function (sequelize) {
    var model = sequelize.define('applicationExecutionForm', {
        id: {
            type: Sequelize.UUID,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        applicationExecutionId: {
            type: Sequelize.UUID,
            allowNull: false,
            references: {
                model: 'applicationExecution',
                key: 'id'
            }
        },
        applicationFormFieldId: {
            type: Sequelize.UUID,
            allowNull: false,
            references: {
                model: 'applicationFormField',
                key: 'id'
            }
        },
        fieldId: {
            type: Sequelize.STRING,
            allowNull: true
        },
        value: {
            type: Sequelize.STRING(1000),
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
        model.belongsTo(models.ApplicationExecution);
        model.belongsTo(models.ApplicationFormField);
    };
    return model;
};
