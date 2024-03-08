"use strict";
exports.__esModule = true;
var Sequelize = require("sequelize");
exports.define = function (sequelize) {
    var model = sequelize.define('applicationWorkflowFieldPermission', {
        id: {
            type: Sequelize.UUID,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        applicationId: {
            type: Sequelize.UUID,
            allowNull: false,
            references: {
                model: 'application',
                key: 'id'
            }
        },
        applicationWorkflowId: {
            type: Sequelize.UUID,
            allowNull: true,
            references: {
                model: 'applicationWorkflow',
                key: 'id'
            }
        },
        applicationFormSectionId: {
            type: Sequelize.UUID,
            allowNull: true,
            references: {
                model: 'applicationFormSection',
                key: 'id'
            }
        },
        applicationFormFieldId: {
            type: Sequelize.UUID,
            allowNull: true,
            references: {
                model: 'applicationFormField',
                key: 'id'
            }
        },
        permission: {
            type: Sequelize.STRING,
            allowNull: false
        },
        type: {
            type: Sequelize.STRING,
            allowNull: true
        },
        conditions: {
            type: Sequelize.JSONB,
            allowNull: true
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
        model.belongsTo(models.Application);
        model.belongsTo(models.ApplicationFormSection);
        model.belongsTo(models.ApplicationFormField);
    };
    return model;
};
