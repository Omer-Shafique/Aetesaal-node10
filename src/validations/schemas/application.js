"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
var Joi = require("joi");
var application_1 = require("../../enum/application");
exports.saveApplication = {
    id: Joi.string().uuid().allow([null, '']),
    name: Joi.string().required(),
    shortDescription: Joi.string().required(),
    userIds: Joi.string().allow([null, '']),
    canAllStart: Joi.boolean().required(),
    canAllEdits: Joi.boolean().required(),
    editableUserIds: Joi.string().allow([null, ''])
};
exports.deleteApplication = {
    id: Joi.string().uuid().required()
};
exports.saveApplicationForm = {
    id: Joi.string().uuid().allow([null, '']),
    name: Joi.string().required(),
    helpText: Joi.string().allow([null, '']),
    type: Joi.string().required(),
    applicationFormFields: Joi.array().items(Joi.object({
        id: Joi.string().uuid().allow([null, '']),
        name: Joi.string().required(),
        helpText: Joi.string().allow([null, '']),
        fieldId: Joi.string().required(),
        key: Joi.string().required(),
        type: Joi.string().required(),
        icon: Joi.string().allow([null, '']),
        templateName: Joi.string().allow([null, '']),
        defaultValue: Joi.string().allow([null, '']),
        templateOptions: Joi.any()
    }))
};
exports.saveApplicationFormArray = {
    payload: Joi.array().items(Joi.object(__assign({}, exports.saveApplicationForm))).min(1)
};
exports.saveApplicationWorkflow = {
    id: Joi.string().uuid().allow([null, '']),
    name: Joi.string().required(),
    type: Joi.string().required(),
    stepId: Joi.string().uuid().allow([null, '']),
    assignTo: Joi.string().allow([null, '']),
    userIds: Joi.array().items(Joi.string().uuid())
};
exports.saveApplicationWorkflowArray = {
    payload: Joi.array().items(Joi.object(__assign({}, exports.saveApplicationWorkflow))).min(1)
};
exports.saveWorkflowFieldPermission = {
    id: Joi.string().uuid().allow([null, '']),
    applicationWorkflowId: Joi.string().uuid().allow([null, '']),
    applicationFormSectionId: Joi.string().allow([null, '']),
    applicationFormFieldId: Joi.string().allow([null, '']),
    permission: Joi.string().required(),
    type: Joi.string().required(),
    conditions: Joi.any()
};
exports.saveWorkflowFieldPermissionArray = {
    payload: Joi.array().items(Joi.object(__assign({}, exports.saveWorkflowFieldPermission))).min(1),
    applicationId: Joi.string().uuid().required()
};
exports.saveApplicationExecution = {
    id: Joi.string().uuid().allow([null, '']),
    status: Joi.string().allow([null, '']),
    applicationExecutionForms: Joi.array().items(Joi.object({
        id: Joi.string().uuid().allow([null, '']),
        applicationFormFieldId: Joi.string().uuid().required(),
        value: Joi.any().required()
    }))
};
exports.saveApplicationExecutionForm = {
    id: Joi.string().uuid().required(),
    applicationExecutionForms: Joi.array().items(Joi.object({
        id: Joi.string().uuid().allow([null, '']),
        applicationFormFieldId: Joi.string().uuid().required(),
        value: Joi.any().required()
    }))
};
exports.saveApplicationExecutionArray = {
    payload: Joi.array().items(Joi.object(__assign({}, exports.saveApplicationExecution))).min(1),
    applicationId: Joi.string().uuid().required()
};
exports.publishApplication = {
    id: Joi.string().uuid().required(),
    editableUserIds: Joi.array().items(Joi.string().uuid().allow('')).allow(null),
    canAllEdits: Joi.boolean().required()
};
exports.publishApplicationExecution = {
    applicationId: Joi.string().uuid().required(),
    applicationExecutionId: Joi.string().uuid().required()
};
exports.saveApplicationExecutionWorkflow = {
    id: Joi.string().uuid().required(),
    applicationId: Joi.string().uuid().required(),
    applicationExecutionId: Joi.string().uuid().required(),
    comments: Joi.array().items(Joi.object({
        userId: Joi.string().uuid(),
        userName: Joi.string(),
        time: Joi.date().required(),
        comment: Joi.string().required()
    })),
    status: Joi.string().required().valid([
        application_1.ApplicationExecutionStatus.DRAFT,
        application_1.ApplicationExecutionStatus.CLARITY,
        application_1.ApplicationExecutionStatus.REJECT,
        application_1.ApplicationExecutionStatus.APPROVED
    ]),
    rejectionDetails: Joi.when('status', {
        is: application_1.ApplicationExecutionStatus.REJECT,
        then: Joi.object({
            userId: Joi.string().uuid().required(),
            comment: Joi.string().required()
        }).required()
    }),
    clarificationDetails: Joi.when('status', {
        is: application_1.ApplicationExecutionStatus.CLARITY,
        then: Joi.object({
            userId: Joi.string().uuid().required(),
            comment: Joi.string().required()
        }).required()
    })
};
exports.publishApplicationExecutionWorkflow = {
    applicationExecutionWorkflowId: Joi.string().uuid().required(),
    applicationId: Joi.string().uuid().required(),
    applicationExecutionId: Joi.string().uuid().required()
};
exports.getExecutionByLoggedInUserId = {
    loggedInUserId: Joi.string().uuid().required(),
    type: Joi.string().valid([
        application_1.ApplicationWorkflowType.APPROVAL,
        application_1.ApplicationWorkflowType.INPUT,
    ]).required(),
    status: Joi.string().valid([
        application_1.ApplicationExecutionStatus.DRAFT,
    ]).optional()
};
exports.getExecutionInProcessLoggedInUserId = {
    loggedInUserId: Joi.string().uuid().required(),
    status: Joi.string().required().valid([
        application_1.ApplicationExecutionStatus.DRAFT,
        application_1.ApplicationExecutionStatus.APPROVED,
        application_1.ApplicationExecutionStatus.REJECT,
        application_1.ApplicationExecutionStatus.CLARITY,
        application_1.ApplicationExecutionStatus.IN_PROGRESS
    ])
};
exports.getExecutionParticipatedLoggedInUserId = {
    loggedInUserId: Joi.string().uuid().required(),
    searchText: Joi.string().optional().allow(null, '')
};
exports.getApplicationExecutionTimeReport = {
    applicationId: Joi.string().uuid().required(),
    startDate: Joi.date().required(),
    endDate: Joi.date().required()
};
exports.reassignWorkflow = {
    applicationId: Joi.string().uuid().required(),
    executionId: Joi.string().uuid().required(),
    workflowId: Joi.string().uuid().required(),
    userId: Joi.string().uuid().required()
};
exports.withdraw = {
    loggedInUserId: Joi.string().uuid().required(),
    executionId: Joi.string().uuid().required()
};
exports.getExecutionParticipatedUsers = {
    loggedInUserId: Joi.string().uuid().required(),
    executionId: Joi.string().uuid().required()
};
exports.deleteExecutionByApplicationId = {
    loggedInUserId: Joi.string().uuid().required(),
    applicationId: Joi.string().uuid().required(),
    startDate: Joi.date().required(),
    endDate: Joi.date().required(),
    status: Joi.string().required()
};
