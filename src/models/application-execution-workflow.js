"use strict";
exports.__esModule = true;
var Sequelize = require("sequelize");
exports.define = function (sequelize) {
    var model = sequelize.define('applicationExecutionWorkflow', {
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
        applicationWorkflowId: {
            type: Sequelize.UUID,
            allowNull: false,
            references: {
                model: 'applicationWorkflow',
                key: 'id'
            }
        },
        comments: {
            type: Sequelize.JSONB,
            allowNull: true
        },
        rejectionDetails: {
            type: Sequelize.JSONB,
            allowNull: true
        },
        clarificationDetails: {
            type: Sequelize.JSONB,
            allowNull: true
        },
        clarificationUserId: {
            type: Sequelize.UUID,
            allowNull: true,
            references: {
                model: 'user',
                key: 'id'
            }
        },
        userPermissionId: {
            type: Sequelize.UUID,
            allowNull: true,
            references: {
                model: 'user',
                key: 'id'
            }
        },
        status: {
            type: Sequelize.STRING(50),
            allowNull: false
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
        model.belongsTo(models.ApplicationWorkflow);
    };
    return model;
};
