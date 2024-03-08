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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
exports.__esModule = true;
var boom = require("boom");
var _ = require('lodash');
var moment = require("moment");
var fs = require("fs");
var index_1 = require("../validations/index");
var helper = require("../utils/helper");
var joiSchema = require("../validations/schemas/application");
var applicationRepo = require("../repositories/application");
var applicationWorkflowRepo = require("../repositories/application-workflow");
var applicationFormFieldRepo = require("../repositories/application-form-field");
var applicationExecutionRepo = require("../repositories/application-execution");
var applicationExecutionFormRepo = require("../repositories/application-execution-form");
var applicationExecutionWorkflowRepo = require("../repositories/application-execution-workflow");
var applicationSectionRepo = require("../repositories/application-form-section");
var applicationWorkflowFieldPermissionRepo = require("../repositories/application-workflow-field-permission");
var applicationWorkflowPermissionRepo = require("../repositories/application-workflow-permission");
var userRepo = require("../repositories/user");
var departmentRepo = require("../repositories/department");
var officeLocationRepo = require("../repositories/office-location");
var groupRepo = require("../repositories/group");
var role_1 = require("../enum/role");
var application_1 = require("../enum/application");
var application_2 = require("../constants/application");
var fcm_1 = require("./fcm");
exports.getAll = function (loggedInUser) { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, applicationExecutionRepo.getAll(loggedInUser.userId, false)];
    });
}); };
exports.getById = function (executionId) { return __awaiter(_this, void 0, void 0, function () {
    var execution;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, applicationExecutionRepo.findById(executionId)];
            case 1:
                execution = _a.sent();
                if (!execution) {
                    throw boom.badRequest('Invalid execution id');
                }
                return [2 /*return*/, execution];
        }
    });
}); };
exports.getByApplicationId = function (applicationId) { return __awaiter(_this, void 0, void 0, function () {
    var application;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, applicationRepo.findById(applicationId)];
            case 1:
                application = _a.sent();
                if (!application) {
                    throw boom.badRequest('Invalid application id');
                }
                return [2 /*return*/, applicationExecutionRepo.getByApplicationId(applicationId)];
        }
    });
}); };
exports.getDetailedExecutionById = function (executionId, loggedInUser, status) { return __awaiter(_this, void 0, void 0, function () {
    var execution, transformedExecution;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, applicationExecutionRepo.findById(executionId)];
            case 1:
                execution = _a.sent();
                if (!execution) {
                    throw boom.badRequest('Invalid execution id');
                }
                return [4 /*yield*/, transformExecutionData([execution], loggedInUser, status)];
            case 2:
                transformedExecution = _a.sent();
                if (!transformedExecution || !transformedExecution.length) {
                    throw boom.badRequest('Not allowed');
                }
                else {
                    return [2 /*return*/, transformedExecution[0]];
                }
                return [2 /*return*/];
        }
    });
}); };
exports.getExecutionByLoggedInUserId = function (loggedInUser, type, status) { return __awaiter(_this, void 0, void 0, function () {
    var dbApplicationExecutions;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, index_1.validate({ loggedInUserId: loggedInUser.userId, type: type, status: status }, joiSchema.getExecutionByLoggedInUserId)];
            case 1:
                _a.sent();
                dbApplicationExecutions = [];
                if (!(status === application_1.ApplicationExecutionStatus.DRAFT)) return [3 /*break*/, 3];
                return [4 /*yield*/, applicationExecutionRepo.getDraftApplicationExecutions(loggedInUser.userId)];
            case 2:
                dbApplicationExecutions = _a.sent();
                return [3 /*break*/, 5];
            case 3: return [4 /*yield*/, applicationExecutionRepo.
                    getApplicationExecutionsForApproval(type)];
            case 4:
                dbApplicationExecutions = _a.sent();
                _a.label = 5;
            case 5: return [2 /*return*/, transformExecutionData(dbApplicationExecutions, loggedInUser, status)];
        }
    });
}); };
exports.getExecutionInProcessLoggedInUserId = function (loggedInUser, status) { return __awaiter(_this, void 0, void 0, function () {
    var dbApplicationExecutions;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, index_1.validate({ loggedInUserId: loggedInUser.userId, status: status }, joiSchema.getExecutionInProcessLoggedInUserId)];
            case 1:
                _a.sent();
                return [4 /*yield*/, applicationExecutionRepo.getApplicationExecutionInProcess(loggedInUser.userId, status)];
            case 2:
                dbApplicationExecutions = _a.sent();
                return [2 /*return*/, transformExecutionData(dbApplicationExecutions, loggedInUser, status)];
        }
    });
}); };
exports.getExecutionInProcessLoggedInUserIdByQuery = function (loggedInUser, status, applicationId, type, startDate, endDate) { return __awaiter(_this, void 0, void 0, function () {
    var isAdmin, dbApplicationExecutions, isClarity, response, groupMap, departmentMap, locationMap, workflowPermissionsMap, _i, dbApplicationExecutions_1, ex, shouldContinue;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, index_1.validate({ loggedInUserId: loggedInUser.userId, status: status }, joiSchema.getExecutionInProcessLoggedInUserId)];
            case 1:
                _a.sent();
                isAdmin = false;
                if (startDate) {
                    startDate = moment(startDate + ' 00:00:00').add(-5, 'h').toISOString();
                }
                if (endDate) {
                    endDate = moment(endDate + ' 23:59:59').add(-5, 'h').toISOString();
                }
                if (startDate && endDate && loggedInUser.roles) {
                    isAdmin = loggedInUser.roles.includes(role_1.Role.SUPER_ADMIN);
                }
                dbApplicationExecutions = [];
                if (!!type) return [3 /*break*/, 6];
                if (!(status === application_1.ApplicationExecutionStatus.DRAFT ||
                    status === application_1.ApplicationExecutionStatus.IN_PROGRESS)) return [3 /*break*/, 3];
                return [4 /*yield*/, applicationExecutionRepo.getDraftApplicationExecutionQuery(loggedInUser.userId, status, applicationId, startDate, endDate)];
            case 2:
                dbApplicationExecutions = _a.sent();
                return [3 /*break*/, 5];
            case 3:
                isClarity = false;
                if (status === application_1.ApplicationExecutionStatus.CLARITY) {
                    isClarity = true;
                }
                return [4 /*yield*/, applicationExecutionRepo.
                        getApplicationExecutionInProcessQuery({
                        userId: loggedInUser.userId,
                        status: status,
                        applicationId: applicationId, isClarity: isClarity,
                        startDate: startDate,
                        endDate: endDate,
                        isAdmin: isAdmin
                    })];
            case 4:
                dbApplicationExecutions = _a.sent();
                _a.label = 5;
            case 5: return [3 /*break*/, 8];
            case 6: return [4 /*yield*/, applicationExecutionRepo
                    .getApplicationExecutionByWorkflowTypeAndStatusQuery(status, type, applicationId, startDate, endDate)];
            case 7:
                dbApplicationExecutions = _a.sent();
                _a.label = 8;
            case 8:
                response = [];
                if (status === application_1.ApplicationExecutionStatus.CLARITY ||
                    ((status === application_1.ApplicationExecutionStatus.DRAFT ||
                        status === application_1.ApplicationExecutionStatus.IN_PROGRESS ||
                        status === application_1.ApplicationExecutionStatus.APPROVED) && !type)) {
                    response = dbApplicationExecutions;
                    return [2 /*return*/, response];
                }
                groupMap = {};
                departmentMap = {};
                locationMap = {};
                workflowPermissionsMap = {};
                _i = 0, dbApplicationExecutions_1 = dbApplicationExecutions;
                _a.label = 9;
            case 9:
                if (!(_i < dbApplicationExecutions_1.length)) return [3 /*break*/, 13];
                ex = dbApplicationExecutions_1[_i];
                if (!(ex.userPermissionId === loggedInUser.userId)) return [3 /*break*/, 10];
                response.push(ex);
                return [3 /*break*/, 12];
            case 10: return [4 /*yield*/, checkWorkflowPermissionQuery(ex, loggedInUser.userId, {
                    groupMap: groupMap,
                    departmentMap: departmentMap,
                    locationMap: locationMap,
                    workflowPermissionsMap: workflowPermissionsMap
                })];
            case 11:
                shouldContinue = _a.sent();
                if (shouldContinue) {
                    response.push(ex);
                }
                _a.label = 12;
            case 12:
                _i++;
                return [3 /*break*/, 9];
            case 13: return [2 /*return*/, response];
        }
    });
}); };
exports.getExecutionParticipatedLoggedInUserId = function (loggedInUser) { return __awaiter(_this, void 0, void 0, function () {
    var dbApplicationExecutions;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, index_1.validate({ loggedInUserId: loggedInUser.userId }, joiSchema.getExecutionParticipatedLoggedInUserId)];
            case 1:
                _a.sent();
                return [4 /*yield*/, applicationExecutionRepo.getApprovedApplicationExecutions(loggedInUser.userId)];
            case 2:
                dbApplicationExecutions = _a.sent();
                return [2 /*return*/, transformExecutionData(dbApplicationExecutions, loggedInUser, undefined)];
        }
    });
}); };
exports.getExecutionWithdrawLoggedInUserId = function (loggedInUser, payload) { return __awaiter(_this, void 0, void 0, function () {
    var isAdmin;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, index_1.validate({ loggedInUserId: loggedInUser.userId }, joiSchema.getExecutionParticipatedLoggedInUserId)];
            case 1:
                _a.sent();
                isAdmin = loggedInUser.roles && loggedInUser.roles.includes(role_1.Role.SUPER_ADMIN);
                if (payload.startDate) {
                    payload.startDate = moment(payload.startDate + ' 00:00:00').add(-5, 'h').toISOString();
                }
                if (payload.endDate) {
                    payload.endDate = moment(payload.endDate + ' 23:59:59').add(-5, 'h').toISOString();
                }
                return [2 /*return*/, applicationExecutionRepo.getApplicationExecutionInProcessQuery({
                        userId: loggedInUser.userId,
                        status: application_1.ApplicationExecutionStatus.WITHDRAW,
                        applicationId: payload.applicationId,
                        startDate: payload.startDate,
                        endDate: payload.endDate,
                        isAdmin: isAdmin
                    })];
        }
    });
}); };
exports.getInProgressExecutions = function (loggedInUser, applicationId, startDate, endDate) { return __awaiter(_this, void 0, void 0, function () {
    var forAdmin, dbApplicationExecutions;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                forAdmin = loggedInUser.roles && loggedInUser.roles.includes(role_1.Role.SUPER_ADMIN);
                if (startDate) {
                    startDate = moment(startDate + ' 00:00:00').add(-5, 'h').toISOString();
                }
                if (endDate) {
                    endDate = moment(endDate + ' 23:59:59').add(-5, 'h').toISOString();
                }
                return [4 /*yield*/, applicationExecutionRepo.getAllExecutionsByStatus(loggedInUser.userId, [application_1.ApplicationExecutionStatus.DRAFT, application_1.ApplicationExecutionStatus.IN_PROGRESS], applicationId, forAdmin, startDate, endDate)];
            case 1:
                dbApplicationExecutions = _a.sent();
                return [2 /*return*/, dbApplicationExecutions];
        }
    });
}); };
exports.getExecutionParticipatedLoggedInUserIdQuery = function (loggedInUser, searchText, startDate, endDate) { return __awaiter(_this, void 0, void 0, function () {
    var dbApplicationExecutions;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, index_1.validate({ loggedInUserId: loggedInUser.userId, searchText: searchText }, joiSchema.getExecutionParticipatedLoggedInUserId)];
            case 1:
                _a.sent();
                if (startDate) {
                    startDate = moment(startDate + ' 00:00:00').add(-5, 'h').toISOString();
                }
                if (endDate) {
                    endDate = moment(endDate + ' 23:59:59').add(-5, 'h').toISOString();
                }
                return [4 /*yield*/, applicationExecutionRepo.getParticipatedApplicationExecutionQuery(loggedInUser.userId, searchText, startDate, endDate)];
            case 2:
                dbApplicationExecutions = _a.sent();
                return [2 /*return*/, dbApplicationExecutions];
        }
    });
}); };
var transformExecutionData = function (dbApplicationExecutions, user, status) { return __awaiter(_this, void 0, void 0, function () {
    var applicationExecutions, _loop_1, _i, dbApplicationExecutions_2, execution;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                applicationExecutions = [];
                _loop_1 = function (execution) {
                    var plainExecution, executionWorkflow, shouldContinue, sections, fieldPermissions, draftExecution, latestWorkflowId, executionWorkflow, title, _loop_2, _i, sections_1, sectionInstance;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                plainExecution = execution.get({ plain: true });
                                if (!plainExecution.application) {
                                    return [2 /*return*/, "continue"];
                                }
                                if (!(plainExecution.applicationExecutionWorkflows &&
                                    plainExecution.applicationExecutionWorkflows.length)) return [3 /*break*/, 2];
                                plainExecution.applicationExecutionWorkflows = _.sortBy(plainExecution.applicationExecutionWorkflows, 'createdAt');
                                executionWorkflow = plainExecution && plainExecution.applicationExecutionWorkflows && plainExecution.applicationExecutionWorkflows[plainExecution.applicationExecutionWorkflows.length - 1];
                                if (!executionWorkflow || !executionWorkflow.applicationWorkflowId) {
                                    return [2 /*return*/, "continue"];
                                }
                                if (status === 'participated') {
                                    plainExecution.applicationExecutionWorkflows = plainExecution && plainExecution.applicationExecutionWorkflows && plainExecution.applicationExecutionWorkflows.filter((function (ex) {
                                        return ex.createdBy === user.userId || ex.updatedBy === user.userId;
                                    }));
                                    executionWorkflow = plainExecution && plainExecution.applicationExecutionWorkflows && plainExecution.applicationExecutionWorkflows[0];
                                }
                                if (!(executionWorkflow.status !== application_1.ApplicationExecutionStatus.APPROVED &&
                                    executionWorkflow.status !== application_1.ApplicationExecutionStatus.REJECT &&
                                    status !== application_1.ApplicationExecutionStatus.WITHDRAW &&
                                    status !== application_1.ApplicationExecutionStatus.IN_PROGRESS &&
                                    status !== application_1.ApplicationExecutionStatus.CLARITY &&
                                    status !== 'participated')) return [3 /*break*/, 2];
                                return [4 /*yield*/, checkWorkflowPermission(plainExecution, executionWorkflow.applicationWorkflowId, user.userId)];
                            case 1:
                                shouldContinue = _a.sent();
                                if (shouldContinue) {
                                    return [2 /*return*/, "continue"];
                                }
                                _a.label = 2;
                            case 2: return [4 /*yield*/, applicationSectionRepo.getByApplicationId(execution.applicationId)];
                            case 3:
                                sections = _a.sent();
                                plainExecution.application.applicationFormSections = [];
                                return [4 /*yield*/, applicationWorkflowFieldPermissionRepo.
                                        getByApplicationId(execution.applicationId)];
                            case 4:
                                fieldPermissions = _a.sent();
                                draftExecution = (plainExecution.applicationExecutionWorkflows &&
                                    plainExecution.applicationExecutionWorkflows.length) ?
                                    plainExecution.applicationExecutionWorkflows[plainExecution.applicationExecutionWorkflows.length - 1] : null;
                                latestWorkflowId = draftExecution ? draftExecution.applicationWorkflowId : null;
                                // in case of clarity need to transform only selected workflows data
                                if (status === application_1.ApplicationExecutionStatus.CLARITY) {
                                    executionWorkflow = (plainExecution.applicationExecutionWorkflows &&
                                        plainExecution.applicationExecutionWorkflows.length) ?
                                        plainExecution.applicationExecutionWorkflows[plainExecution.applicationExecutionWorkflows.length - 1] : null;
                                    if (executionWorkflow && executionWorkflow.clarificationDetails.workflowId !== undefined) {
                                        latestWorkflowId = executionWorkflow.clarificationDetails.workflowId === -1 ? null :
                                            executionWorkflow.clarificationDetails.workflowId;
                                    }
                                }
                                title = plainExecution.application.subject;
                                _loop_2 = function (sectionInstance) {
                                    var section = sectionInstance.get({ plain: true });
                                    if (status === application_1.ApplicationExecutionStatus.APPROVED) {
                                        plainExecution.application.applicationFormSections.push(section);
                                        return "continue";
                                    }
                                    var type = status ? application_2.PERMISSION_STATUS_MAPPING[status]
                                        || application_1.ApplicationWorkflowPermissionType.WORKFLOW : application_1.ApplicationWorkflowPermissionType.WORKFLOW;
                                    if (!latestWorkflowId && status === application_1.ApplicationExecutionStatus.CLARITY) {
                                        type = application_1.ApplicationWorkflowPermissionType.NEW;
                                    }
                                    var applicationWorkflowId = type !== application_1.ApplicationWorkflowPermissionType.WORKFLOW
                                        ? null : latestWorkflowId;
                                    if (!fieldPermissions || !fieldPermissions.length) {
                                        return "continue";
                                    }
                                    var workflowPermission = fieldPermissions.find(function (per) { return per.type === type && per.applicationFormSectionId === section.id &&
                                        per.applicationWorkflowId === applicationWorkflowId; });
                                    if (!workflowPermission || workflowPermission.permission === application_1.ApplicationWorkflowFieldPermission.HIDDEN) {
                                        return "continue";
                                    }
                                    if (section.applicationFormFields && section.applicationFormFields.length) {
                                        section.applicationFormFields = section.applicationFormFields.filter(function (field) {
                                            if (plainExecution.applicationExecutionForms && title) {
                                                // setting title
                                                var formField = plainExecution.applicationExecutionForms
                                                    .find(function (f) { return f.applicationFormFieldId === field.id; });
                                                title = title.replace("{" + field.fieldId + "}", formField ? formField.value : '');
                                                plainExecution.title = title;
                                            }
                                            if (!plainExecution ||
                                                !plainExecution.application ||
                                                !fieldPermissions) {
                                                return true;
                                            }
                                            var workflowPermission = fieldPermissions.find(function (per) { return per.type === type && per.applicationFormFieldId === field.id &&
                                                per.applicationWorkflowId === applicationWorkflowId; });
                                            if (workflowPermission &&
                                                workflowPermission.permission === application_1.ApplicationWorkflowFieldPermission.HIDDEN) {
                                                return false;
                                            }
                                            field.permission = workflowPermission ? workflowPermission.permission : undefined;
                                            return true;
                                        });
                                    }
                                    plainExecution.application.applicationFormSections.push(section);
                                };
                                for (_i = 0, sections_1 = sections; _i < sections_1.length; _i++) {
                                    sectionInstance = sections_1[_i];
                                    _loop_2(sectionInstance);
                                }
                                applicationExecutions.push(plainExecution);
                                return [2 /*return*/];
                        }
                    });
                };
                _i = 0, dbApplicationExecutions_2 = dbApplicationExecutions;
                _a.label = 1;
            case 1:
                if (!(_i < dbApplicationExecutions_2.length)) return [3 /*break*/, 4];
                execution = dbApplicationExecutions_2[_i];
                return [5 /*yield**/, _loop_1(execution)];
            case 2:
                _a.sent();
                _a.label = 3;
            case 3:
                _i++;
                return [3 /*break*/, 1];
            case 4: return [2 /*return*/, applicationExecutions];
        }
    });
}); };
var checkWorkflowPermission = function (plainExecution, applicationWorkflowId, userId) { return __awaiter(_this, void 0, void 0, function () {
    var shouldContinue, applicationWorkflow, hasPermission, assignTo, fieldId_1, _a, department, officeLocation, userGroups, hasUser, field;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                shouldContinue = false;
                return [4 /*yield*/, applicationWorkflowRepo.findById(applicationWorkflowId)];
            case 1:
                applicationWorkflow = _b.sent();
                if (!applicationWorkflow) return [3 /*break*/, 16];
                if (!!applicationWorkflow.assignTo) return [3 /*break*/, 2];
                if (applicationWorkflow.applicationWorkflowPermissions) {
                    hasPermission = applicationWorkflow.applicationWorkflowPermissions.
                        find(function (per) { return per.userId === userId; });
                    if (!hasPermission) {
                        shouldContinue = false;
                    }
                }
                else {
                    shouldContinue = false;
                }
                return [3 /*break*/, 16];
            case 2:
                assignTo = applicationWorkflow.assignTo;
                fieldId_1 = '';
                if (assignTo.includes('field_')) {
                    fieldId_1 = assignTo.replace('field_', '');
                    assignTo = application_1.ApplicationWorkflowAssignTo.FIELD;
                }
                _a = assignTo;
                switch (_a) {
                    case application_1.ApplicationWorkflowAssignTo.INITIATOR: return [3 /*break*/, 3];
                    case application_1.ApplicationWorkflowAssignTo.MANAGER: return [3 /*break*/, 4];
                    case application_1.ApplicationWorkflowAssignTo.DEPARTMENT_HEAD: return [3 /*break*/, 5];
                    case application_1.ApplicationWorkflowAssignTo.LOCATION_HEAD: return [3 /*break*/, 8];
                    case application_1.ApplicationWorkflowAssignTo.GROUP: return [3 /*break*/, 11];
                    case application_1.ApplicationWorkflowAssignTo.FIELD: return [3 /*break*/, 15];
                }
                return [3 /*break*/, 16];
            case 3:
                if (plainExecution.createdBy !== userId) {
                    shouldContinue = true;
                }
                return [3 /*break*/, 16];
            case 4:
                if (plainExecution.createdByUser &&
                    plainExecution.createdByUser.managerId !== userId) {
                    shouldContinue = true;
                }
                return [3 /*break*/, 16];
            case 5:
                if (!(plainExecution.createdByUser &&
                    plainExecution.createdByUser.departmentId)) return [3 /*break*/, 7];
                return [4 /*yield*/, departmentRepo.
                        findById(plainExecution.createdByUser.departmentId)];
            case 6:
                department = _b.sent();
                if (department &&
                    department.userId !== userId) {
                    shouldContinue = true;
                }
                _b.label = 7;
            case 7: return [3 /*break*/, 16];
            case 8:
                if (!(plainExecution.createdByUser &&
                    plainExecution.createdByUser.officeLocationId)) return [3 /*break*/, 10];
                return [4 /*yield*/, officeLocationRepo.
                        findById(plainExecution.createdByUser.officeLocationId)];
            case 9:
                officeLocation = _b.sent();
                if (officeLocation &&
                    officeLocation.userId !== userId) {
                    shouldContinue = true;
                }
                _b.label = 10;
            case 10: return [3 /*break*/, 16];
            case 11:
                if (!!applicationWorkflow.groupId) return [3 /*break*/, 12];
                shouldContinue = true;
                return [3 /*break*/, 14];
            case 12: return [4 /*yield*/, groupRepo.findUserGroupByGroupId(applicationWorkflow.groupId)];
            case 13:
                userGroups = _b.sent();
                hasUser = userGroups.find(function (userGroup) { return userGroup.userId === userId; });
                if (!hasUser) {
                    shouldContinue = true;
                }
                _b.label = 14;
            case 14: return [3 /*break*/, 16];
            case 15:
                if (plainExecution.applicationExecutionForms) {
                    field = plainExecution.applicationExecutionForms.find(function (field) { return field.fieldId === fieldId_1; });
                    if (field && field.value !== userId) {
                        shouldContinue = true;
                    }
                }
                return [3 /*break*/, 16];
            case 16: return [2 /*return*/, shouldContinue];
        }
    });
}); };
var checkWorkflowPermissionQuery = function (execution, userId, maps) { return __awaiter(_this, void 0, void 0, function () {
    var shouldContinue, _a, _b, hasPermission, assignTo, fieldId, _c, _d, _e, _f, _g, _h, _j, hasUser, field;
    return __generator(this, function (_k) {
        switch (_k.label) {
            case 0:
                shouldContinue = true;
                if (!!execution.assignTo) return [3 /*break*/, 3];
                if (!!maps.workflowPermissionsMap[execution.applicationWorkflowId]) return [3 /*break*/, 2];
                _a = maps.workflowPermissionsMap;
                _b = execution.applicationWorkflowId;
                return [4 /*yield*/, applicationWorkflowPermissionRepo
                        .findByWorkflowId(execution.applicationWorkflowId)];
            case 1:
                _a[_b] = _k.sent();
                _k.label = 2;
            case 2:
                if (maps.workflowPermissionsMap[execution.applicationWorkflowId]) {
                    hasPermission = maps.workflowPermissionsMap[execution.applicationWorkflowId].find(function (per) {
                        return per.userId === userId;
                    });
                    if (!hasPermission) {
                        shouldContinue = false;
                    }
                }
                else {
                    shouldContinue = false;
                }
                return [3 /*break*/, 22];
            case 3:
                assignTo = execution.assignTo;
                fieldId = '';
                if (assignTo.includes('field_')) {
                    fieldId = assignTo.replace('field_', '');
                    assignTo = application_1.ApplicationWorkflowAssignTo.FIELD;
                }
                _c = assignTo;
                switch (_c) {
                    case application_1.ApplicationWorkflowAssignTo.INITIATOR: return [3 /*break*/, 4];
                    case application_1.ApplicationWorkflowAssignTo.MANAGER: return [3 /*break*/, 5];
                    case application_1.ApplicationWorkflowAssignTo.DEPARTMENT_HEAD: return [3 /*break*/, 6];
                    case application_1.ApplicationWorkflowAssignTo.LOCATION_HEAD: return [3 /*break*/, 10];
                    case application_1.ApplicationWorkflowAssignTo.GROUP: return [3 /*break*/, 14];
                    case application_1.ApplicationWorkflowAssignTo.FIELD: return [3 /*break*/, 19];
                }
                return [3 /*break*/, 21];
            case 4:
                if (execution.createdBy !== userId) {
                    shouldContinue = false;
                }
                return [3 /*break*/, 22];
            case 5:
                if (execution.managerId !== userId) {
                    shouldContinue = false;
                }
                return [3 /*break*/, 22];
            case 6:
                if (!execution.departmentId) return [3 /*break*/, 9];
                if (!!maps.departmentMap[execution.departmentId]) return [3 /*break*/, 8];
                _d = maps.departmentMap;
                _e = execution.departmentId;
                return [4 /*yield*/, departmentRepo.findById(execution.departmentId)];
            case 7:
                _d[_e] = _k.sent();
                _k.label = 8;
            case 8:
                if (maps.departmentMap[execution.departmentId] &&
                    maps.departmentMap[execution.departmentId].userId !== userId) {
                    shouldContinue = false;
                }
                _k.label = 9;
            case 9: return [3 /*break*/, 22];
            case 10:
                if (!execution.officeLocationId) return [3 /*break*/, 13];
                if (!!maps.locationMap[execution.officeLocationId]) return [3 /*break*/, 12];
                _f = maps.locationMap;
                _g = execution.officeLocationId;
                return [4 /*yield*/, officeLocationRepo.findById(execution.officeLocationId)];
            case 11:
                _f[_g] = _k.sent();
                _k.label = 12;
            case 12:
                if (maps.locationMap[execution.officeLocationId] &&
                    maps.locationMap[execution.officeLocationId].userId !== userId) {
                    shouldContinue = false;
                }
                _k.label = 13;
            case 13: return [3 /*break*/, 22];
            case 14:
                if (!!execution.groupId) return [3 /*break*/, 15];
                shouldContinue = false;
                return [3 /*break*/, 18];
            case 15:
                if (!!maps.groupMap[execution.groupId]) return [3 /*break*/, 17];
                _h = maps.groupMap;
                _j = execution.groupId;
                return [4 /*yield*/, groupRepo.findUserGroupByGroupId(execution.groupId)];
            case 16:
                _h[_j] = _k.sent();
                _k.label = 17;
            case 17:
                hasUser = maps.groupMap[execution.groupId].find(function (userGroup) { return userGroup.userId === userId; });
                if (!hasUser) {
                    shouldContinue = false;
                }
                _k.label = 18;
            case 18: return [3 /*break*/, 22];
            case 19: return [4 /*yield*/, applicationExecutionFormRepo.
                    getByApplicationExecutionIdAndFieldId(execution.id, fieldId)];
            case 20:
                field = _k.sent();
                if (!field || (field && field.value !== userId)) {
                    shouldContinue = false;
                }
                return [3 /*break*/, 22];
            case 21:
                shouldContinue = false;
                _k.label = 22;
            case 22: return [2 /*return*/, shouldContinue];
        }
    });
}); };
exports.getExecutionWorkflowsCount = function (loggedInUserId) { return __awaiter(_this, void 0, void 0, function () {
    var resp, response, participatedIds;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                resp = {
                    approval: 0,
                    inputRequest: 0,
                    clarification: 0,
                    draft: 0,
                    approved: 0,
                    reject: 0,
                    participated: 0
                };
                return [4 /*yield*/, Promise.all([
                        applicationExecutionRepo.getApplicationExecutionInProcessCount(loggedInUserId, application_1.ApplicationExecutionStatus.APPROVED),
                        applicationExecutionRepo.getApplicationExecutionInProcessCount(loggedInUserId, application_1.ApplicationExecutionStatus.REJECT),
                        applicationExecutionRepo.getApplicationExecutionInProcessCount(loggedInUserId, application_1.ApplicationExecutionStatus.CLARITY),
                        applicationExecutionRepo.getApplicationExecutionsForApprovalCount(loggedInUserId, application_1.ApplicationWorkflowType.APPROVAL),
                        applicationExecutionRepo.getApplicationExecutionsForApprovalCount(loggedInUserId, application_1.ApplicationWorkflowType.INPUT),
                        applicationExecutionRepo.getDraftApplicationExecutionsCount(loggedInUserId),
                        applicationExecutionRepo.getApplicationExecutionParticipatedIds(loggedInUserId)
                    ])];
            case 1:
                response = _a.sent();
                participatedIds = response[6][0].map(function (execution) { return execution.id; });
                resp = {
                    approval: response[3],
                    inputRequest: response[4],
                    clarification: response[2],
                    draft: response[5],
                    approved: response[0],
                    reject: response[1],
                    participated: participatedIds.length
                };
                return [2 /*return*/, resp];
        }
    });
}); };
exports.getExecutionParticipatedUsers = function (loggedInUser, executionId) { return __awaiter(_this, void 0, void 0, function () {
    var users, userIds, updatedByUserIds, dbUsers;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, index_1.validate({ loggedInUserId: loggedInUser.userId, executionId: executionId }, joiSchema.getExecutionParticipatedUsers)];
            case 1:
                _a.sent();
                return [4 /*yield*/, applicationExecutionRepo.getParticipatedUsersByExecutionId(executionId)];
            case 2:
                users = _a.sent();
                userIds = users.map(function (user) { return user.createdBy; });
                updatedByUserIds = users.filter(function (user) { return user.updatedBy; }).map(function (user) { return user.updatedBy; });
                userIds = updatedByUserIds.concat(userIds);
                return [4 /*yield*/, userRepo.findByIds(userIds)];
            case 3:
                dbUsers = _a.sent();
                return [2 /*return*/, dbUsers];
        }
    });
}); };
exports.saveApplicationExecution = function (applicationId, loggedInUserId, applicationExecution) { return __awaiter(_this, void 0, void 0, function () {
    var savedApp, savedApplicationExecution, formFieldIds, savedApplicationFormFields, execution, title, _i, _a, field;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0: return [4 /*yield*/, index_1.validate(applicationExecution, joiSchema.saveApplicationExecution)];
            case 1:
                _b.sent();
                return [4 /*yield*/, applicationRepo.findById(applicationId)];
            case 2:
                savedApp = _b.sent();
                if (!savedApp) {
                    throw boom.badRequest('Invalid application id');
                }
                if (!applicationExecution.id) return [3 /*break*/, 4];
                return [4 /*yield*/, applicationExecutionRepo.findById(applicationExecution.id)];
            case 3:
                savedApplicationExecution = _b.sent();
                if (!savedApplicationExecution) {
                    throw boom.badRequest('Invalid application execution id');
                }
                if (savedApplicationExecution.status === application_1.ApplicationExecutionStatus.APPROVED) {
                    throw boom.badRequest('Application execution is already published');
                }
                applicationExecution.startedAt = savedApplicationExecution.startedAt;
                applicationExecution.status = savedApplicationExecution.status;
                applicationExecution.updatedBy = loggedInUserId;
                return [3 /*break*/, 5];
            case 4:
                applicationExecution.startedAt = new Date();
                applicationExecution.status = application_1.ApplicationExecutionStatus.DRAFT;
                applicationExecution.createdBy = loggedInUserId;
                _b.label = 5;
            case 5:
                formFieldIds = applicationExecution.applicationExecutionForms ?
                    applicationExecution.applicationExecutionForms.map(function (ex) { return ex.applicationFormFieldId; }) : [];
                formFieldIds = _.reject(formFieldIds, helper.rejectUndefinedOrNull);
                return [4 /*yield*/, applicationFormFieldRepo.findByIds(formFieldIds)];
            case 6:
                savedApplicationFormFields = _b.sent();
                if (savedApplicationFormFields.length !== _.uniq(formFieldIds).length) {
                    throw boom.badRequest('Invalid application form field id');
                }
                // validation for required in form fields
                applicationExecution.applicationId = applicationId;
                return [4 /*yield*/, applicationExecutionRepo.saveApplicationExecution(applicationExecution)];
            case 7:
                execution = _b.sent();
                applicationExecution.id = execution.id;
                if (!applicationExecution.applicationExecutionForms) {
                    return [2 /*return*/, exports.getByApplicationId(applicationId)];
                }
                title = savedApp.subject;
                _i = 0, _a = applicationExecution.applicationExecutionForms;
                _b.label = 8;
            case 8:
                if (!(_i < _a.length)) return [3 /*break*/, 11];
                field = _a[_i];
                field.applicationExecutionId = execution.id;
                // setting title = logic has been moved when getting execution
                // const formField = savedApplicationFormFields.find(f => f.id === field.applicationFormFieldId);
                // title = title.replace(`{${formField ? formField.fieldId : ''}}`, field.value);
                return [4 /*yield*/, applicationExecutionFormRepo.saveApplicationExecutionForm(field)];
            case 9:
                // setting title = logic has been moved when getting execution
                // const formField = savedApplicationFormFields.find(f => f.id === field.applicationFormFieldId);
                // title = title.replace(`{${formField ? formField.fieldId : ''}}`, field.value);
                _b.sent();
                _b.label = 10;
            case 10:
                _i++;
                return [3 /*break*/, 8];
            case 11:
                applicationExecution.title = title;
                return [4 /*yield*/, applicationExecutionRepo.saveApplicationExecution(applicationExecution)];
            case 12:
                _b.sent();
                return [2 /*return*/, execution];
        }
    });
}); };
exports.saveApplicationExecutionForm = function (applicationId, loggedInUserId, applicationExecution) { return __awaiter(_this, void 0, void 0, function () {
    var savedApp, savedApplicationExecution, formFieldIds, savedApplicationFormFields, execution, _i, _a, field;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0: return [4 /*yield*/, index_1.validate(applicationExecution, joiSchema.saveApplicationExecutionForm)];
            case 1:
                _b.sent();
                return [4 /*yield*/, applicationRepo.findById(applicationId)];
            case 2:
                savedApp = _b.sent();
                if (!savedApp) {
                    throw boom.badRequest('Invalid application id');
                }
                if (!applicationExecution.id) return [3 /*break*/, 4];
                return [4 /*yield*/, applicationExecutionRepo.findById(applicationExecution.id)];
            case 3:
                savedApplicationExecution = _b.sent();
                if (!savedApplicationExecution) {
                    throw boom.badRequest('Invalid application execution id');
                }
                applicationExecution.updatedBy = loggedInUserId;
                applicationExecution.startedAt = savedApplicationExecution.startedAt;
                applicationExecution.status = savedApplicationExecution.status;
                _b.label = 4;
            case 4:
                formFieldIds = _.pick(applicationExecution.applicationExecutionForms, 'applicationFormFieldId');
                formFieldIds = _.reject(formFieldIds, helper.rejectUndefinedOrNull);
                return [4 /*yield*/, applicationFormFieldRepo.findByIds(formFieldIds)];
            case 5:
                savedApplicationFormFields = _b.sent();
                if (savedApplicationFormFields.length !== _.uniq(formFieldIds).length) {
                    throw boom.badRequest('Invalid application form field id');
                }
                // validation for required in form fields
                applicationExecution.applicationId = applicationId;
                applicationExecution.updatedAt = new Date();
                return [4 /*yield*/, applicationExecutionRepo.saveApplicationExecution(applicationExecution)];
            case 6:
                execution = _b.sent();
                if (!applicationExecution.applicationExecutionForms) {
                    return [2 /*return*/, { success: true }];
                }
                _i = 0, _a = applicationExecution.applicationExecutionForms;
                _b.label = 7;
            case 7:
                if (!(_i < _a.length)) return [3 /*break*/, 10];
                field = _a[_i];
                field.applicationExecutionId = execution.id;
                return [4 /*yield*/, applicationExecutionFormRepo.saveApplicationExecutionForm(field)];
            case 8:
                _b.sent();
                _b.label = 9;
            case 9:
                _i++;
                return [3 /*break*/, 7];
            case 10: return [2 /*return*/, { success: true }];
        }
    });
}); };
exports.publishApplicationExecution = function (applicationId, loggedInUserId, applicationExecutionId) { return __awaiter(_this, void 0, void 0, function () {
    var savedApp, savedApplicationExecution, workflows, payload;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, index_1.validate({ applicationId: applicationId, applicationExecutionId: applicationExecutionId }, joiSchema.publishApplicationExecution)];
            case 1:
                _a.sent();
                return [4 /*yield*/, applicationRepo.findById(applicationId)];
            case 2:
                savedApp = _a.sent();
                if (!savedApp) {
                    throw boom.badRequest('Invalid application id');
                }
                return [4 /*yield*/, applicationExecutionRepo.findByIdForValidation(applicationExecutionId)];
            case 3:
                savedApplicationExecution = _a.sent();
                if (!savedApplicationExecution) {
                    throw boom.badRequest('Invalid application execution id');
                }
                if (savedApplicationExecution.status === application_1.ApplicationExecutionStatus.APPROVED) {
                    throw boom.badRequest('Application execution is already published');
                }
                return [4 /*yield*/, applicationExecutionRepo.saveApplicationExecution({
                        id: savedApplicationExecution.id,
                        applicationId: savedApplicationExecution.applicationId,
                        startedAt: savedApplicationExecution.startedAt,
                        status: application_1.ApplicationExecutionStatus.IN_PROGRESS,
                        updatedBy: loggedInUserId
                    })];
            case 4:
                _a.sent();
                return [4 /*yield*/, applicationWorkflowRepo.getByApplicationIdWithoutRelation(applicationId)];
            case 5:
                workflows = _a.sent();
                if (!(workflows && workflows.length)) return [3 /*break*/, 7];
                payload = {
                    applicationExecutionId: applicationExecutionId,
                    applicationWorkflowId: workflows[0].id,
                    status: application_1.ApplicationExecutionStatus.DRAFT,
                    createdBy: loggedInUserId
                };
                return [4 /*yield*/, applicationExecutionWorkflowRepo.saveApplicationExecutionWorkflow(payload)];
            case 6:
                _a.sent();
                _a.label = 7;
            case 7: return [2 /*return*/, { success: true }];
        }
    });
}); };
exports.saveApplicationExecutionWorkflow = function (applicationId, user, payload) { return __awaiter(_this, void 0, void 0, function () {
    var savedApplicationExecution, savedExecutionWorkflow, toSave, clarificationUser, _i, _a, comment, applicationWorkflows, indexOfWorkflow, newExecutionWorkflow, toSaveExecution, toSaveExecution, toSaveExecution;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0: return [4 /*yield*/, index_1.validate(__assign({ applicationId: applicationId }, payload), joiSchema.saveApplicationExecutionWorkflow)];
            case 1:
                _b.sent();
                return [4 /*yield*/, applicationExecutionRepo.findByIdForValidation(payload.applicationExecutionId)];
            case 2:
                savedApplicationExecution = _b.sent();
                if (!savedApplicationExecution) {
                    throw boom.badRequest('Invalid application execution id');
                }
                if (!payload.id) {
                    throw boom.badRequest('Invalid id');
                }
                return [4 /*yield*/, applicationExecutionWorkflowRepo.findById(payload.id)];
            case 3:
                savedExecutionWorkflow = _b.sent();
                if (!savedExecutionWorkflow) {
                    throw boom.badRequest('Invalid id');
                }
                toSave = savedExecutionWorkflow.get({ plain: true });
                if (!(payload.clarificationDetails && payload.clarificationDetails.userId)) return [3 /*break*/, 5];
                return [4 /*yield*/, userRepo.findById(payload.clarificationDetails.userId)];
            case 4:
                clarificationUser = _b.sent();
                if (!clarificationUser) {
                    throw boom.badRequest('Invalid clarification user');
                }
                payload.clarificationUserId = payload.clarificationDetails.userId;
                _b.label = 5;
            case 5:
                if (toSave.status === application_1.ApplicationExecutionStatus.APPROVED ||
                    toSave.status === application_1.ApplicationExecutionStatus.REJECT) {
                    throw boom.badRequest('Execution is already approved or reject, cannot be modified now');
                }
                if (payload.comments) {
                    for (_i = 0, _a = payload.comments; _i < _a.length; _i++) {
                        comment = _a[_i];
                        comment.userId = comment.userId || user.id;
                        comment.userName = comment.userName || user.firstName + " " + user.lastName;
                    }
                }
                if (payload.status === application_1.ApplicationExecutionStatus.REJECT) {
                    payload.comments = payload.comments || [];
                    payload.comments.unshift({
                        userId: user.id,
                        time: new Date(),
                        comment: payload.rejectionDetails.comment,
                        userName: user.firstName + " " + user.lastName
                    });
                }
                else if (payload.status === application_1.ApplicationExecutionStatus.CLARITY) {
                    payload.comments = payload.comments || [];
                    payload.comments.unshift({
                        userId: user.id,
                        time: new Date(),
                        comment: payload.clarificationDetails.comment,
                        userName: user.firstName + " " + user.lastName
                    });
                }
                toSave = __assign({ id: toSave.id, 
                    // applicationExecutionId: toSave.applicationExecutionId,
                    applicationWorkflowId: toSave.applicationWorkflowId, updatedBy: user.id }, payload);
                return [4 /*yield*/, applicationExecutionWorkflowRepo.saveApplicationExecutionWorkflow(toSave)];
            case 6:
                _b.sent();
                if (!(payload.status === application_1.ApplicationExecutionStatus.APPROVED)) return [3 /*break*/, 14];
                return [4 /*yield*/, applicationWorkflowRepo.getByApplicationIdWithoutRelation(applicationId)];
            case 7:
                applicationWorkflows = _b.sent();
                indexOfWorkflow = applicationWorkflows.findIndex(function (col) { return col.id === toSave.applicationWorkflowId; });
                if (!(indexOfWorkflow > -1 && applicationWorkflows.length >= indexOfWorkflow + 2)) return [3 /*break*/, 10];
                newExecutionWorkflow = {
                    applicationExecutionId: payload.applicationExecutionId,
                    applicationWorkflowId: applicationWorkflows[indexOfWorkflow + 1].id,
                    comments: toSave.comments,
                    status: application_1.ApplicationExecutionStatus.DRAFT,
                    createdBy: user.id
                };
                return [4 /*yield*/, applicationExecutionWorkflowRepo.saveApplicationExecutionWorkflow(newExecutionWorkflow)];
            case 8:
                _b.sent();
                toSaveExecution = savedApplicationExecution.get({ plain: true });
                return [4 /*yield*/, applicationExecutionRepo.saveApplicationExecution(__assign({}, toSaveExecution, { updatedAt: new Date(), updatedBy: user.id }))];
            case 9:
                _b.sent();
                return [3 /*break*/, 13];
            case 10:
                toSaveExecution = savedApplicationExecution.get({ plain: true });
                return [4 /*yield*/, applicationExecutionRepo.saveApplicationExecution(__assign({}, toSaveExecution, { status: application_1.ApplicationExecutionStatus.APPROVED, updatedBy: user.id }))];
            case 11:
                _b.sent();
                if (!(toSaveExecution.createdByUser && toSaveExecution.createdByUser.deviceId)) return [3 /*break*/, 13];
                return [4 /*yield*/, fcm_1.sendPushNotification(toSaveExecution.createdByUser.deviceId, {
                        executionId: toSaveExecution.id
                    }, 'Execution Completed', 'Your initiated execution has completed')];
            case 12:
                _b.sent();
                _b.label = 13;
            case 13: return [3 /*break*/, 16];
            case 14:
                toSaveExecution = savedApplicationExecution.get({ plain: true });
                return [4 /*yield*/, applicationExecutionRepo.saveApplicationExecution(__assign({}, toSaveExecution, { status: payload.status === application_1.ApplicationExecutionStatus.DRAFT ?
                            application_1.ApplicationExecutionStatus.IN_PROGRESS : payload.status, updatedBy: user.id }))];
            case 15:
                _b.sent();
                _b.label = 16;
            case 16: return [2 /*return*/, { success: true }];
        }
    });
}); };
exports.publishApplicationExecutionWorkflow = function (applicationId, applicationExecutionId, applicationExecutionWorkflowId) { return __awaiter(_this, void 0, void 0, function () {
    var savedApp, savedApplicationExecution, savedExecutionWorkflow, toSave, applicationWorkflows, indexOfWorkflow, payload;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, index_1.validate({
                    applicationId: applicationId,
                    applicationExecutionId: applicationExecutionId,
                    applicationExecutionWorkflowId: applicationExecutionWorkflowId
                }, joiSchema.publishApplicationExecutionWorkflow)];
            case 1:
                _a.sent();
                return [4 /*yield*/, applicationRepo.findById(applicationId)];
            case 2:
                savedApp = _a.sent();
                if (!savedApp) {
                    throw boom.badRequest('Invalid application id');
                }
                return [4 /*yield*/, applicationExecutionRepo.findByIdForValidation(applicationExecutionId)];
            case 3:
                savedApplicationExecution = _a.sent();
                if (!savedApplicationExecution) {
                    throw boom.badRequest('Invalid application execution id');
                }
                if (!applicationExecutionWorkflowId) {
                    throw boom.badRequest('Invalid id');
                }
                return [4 /*yield*/, applicationExecutionWorkflowRepo.findById(applicationExecutionWorkflowId)];
            case 4:
                savedExecutionWorkflow = _a.sent();
                if (!savedExecutionWorkflow) {
                    throw boom.badRequest('Invalid id');
                }
                toSave = savedExecutionWorkflow.get({ plain: true });
                toSave.status = application_1.ApplicationExecutionStatus.APPROVED;
                return [4 /*yield*/, applicationExecutionWorkflowRepo.saveApplicationExecutionWorkflow(toSave)];
            case 5:
                _a.sent();
                return [4 /*yield*/, applicationWorkflowRepo.getByApplicationIdWithoutRelation(applicationId)];
            case 6:
                applicationWorkflows = _a.sent();
                indexOfWorkflow = applicationWorkflows.findIndex(function (col) { return col.id === toSave.applicationWorkflowId; });
                if (!(indexOfWorkflow > -1 && applicationWorkflows.length >= indexOfWorkflow + 1)) return [3 /*break*/, 8];
                payload = {
                    applicationExecutionId: applicationExecutionId,
                    applicationWorkflowId: applicationWorkflows[indexOfWorkflow].id,
                    status: application_1.ApplicationExecutionStatus.DRAFT
                };
                return [4 /*yield*/, applicationExecutionWorkflowRepo.saveApplicationExecutionWorkflow(payload)];
            case 7:
                _a.sent();
                return [3 /*break*/, 10];
            case 8: 
            // if no workflow found, mark execution as approved
            return [4 /*yield*/, applicationExecutionRepo.saveApplicationExecution({
                    id: applicationExecutionId,
                    status: application_1.ApplicationExecutionStatus.APPROVED
                })];
            case 9:
                // if no workflow found, mark execution as approved
                _a.sent();
                _a.label = 10;
            case 10: return [2 /*return*/, { success: true }];
        }
    });
}); };
exports.deleteApplicationExecution = function (id, loggedInUserId) { return __awaiter(_this, void 0, void 0, function () {
    var applicationExecution;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, applicationExecutionRepo.findByIdForValidation(id)];
            case 1:
                applicationExecution = _a.sent();
                if (!applicationExecution) {
                    throw boom.badRequest('Invalid application execution id');
                }
                return [4 /*yield*/, applicationExecutionRepo.deleteApplicationExecution(id, loggedInUserId)];
            case 2:
                _a.sent();
                return [2 /*return*/, { success: true }];
        }
    });
}); };
exports.reassignWorkflow = function (payload) { return __awaiter(_this, void 0, void 0, function () {
    var applicationExecution, user, workflow, executionWorkflow, updateExecutionWorkflow;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, index_1.validate(payload, joiSchema.reassignWorkflow)];
            case 1:
                _a.sent();
                return [4 /*yield*/, applicationExecutionRepo.findById(payload.executionId)];
            case 2:
                applicationExecution = _a.sent();
                if (!applicationExecution) {
                    throw boom.badRequest('Invalid application execution id');
                }
                return [4 /*yield*/, userRepo.findById(payload.userId)];
            case 3:
                user = _a.sent();
                if (!user) {
                    throw boom.badRequest('Invalid user id');
                }
                return [4 /*yield*/, applicationWorkflowRepo.findById(payload.workflowId)];
            case 4:
                workflow = _a.sent();
                if (!workflow) {
                    throw boom.badRequest('Invalid application workflow id');
                }
                return [4 /*yield*/, applicationExecutionWorkflowRepo.findByExecutionAndWorkflowId(payload.executionId, payload.workflowId)];
            case 5:
                executionWorkflow = _a.sent();
                if (!executionWorkflow) {
                    throw boom.badRequest('Invalid application workflow id');
                }
                updateExecutionWorkflow = __assign({}, executionWorkflow.get({ plain: true }), { userPermissionId: payload.userId });
                return [4 /*yield*/, applicationWorkflowPermissionRepo.hardDeleteWorkflowPermissionByWorkflowId(payload.workflowId)];
            case 6:
                _a.sent();
                return [4 /*yield*/, applicationExecutionWorkflowRepo.saveApplicationExecutionWorkflow(updateExecutionWorkflow)];
            case 7:
                _a.sent();
                return [2 /*return*/, { success: true }];
        }
    });
}); };
exports.withdraw = function (loggedInUserId, executionId, executionWorkflowId) { return __awaiter(_this, void 0, void 0, function () {
    var applicationExecution, executionWorkflow, execution;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, index_1.validate({ loggedInUserId: loggedInUserId, executionId: executionId }, joiSchema.withdraw)];
            case 1:
                _a.sent();
                return [4 /*yield*/, applicationExecutionRepo.findByIdForValidation(executionId)];
            case 2:
                applicationExecution = _a.sent();
                if (!applicationExecution) {
                    throw boom.badRequest('Invalid application execution id');
                }
                if (applicationExecution.createdBy !== loggedInUserId) {
                    throw boom.unauthorized('You are not authorize to withdraw this execution');
                }
                return [4 /*yield*/, applicationExecutionWorkflowRepo.findById(executionWorkflowId)];
            case 3:
                executionWorkflow = _a.sent();
                if (!executionWorkflow) {
                    throw boom.badRequest('Invalid application execution id');
                }
                if (executionWorkflow.applicationWorkflow && !executionWorkflow.applicationWorkflow.canWithdraw) {
                    throw boom.badRequest('Withdraw is not allowed for this workflow');
                }
                return [4 /*yield*/, applicationExecutionWorkflowRepo.updateStatusById(application_1.ApplicationExecutionStatus.WITHDRAW, executionWorkflowId)];
            case 4:
                _a.sent();
                execution = __assign({}, applicationExecution.get({ plain: true }), { id: executionId, status: application_1.ApplicationExecutionStatus.WITHDRAW });
                return [4 /*yield*/, applicationExecutionRepo.saveApplicationExecution(execution)];
            case 5:
                _a.sent();
                return [2 /*return*/, { success: true }];
        }
    });
}); };
exports.deleteExecutionByApplicationId = function (payload) { return __awaiter(_this, void 0, void 0, function () {
    var application, executions, _i, executions_1, execution, executionForms, _a, executionForms_1, execution;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0: return [4 /*yield*/, index_1.validate(payload, joiSchema.deleteExecutionByApplicationId)];
            case 1:
                _b.sent();
                return [4 /*yield*/, applicationRepo.findById(payload.applicationId)];
            case 2:
                application = _b.sent();
                if (!application) {
                    throw boom.badRequest('Invalid application id');
                }
                if (payload.startDate) {
                    payload.startDate = moment(payload.startDate + ' 00:00:00').add(-5, 'h').toISOString();
                }
                if (payload.endDate) {
                    payload.endDate = moment(payload.endDate + ' 23:59:59').add(-5, 'h').toISOString();
                }
                return [4 /*yield*/, applicationExecutionRepo.getExecutionIdsByStartEndDate(payload.applicationId, payload.startDate, payload.endDate, payload.status)];
            case 3:
                executions = _b.sent();
                _i = 0, executions_1 = executions;
                _b.label = 4;
            case 4:
                if (!(_i < executions_1.length)) return [3 /*break*/, 7];
                execution = executions_1[_i];
                return [4 /*yield*/, applicationExecutionRepo.deleteApplicationExecution(execution.id, payload.loggedInUserId)];
            case 5:
                _b.sent();
                _b.label = 6;
            case 6:
                _i++;
                return [3 /*break*/, 4];
            case 7: return [4 /*yield*/, applicationExecutionFormRepo.getExecutionIdsByStartEndDate(payload.applicationId, payload.startDate, payload.endDate, payload.status)];
            case 8:
                executionForms = _b.sent();
                for (_a = 0, executionForms_1 = executionForms; _a < executionForms_1.length; _a++) {
                    execution = executionForms_1[_a];
                    if (execution.value && fs.existsSync("./upload/" + execution.value)) {
                        fs.unlinkSync("./upload/" + execution.value);
                    }
                }
                return [2 /*return*/, { success: true }];
        }
    });
}); };
