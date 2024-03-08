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
var _ = require('lodash');
var moment = require("moment");
var index_1 = require("../validations/index");
var joiSchema = require("../validations/schemas/application");
var applicationExecutionRepo = require("../repositories/application-execution");
var applicationExecutionWorkflowRepo = require("../repositories/application-execution-workflow");
var application_1 = require("../enum/application");
var role_1 = require("../enum/role");
var application_execution_1 = require("./application-execution");
exports.getMyItemReport = function (loggedInUser, participated) {
    if (participated === void 0) { participated = true; }
    return __awaiter(_this, void 0, void 0, function () {
        var responseMyItems, dbApplicationExecutions, myItems, _i, _a, item, responseParticipatedItems, executionIds, ids, myParticipatedExecutions, participatedItems, _b, _c, item;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0: return [4 /*yield*/, index_1.validate({ loggedInUserId: loggedInUser.userId }, joiSchema.getExecutionParticipatedLoggedInUserId)];
                case 1:
                    _d.sent();
                    responseMyItems = [];
                    return [4 /*yield*/, applicationExecutionRepo.getAll(loggedInUser.userId, true)];
                case 2:
                    dbApplicationExecutions = _d.sent();
                    return [4 /*yield*/, transformExecutionData(dbApplicationExecutions)];
                case 3:
                    myItems = _d.sent();
                    for (_i = 0, _a = Object.keys(myItems); _i < _a.length; _i++) {
                        item = _a[_i];
                        responseMyItems.push(__assign({}, myItems[item]));
                    }
                    responseParticipatedItems = [];
                    if (!participated) return [3 /*break*/, 6];
                    return [4 /*yield*/, applicationExecutionRepo.getApplicationExecutionParticipatedIds(loggedInUser.userId)];
                case 4:
                    executionIds = _d.sent();
                    ids = executionIds[0].map(function (execution) { return execution.id; });
                    return [4 /*yield*/, applicationExecutionRepo.getApplicationExecutionsByIds(ids)];
                case 5:
                    myParticipatedExecutions = _d.sent();
                    participatedItems = transformExecutionData(myParticipatedExecutions);
                    for (_b = 0, _c = Object.keys(participatedItems); _b < _c.length; _b++) {
                        item = _c[_b];
                        responseParticipatedItems.push(__assign({}, participatedItems[item]));
                    }
                    _d.label = 6;
                case 6: return [2 /*return*/, { participated: responseParticipatedItems, myItem: responseMyItems }];
            }
        });
    });
};
exports.getUserWorkloadReport = function (userId) { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, getMyItemsExecutions({ userId: userId, roles: [role_1.Role.SUPER_ADMIN] })];
    });
}); };
var transformExecutionData = function (dbApplicationExecutions) {
    var response = {};
    var applicationExecutions = [];
    for (var _i = 0, dbApplicationExecutions_1 = dbApplicationExecutions; _i < dbApplicationExecutions_1.length; _i++) {
        var execution = dbApplicationExecutions_1[_i];
        var plainExecution = execution.get({ plain: true });
        if (!plainExecution.application) {
            continue;
        }
        if (!response[plainExecution.application.id]) {
            response[plainExecution.application.id] = {
                applicationId: plainExecution.application.id,
                applicationName: plainExecution.application.name,
                draft: 0,
                inProgress: 0,
                completed: 0,
                rejected: 0,
                withdraw: 0
            };
        }
        if (plainExecution.applicationExecutionWorkflows &&
            plainExecution.applicationExecutionWorkflows.length) {
            plainExecution.applicationExecutionWorkflows = _.sortBy(plainExecution.applicationExecutionWorkflows, 'createdAt').reverse();
            var executionWorkflow = plainExecution && plainExecution.applicationExecutionWorkflows && plainExecution.applicationExecutionWorkflows[0];
            if (!executionWorkflow || !executionWorkflow.applicationWorkflowId) {
                response[plainExecution.application.id].draft += 1;
                continue;
            }
            if (executionWorkflow.status === application_1.ApplicationExecutionStatus.APPROVED) {
                response[plainExecution.application.id].completed += 1;
            }
            else if (executionWorkflow.status === application_1.ApplicationExecutionStatus.REJECT) {
                response[plainExecution.application.id].rejected += 1;
            }
            else if (executionWorkflow.status === application_1.ApplicationExecutionStatus.DRAFT) {
                response[plainExecution.application.id].inProgress += 1;
            }
            else if (executionWorkflow.status === application_1.ApplicationExecutionStatus.WITHDRAW) {
                response[plainExecution.application.id].withdraw += 1;
            }
        }
    }
    return response;
};
var getMyItemsExecutions = function (loggedInUser) { return __awaiter(_this, void 0, void 0, function () {
    var response, _a, drafts, inputs, inProgress, approved, rejects, withdrawals, _i, drafts_1, execution, _b, inputs_1, execution, _c, inProgress_1, execution, _d, approved_1, execution, _e, rejects_1, execution, _f, withdrawals_1, execution;
    return __generator(this, function (_g) {
        switch (_g.label) {
            case 0:
                response = {};
                return [4 /*yield*/, Promise.all([
                        application_execution_1.getExecutionInProcessLoggedInUserIdByQuery(loggedInUser, application_1.ApplicationExecutionStatus.DRAFT, undefined, application_1.ApplicationWorkflowType.APPROVAL),
                        application_execution_1.getExecutionInProcessLoggedInUserIdByQuery(loggedInUser, application_1.ApplicationExecutionStatus.DRAFT, undefined, application_1.ApplicationWorkflowType.INPUT),
                        application_execution_1.getExecutionInProcessLoggedInUserIdByQuery(loggedInUser, application_1.ApplicationExecutionStatus.IN_PROGRESS),
                        application_execution_1.getExecutionInProcessLoggedInUserIdByQuery(loggedInUser, application_1.ApplicationExecutionStatus.APPROVED),
                        application_execution_1.getExecutionInProcessLoggedInUserIdByQuery(loggedInUser, application_1.ApplicationExecutionStatus.REJECT),
                        application_execution_1.getExecutionWithdrawLoggedInUserId(loggedInUser, {})
                    ])];
            case 1:
                _a = _g.sent(), drafts = _a[0], inputs = _a[1], inProgress = _a[2], approved = _a[3], rejects = _a[4], withdrawals = _a[5];
                for (_i = 0, drafts_1 = drafts; _i < drafts_1.length; _i++) {
                    execution = drafts_1[_i];
                    if (!response[execution.applicationId]) {
                        response[execution.applicationId] = {
                            applicationId: execution.applicationId,
                            applicationName: execution.name,
                            draft: 0,
                            inProgress: 0,
                            completed: 0,
                            rejected: 0,
                            withdraw: 0
                        };
                    }
                    response[execution.applicationId].draft += 1;
                }
                for (_b = 0, inputs_1 = inputs; _b < inputs_1.length; _b++) {
                    execution = inputs_1[_b];
                    if (!response[execution.applicationId]) {
                        response[execution.applicationId] = {
                            applicationId: execution.applicationId,
                            applicationName: execution.name,
                            draft: 0,
                            inProgress: 0,
                            completed: 0,
                            rejected: 0,
                            withdraw: 0
                        };
                    }
                    response[execution.applicationId].draft += 1;
                }
                for (_c = 0, inProgress_1 = inProgress; _c < inProgress_1.length; _c++) {
                    execution = inProgress_1[_c];
                    if (!response[execution.applicationId]) {
                        response[execution.applicationId] = {
                            applicationId: execution.applicationId,
                            applicationName: execution.name,
                            draft: 0,
                            inProgress: 0,
                            completed: 0,
                            rejected: 0,
                            withdraw: 0
                        };
                    }
                    response[execution.applicationId].inProgress += 1;
                }
                for (_d = 0, approved_1 = approved; _d < approved_1.length; _d++) {
                    execution = approved_1[_d];
                    if (!response[execution.applicationId]) {
                        response[execution.applicationId] = {
                            applicationId: execution.applicationId,
                            applicationName: execution.name,
                            draft: 0,
                            inProgress: 0,
                            completed: 0,
                            rejected: 0,
                            withdraw: 0
                        };
                    }
                    response[execution.applicationId].completed += 1;
                }
                for (_e = 0, rejects_1 = rejects; _e < rejects_1.length; _e++) {
                    execution = rejects_1[_e];
                    if (!response[execution.applicationId]) {
                        response[execution.applicationId] = {
                            applicationId: execution.applicationId,
                            applicationName: execution.name,
                            draft: 0,
                            inProgress: 0,
                            completed: 0,
                            rejected: 0,
                            withdraw: 0
                        };
                    }
                    response[execution.applicationId].rejected += 1;
                }
                for (_f = 0, withdrawals_1 = withdrawals; _f < withdrawals_1.length; _f++) {
                    execution = withdrawals_1[_f];
                    if (!execution.application) {
                        continue;
                    }
                    if (!response[execution.application.id]) {
                        response[execution.application.id] = {
                            applicationId: execution.application.id,
                            applicationName: execution.application.name,
                            draft: 0,
                            inProgress: 0,
                            completed: 0,
                            rejected: 0,
                            withdraw: 0
                        };
                    }
                    response[execution.application.id].withdraw += 1;
                }
                return [2 /*return*/, response];
        }
    });
}); };
exports.getApplicationExecutionTimeReport = function (payload) { return __awaiter(_this, void 0, void 0, function () {
    var dbApplicationExecutions, response, ids, executionWorkflows, _loop_1, _i, dbApplicationExecutions_2, execution;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, index_1.validate(payload, joiSchema.getApplicationExecutionTimeReport)];
            case 1:
                _a.sent();
                if (payload.startDate) {
                    payload.startDate = moment(moment(payload.startDate).format('MM-DD-YYYY') + ' 00:00:00').toISOString();
                }
                if (payload.endDate) {
                    payload.endDate = moment(moment(payload.endDate).format('MM-DD-YYYY') + ' 23:59:59').toISOString();
                }
                return [4 /*yield*/, applicationExecutionRepo.getApplicationExecutionsForTimeReport(payload.applicationId, payload.startDate, payload.endDate)];
            case 2:
                dbApplicationExecutions = _a.sent();
                response = [];
                ids = dbApplicationExecutions.map(function (execution) { return execution.id; });
                return [4 /*yield*/, applicationExecutionWorkflowRepo.getByApplicationExecutionIds(ids)];
            case 3:
                executionWorkflows = _a.sent();
                _loop_1 = function (execution) {
                    var responseExecution = {
                        applicationId: execution.applicationId,
                        id: execution.id,
                        title: execution.title,
                        timeline: []
                    };
                    var appExecutionWorklows = executionWorkflows.filter(function (workflow) {
                        return workflow.applicationExecutionId === execution.id;
                    });
                    var endAt = void 0;
                    if (appExecutionWorklows.length) {
                        endAt = appExecutionWorklows[0].createdAt;
                    }
                    var timestamp = moment(moment(endAt)).diff(moment(execution.createdAt));
                    var duration = moment.duration(timestamp);
                    responseExecution.timeline = [];
                    responseExecution.timeline.push({
                        workflowType: "Initiate",
                        startedAt: execution.createdAt,
                        endAt: endAt,
                        timestamp: duration.get('h') + ":" + duration.get('m') + ":" + duration.get('s')
                    });
                    for (var _i = 0, appExecutionWorklows_1 = appExecutionWorklows; _i < appExecutionWorklows_1.length; _i++) {
                        var workflowExecution = appExecutionWorklows_1[_i];
                        if (!workflowExecution.applicationWorkflow || !responseExecution.timeline) {
                            response.push(responseExecution);
                            continue;
                        }
                        var timestamp_1 = moment(workflowExecution.updatedAt).diff(moment(workflowExecution.createdAt));
                        var duration_1 = moment.duration(timestamp_1);
                        responseExecution.timeline.push({
                            workflowType: workflowExecution.applicationWorkflow.type + " by\n                    " + workflowExecution.applicationWorkflow.name,
                            startedAt: workflowExecution.createdAt,
                            endAt: workflowExecution.updatedAt,
                            timestamp: duration_1.get('h') + ":" + duration_1.get('m') + ":" + duration_1.get('s'),
                            applicationWorkflowId: workflowExecution.applicationWorkflowId
                        });
                    }
                    response.push(responseExecution);
                };
                for (_i = 0, dbApplicationExecutions_2 = dbApplicationExecutions; _i < dbApplicationExecutions_2.length; _i++) {
                    execution = dbApplicationExecutions_2[_i];
                    _loop_1(execution);
                }
                return [2 /*return*/, response];
        }
    });
}); };
exports.getTotalExecutionsCountReport = function (payload) { return __awaiter(_this, void 0, void 0, function () {
    var dbApplicationExecutions, response, ids, workflows, _loop_2, _i, dbApplicationExecutions_3, execution;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, index_1.validate(payload, joiSchema.getApplicationExecutionTimeReport)];
            case 1:
                _a.sent();
                if (payload.startDate) {
                    payload.startDate = moment(moment(payload.startDate).format('MM-DD-YYYY') + ' 00:00:00').toISOString();
                }
                if (payload.endDate) {
                    payload.endDate = moment(moment(payload.endDate).format('MM-DD-YYYY') + ' 23:59:59').toISOString();
                }
                return [4 /*yield*/, applicationExecutionRepo.getTotalApplicationExecutionQuery(payload.applicationId, payload.startDate, payload.endDate)];
            case 2:
                dbApplicationExecutions = _a.sent();
                response = {
                    total: 0,
                    completed: 0,
                    inProgress: 0,
                    rejected: 0,
                    withdraw: 0
                };
                ids = dbApplicationExecutions.map(function (execution) { return execution.id; });
                return [4 /*yield*/, applicationExecutionWorkflowRepo.getByApplicationExecutionIds(ids)];
            case 3:
                workflows = _a.sent();
                _loop_2 = function (execution) {
                    var currentWorkflows = workflows.filter(function (ex) { return ex.applicationExecutionId === execution.id; });
                    response.withdraw += execution.status === application_1.ApplicationExecutionStatus.WITHDRAW ? 1 : 0;
                    if (execution.status !== application_1.ApplicationExecutionStatus.WITHDRAW) {
                        response.completed += currentWorkflows[0].status === application_1.ApplicationExecutionStatus.APPROVED ? 1 : 0;
                        response.inProgress += currentWorkflows[0].status === application_1.ApplicationExecutionStatus.DRAFT ? 1 : 0;
                        response.rejected += currentWorkflows[0].status === application_1.ApplicationExecutionStatus.REJECT ? 1 : 0;
                    }
                };
                for (_i = 0, dbApplicationExecutions_3 = dbApplicationExecutions; _i < dbApplicationExecutions_3.length; _i++) {
                    execution = dbApplicationExecutions_3[_i];
                    _loop_2(execution);
                }
                response.total = response.completed + response.inProgress + response.rejected + response.withdraw;
                return [2 /*return*/, response];
        }
    });
}); };
exports.getTotalExecutionsCountGraph = function (payload) { return __awaiter(_this, void 0, void 0, function () {
    var dbApplicationExecutions, response, startMonth, diffMonth, _loop_3, i;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, index_1.validate(payload, joiSchema.getApplicationExecutionTimeReport)];
            case 1:
                _a.sent();
                if (payload.startDate) {
                    payload.startDate = moment(moment(payload.startDate).format('MM-DD-YYYY') + ' 00:00:00').toISOString();
                }
                if (payload.endDate) {
                    payload.endDate = moment(moment(payload.endDate).format('MM-DD-YYYY') + ' 23:59:59').toISOString();
                }
                return [4 /*yield*/, applicationExecutionRepo.getTotalApplicationExecutionQuery(payload.applicationId, payload.startDate, payload.endDate)];
            case 2:
                dbApplicationExecutions = _a.sent();
                response = {
                    categories: [],
                    data: []
                };
                startMonth = moment(payload.startDate).month();
                diffMonth = moment(payload.endDate).diff(payload.startDate, 'month');
                _loop_3 = function (i) {
                    var startDateOfMonth, endDateOfMonth, ids, data, workflows, _loop_4, _i, dbApplicationExecutions_4, execution;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                response.categories.push(moment.months(startMonth + i));
                                startDateOfMonth = moment(payload.startDate).add(i + 1, 'month').date(1);
                                endDateOfMonth = startDateOfMonth.endOf('month');
                                ids = dbApplicationExecutions.filter(function (execution) { return moment(execution.createdAt) >= startDateOfMonth
                                    && moment(execution.createdAt) < endDateOfMonth; }).map(function (exec) { return exec.id; });
                                data = {
                                    total: 0,
                                    completed: 0,
                                    inProgress: 0,
                                    rejected: 0,
                                    withdraw: 0
                                };
                                if (!ids.length) {
                                    response.data.push(data);
                                    return [2 /*return*/, "continue"];
                                }
                                return [4 /*yield*/, applicationExecutionWorkflowRepo.getByApplicationExecutionIds(ids)];
                            case 1:
                                workflows = _a.sent();
                                data.total = workflows.length;
                                _loop_4 = function (execution) {
                                    var currentWorkflows = workflows.filter(function (ex) { return ex.applicationExecutionId === execution.id; });
                                    data.completed += currentWorkflows[0].status === application_1.ApplicationExecutionStatus.APPROVED ? 1 : 0;
                                    data.inProgress += currentWorkflows[0].status === application_1.ApplicationExecutionStatus.DRAFT ? 1 : 0;
                                    data.rejected += currentWorkflows[0].status === application_1.ApplicationExecutionStatus.REJECT ? 1 : 0;
                                    data.withdraw += currentWorkflows[0].status === application_1.ApplicationExecutionStatus.WITHDRAW ? 1 : 0;
                                };
                                for (_i = 0, dbApplicationExecutions_4 = dbApplicationExecutions; _i < dbApplicationExecutions_4.length; _i++) {
                                    execution = dbApplicationExecutions_4[_i];
                                    _loop_4(execution);
                                }
                                response.data.push(data);
                                return [2 /*return*/];
                        }
                    });
                };
                i = 0;
                _a.label = 3;
            case 3:
                if (!(i <= diffMonth)) return [3 /*break*/, 6];
                return [5 /*yield**/, _loop_3(i)];
            case 4:
                _a.sent();
                _a.label = 5;
            case 5:
                i++;
                return [3 /*break*/, 3];
            case 6: return [2 /*return*/, response];
        }
    });
}); };
exports.getApplicationExecutionLocationReport = function (payload) { return __awaiter(_this, void 0, void 0, function () {
    var dbApplicationExecutions, response, _i, dbApplicationExecutions_5, execution, responseExecution;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, index_1.validate(payload, joiSchema.getApplicationExecutionTimeReport)];
            case 1:
                _a.sent();
                if (payload.startDate) {
                    payload.startDate = moment(moment(payload.startDate).format('MM-DD-YYYY') + ' 00:00:00').toISOString();
                }
                if (payload.endDate) {
                    payload.endDate = moment(moment(payload.endDate).format('MM-DD-YYYY') + ' 23:59:59').toISOString();
                }
                return [4 /*yield*/, applicationExecutionRepo.getApplicationExecutionsForTimeReport(payload.applicationId, payload.startDate, payload.endDate)];
            case 2:
                dbApplicationExecutions = _a.sent();
                response = [];
                for (_i = 0, dbApplicationExecutions_5 = dbApplicationExecutions; _i < dbApplicationExecutions_5.length; _i++) {
                    execution = dbApplicationExecutions_5[_i];
                    responseExecution = {
                        applicationId: execution.applicationId,
                        id: execution.id,
                        title: execution.title,
                        longitude: execution.longitude,
                        latitude: execution.latitude
                    };
                    response.push(responseExecution);
                }
                return [2 /*return*/, response];
        }
    });
}); };
