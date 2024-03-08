"use strict";
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
var applicationService = require("../services/application");
var applicationFormService = require("../services/application-form");
var applicationWorkflowService = require("../services/application-workflow");
var applicationWorkflowFieldPermissionService = require("../services/application-workflow-field-permission");
var applicationExecutionService = require("../services/application-execution");
exports.getCurrentLoggedInUserApplications = function (ctx, next) { return __awaiter(_this, void 0, void 0, function () {
    var userId, _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                userId = ctx.state.user.userId;
                _a = ctx.state;
                return [4 /*yield*/, applicationService.getCurrentLoggedInUserApplications(userId)];
            case 1:
                _a.data = _b.sent();
                return [4 /*yield*/, next()];
            case 2:
                _b.sent();
                return [2 /*return*/];
        }
    });
}); };
exports.getApplicationById = function (ctx, next) { return __awaiter(_this, void 0, void 0, function () {
    var applicationId, _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                applicationId = ctx.params.applicationId;
                _a = ctx.state;
                return [4 /*yield*/, applicationService.getById(applicationId)];
            case 1:
                _a.data = _b.sent();
                return [4 /*yield*/, next()];
            case 2:
                _b.sent();
                return [2 /*return*/];
        }
    });
}); };
exports.getApplicationFormSectionById = function (ctx, next) { return __awaiter(_this, void 0, void 0, function () {
    var applicationId, sectionId, _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                applicationId = ctx.params.applicationId;
                sectionId = ctx.params.sectionId;
                _a = ctx.state;
                return [4 /*yield*/, applicationFormService.getApplicationSectionById(applicationId, sectionId)];
            case 1:
                _a.data = _b.sent();
                return [4 /*yield*/, next()];
            case 2:
                _b.sent();
                return [2 /*return*/];
        }
    });
}); };
exports.getApplicationFormFieldById = function (ctx, next) { return __awaiter(_this, void 0, void 0, function () {
    var applicationId, fieldId, _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                applicationId = ctx.params.applicationId;
                fieldId = ctx.params.fieldId;
                _a = ctx.state;
                return [4 /*yield*/, applicationFormService.getApplicationFormFieldById(applicationId, fieldId)];
            case 1:
                _a.data = _b.sent();
                return [4 /*yield*/, next()];
            case 2:
                _b.sent();
                return [2 /*return*/];
        }
    });
}); };
exports.getApplicationForm = function (ctx, next) { return __awaiter(_this, void 0, void 0, function () {
    var applicationId, forExecution, _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                applicationId = ctx.params.applicationId;
                forExecution = ctx.query.forExecution === 'true' ? true : false;
                _a = ctx.state;
                return [4 /*yield*/, applicationFormService.getByApplicationId(applicationId, forExecution)];
            case 1:
                _a.data = _b.sent();
                return [4 /*yield*/, next()];
            case 2:
                _b.sent();
                return [2 /*return*/];
        }
    });
}); };
exports.getApplicationWorkflow = function (ctx, next) { return __awaiter(_this, void 0, void 0, function () {
    var applicationId, _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                applicationId = ctx.params.applicationId;
                _a = ctx.state;
                return [4 /*yield*/, applicationWorkflowService.getByApplicationId(applicationId)];
            case 1:
                _a.data = _b.sent();
                return [4 /*yield*/, next()];
            case 2:
                _b.sent();
                return [2 /*return*/];
        }
    });
}); };
exports.getApplicationWorkflowFieldPermission = function (ctx, next) { return __awaiter(_this, void 0, void 0, function () {
    var applicationId, _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                applicationId = ctx.params.applicationId;
                _a = ctx.state;
                return [4 /*yield*/, applicationWorkflowFieldPermissionService.getByApplicationId(applicationId)];
            case 1:
                _a.data = _b.sent();
                return [4 /*yield*/, next()];
            case 2:
                _b.sent();
                return [2 /*return*/];
        }
    });
}); };
exports.getApplicationExecution = function (ctx, next) { return __awaiter(_this, void 0, void 0, function () {
    var applicationId, _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                applicationId = ctx.params.applicationId;
                _a = ctx.state;
                return [4 /*yield*/, applicationExecutionService.getByApplicationId(applicationId)];
            case 1:
                _a.data = _b.sent();
                return [4 /*yield*/, next()];
            case 2:
                _b.sent();
                return [2 /*return*/];
        }
    });
}); };
exports.getExecutionById = function (ctx, next) { return __awaiter(_this, void 0, void 0, function () {
    var executionId, _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                executionId = ctx.params.executionId;
                _a = ctx.state;
                return [4 /*yield*/, applicationExecutionService.getById(executionId)];
            case 1:
                _a.data = _b.sent();
                return [4 /*yield*/, next()];
            case 2:
                _b.sent();
                return [2 /*return*/];
        }
    });
}); };
exports.getDetailExecutionById = function (ctx, next) { return __awaiter(_this, void 0, void 0, function () {
    var executionId, user, status, _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                executionId = ctx.params.executionId;
                user = ctx.state.user;
                status = ctx.request.query.status === 'undefined' ? undefined : ctx.request.query.status;
                _a = ctx.state;
                return [4 /*yield*/, applicationExecutionService.getDetailedExecutionById(executionId, user, status)];
            case 1:
                _a.data = _b.sent();
                return [4 /*yield*/, next()];
            case 2:
                _b.sent();
                return [2 /*return*/];
        }
    });
}); };
exports.getAllExecution = function (ctx, next) { return __awaiter(_this, void 0, void 0, function () {
    var user, _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                user = ctx.state.user;
                _a = ctx.state;
                return [4 /*yield*/, applicationExecutionService.getAll(user)];
            case 1:
                _a.data = _b.sent();
                return [4 /*yield*/, next()];
            case 2:
                _b.sent();
                return [2 /*return*/];
        }
    });
}); };
exports.getExecutionByLoggedInUserId = function (ctx, next) { return __awaiter(_this, void 0, void 0, function () {
    var status, type, user, _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                status = ctx.request.query.status === 'undefined' ? undefined : ctx.request.query.status;
                type = ctx.request.query.type;
                user = ctx.state.user;
                _a = ctx.state;
                return [4 /*yield*/, applicationExecutionService.getExecutionByLoggedInUserId(user, type, status)];
            case 1:
                _a.data = _b.sent();
                return [4 /*yield*/, next()];
            case 2:
                _b.sent();
                return [2 /*return*/];
        }
    });
}); };
exports.getExecutionInProcessLoggedInUserId = function (ctx, next) { return __awaiter(_this, void 0, void 0, function () {
    var status, user, _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                status = ctx.request.query.status;
                user = ctx.state.user;
                _a = ctx.state;
                return [4 /*yield*/, applicationExecutionService.getExecutionInProcessLoggedInUserId(user, status)];
            case 1:
                _a.data = _b.sent();
                return [4 /*yield*/, next()];
            case 2:
                _b.sent();
                return [2 /*return*/];
        }
    });
}); };
exports.getExecutionInProcessLoggedInUserIdByQuery = function (ctx, next) { return __awaiter(_this, void 0, void 0, function () {
    var status, type, user, applicationId, startDate, endDate, _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                status = ctx.request.query.status;
                type = ctx.request.query.type;
                user = ctx.state.user;
                applicationId = ctx.request.query.applicationId;
                startDate = ctx.request.query.startDate;
                endDate = ctx.request.query.endDate;
                _a = ctx.state;
                return [4 /*yield*/, applicationExecutionService.
                        getExecutionInProcessLoggedInUserIdByQuery(user, status, applicationId, type, startDate, endDate)];
            case 1:
                _a.data = _b.sent();
                return [4 /*yield*/, next()];
            case 2:
                _b.sent();
                return [2 /*return*/];
        }
    });
}); };
exports.getExecutionParticipatedLoggedInUserId = function (ctx, next) { return __awaiter(_this, void 0, void 0, function () {
    var user, _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                user = ctx.state.user;
                _a = ctx.state;
                return [4 /*yield*/, applicationExecutionService.getExecutionParticipatedLoggedInUserId(user)];
            case 1:
                _a.data = _b.sent();
                return [4 /*yield*/, next()];
            case 2:
                _b.sent();
                return [2 /*return*/];
        }
    });
}); };
exports.getExecutionParticipatedQuery = function (ctx, next) { return __awaiter(_this, void 0, void 0, function () {
    var user, searchText, startDate, endDate, _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                user = ctx.state.user;
                searchText = ctx.request.query.searchText;
                startDate = ctx.request.query.startDate;
                endDate = ctx.request.query.endDate;
                _a = ctx.state;
                return [4 /*yield*/, applicationExecutionService.getExecutionParticipatedLoggedInUserIdQuery(user, searchText, startDate, endDate)];
            case 1:
                _a.data = _b.sent();
                return [4 /*yield*/, next()];
            case 2:
                _b.sent();
                return [2 /*return*/];
        }
    });
}); };
exports.getInProgressExecutions = function (ctx, next) { return __awaiter(_this, void 0, void 0, function () {
    var user, applicationId, startDate, endDate, _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                user = ctx.state.user;
                applicationId = ctx.params.applicationId;
                startDate = ctx.request.query.startDate;
                endDate = ctx.request.query.endDate;
                _a = ctx.state;
                return [4 /*yield*/, applicationExecutionService.getInProgressExecutions(user, applicationId, startDate, endDate)];
            case 1:
                _a.data = _b.sent();
                return [4 /*yield*/, next()];
            case 2:
                _b.sent();
                return [2 /*return*/];
        }
    });
}); };
exports.getExecutionWorkflowsCount = function (ctx, next) { return __awaiter(_this, void 0, void 0, function () {
    var userId, _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                userId = ctx.state.user.userId;
                _a = ctx.state;
                return [4 /*yield*/, applicationExecutionService.getExecutionWorkflowsCount(userId)];
            case 1:
                _a.data = _b.sent();
                return [4 /*yield*/, next()];
            case 2:
                _b.sent();
                return [2 /*return*/];
        }
    });
}); };
exports.getApplicationFieldTitles = function (ctx, next) { return __awaiter(_this, void 0, void 0, function () {
    var applicationId, _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                applicationId = ctx.params.applicationId;
                _a = ctx.state;
                return [4 /*yield*/, applicationFormService.getApplicationFieldTitles(applicationId)];
            case 1:
                _a.data = _b.sent();
                return [4 /*yield*/, next()];
            case 2:
                _b.sent();
                return [2 /*return*/];
        }
    });
}); };
exports.getWithdrawExecutions = function (ctx, next) { return __awaiter(_this, void 0, void 0, function () {
    var loggedInUser, payload, _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                loggedInUser = ctx.state.user;
                payload = {
                    applicationId: ctx.query.applicationId,
                    startDate: ctx.query.startDate,
                    endDate: ctx.query.endDate
                };
                _a = ctx.state;
                return [4 /*yield*/, applicationExecutionService.getExecutionWithdrawLoggedInUserId(loggedInUser, payload)];
            case 1:
                _a.data = _b.sent();
                return [4 /*yield*/, next()];
            case 2:
                _b.sent();
                return [2 /*return*/];
        }
    });
}); };
exports.getExecutionParticipatedUsers = function (ctx, next) { return __awaiter(_this, void 0, void 0, function () {
    var loggedInUser, executionId, _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                loggedInUser = ctx.state.user;
                executionId = ctx.params.executionId;
                _a = ctx.state;
                return [4 /*yield*/, applicationExecutionService.getExecutionParticipatedUsers(loggedInUser, executionId)];
            case 1:
                _a.data = _b.sent();
                return [4 /*yield*/, next()];
            case 2:
                _b.sent();
                return [2 /*return*/];
        }
    });
}); };
exports.saveApplication = function (ctx, next) { return __awaiter(_this, void 0, void 0, function () {
    var userId, payload, _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                userId = ctx.state.user.userId;
                payload = ctx.request.body;
                _a = ctx.state;
                return [4 /*yield*/, applicationService.saveApplication(userId, payload)];
            case 1:
                _a.data = _b.sent();
                return [4 /*yield*/, next()];
            case 2:
                _b.sent();
                return [2 /*return*/];
        }
    });
}); };
exports.publishApplication = function (ctx, next) { return __awaiter(_this, void 0, void 0, function () {
    var id, userId, editableUserIds, canAllEdits, subject, _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                id = ctx.params.applicationId;
                userId = ctx.state.user.userId;
                editableUserIds = ctx.request.body.editableUserIds;
                canAllEdits = ctx.request.body.canAllEdits;
                subject = ctx.request.body.subject;
                _a = ctx.state;
                return [4 /*yield*/, applicationService.publishApplication(id, editableUserIds, canAllEdits, subject)];
            case 1:
                _a.data = _b.sent();
                return [4 /*yield*/, next()];
            case 2:
                _b.sent();
                return [2 /*return*/];
        }
    });
}); };
exports.saveApplicationForm = function (ctx, next) { return __awaiter(_this, void 0, void 0, function () {
    var applicationId, payload, _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                applicationId = ctx.params.applicationId;
                payload = ctx.request.body;
                _a = ctx.state;
                return [4 /*yield*/, applicationFormService.saveApplicationForm(applicationId, payload)];
            case 1:
                _a.data = _b.sent();
                return [4 /*yield*/, next()];
            case 2:
                _b.sent();
                return [2 /*return*/];
        }
    });
}); };
exports.saveApplicationWorkflow = function (ctx, next) { return __awaiter(_this, void 0, void 0, function () {
    var applicationId, userId, payload, _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                applicationId = ctx.params.applicationId;
                userId = ctx.state.user.userId;
                payload = ctx.request.body;
                _a = ctx.state;
                return [4 /*yield*/, applicationWorkflowService.saveApplicationWorkflow(applicationId, userId, payload)];
            case 1:
                _a.data = _b.sent();
                return [4 /*yield*/, next()];
            case 2:
                _b.sent();
                return [2 /*return*/];
        }
    });
}); };
exports.saveApplicationWorkflowFieldPermission = function (ctx, next) { return __awaiter(_this, void 0, void 0, function () {
    var applicationId, payload, _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                applicationId = ctx.params.applicationId;
                payload = ctx.request.body;
                _a = ctx.state;
                return [4 /*yield*/, applicationWorkflowFieldPermissionService.saveApplicationWorkflowFieldPermission(applicationId, payload)];
            case 1:
                _a.data =
                    _b.sent();
                return [4 /*yield*/, next()];
            case 2:
                _b.sent();
                return [2 /*return*/];
        }
    });
}); };
exports.saveApplicationExecution = function (ctx, next) { return __awaiter(_this, void 0, void 0, function () {
    var applicationId, userId, payload, _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                applicationId = ctx.params.applicationId;
                userId = ctx.state.user.userId;
                payload = ctx.request.body;
                _a = ctx.state;
                return [4 /*yield*/, applicationExecutionService.saveApplicationExecution(applicationId, userId, payload)];
            case 1:
                _a.data = _b.sent();
                return [4 /*yield*/, next()];
            case 2:
                _b.sent();
                return [2 /*return*/];
        }
    });
}); };
exports.saveApplicationExecutionForm = function (ctx, next) { return __awaiter(_this, void 0, void 0, function () {
    var applicationId, userId, payload, _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                applicationId = ctx.params.applicationId;
                userId = ctx.state.user.userId;
                payload = ctx.request.body;
                _a = ctx.state;
                return [4 /*yield*/, applicationExecutionService.saveApplicationExecutionForm(applicationId, userId, payload)];
            case 1:
                _a.data = _b.sent();
                return [4 /*yield*/, next()];
            case 2:
                _b.sent();
                return [2 /*return*/];
        }
    });
}); };
exports.publishApplicationExecution = function (ctx, next) { return __awaiter(_this, void 0, void 0, function () {
    var userId, applicationId, applicationExecutionId, _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                userId = ctx.state.user.userId;
                applicationId = ctx.params.applicationId;
                applicationExecutionId = ctx.params.applicationExecutionId;
                _a = ctx.state;
                return [4 /*yield*/, applicationExecutionService.publishApplicationExecution(applicationId, userId, applicationExecutionId)];
            case 1:
                _a.data = _b.sent();
                return [4 /*yield*/, next()];
            case 2:
                _b.sent();
                return [2 /*return*/];
        }
    });
}); };
exports.saveApplicationExecutionWorkflow = function (ctx, next) { return __awaiter(_this, void 0, void 0, function () {
    var applicationId, user, payload, _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                applicationId = ctx.params.applicationId;
                user = ctx.state.user;
                payload = {
                    id: ctx.params.applicationExecutionWorkflowId,
                    applicationExecutionId: ctx.params.applicationExecutionId,
                    comments: ctx.request.body.comments,
                    status: ctx.request.body.status,
                    rejectionDetails: ctx.request.body.rejectionDetails,
                    clarificationDetails: ctx.request.body.clarificationDetails
                };
                _a = ctx.state;
                return [4 /*yield*/, applicationExecutionService.saveApplicationExecutionWorkflow(applicationId, user, payload)];
            case 1:
                _a.data = _b.sent();
                return [4 /*yield*/, next()];
            case 2:
                _b.sent();
                return [2 /*return*/];
        }
    });
}); };
// not in use
exports.publishApplicationExecutionWorkflow = function (ctx, next) { return __awaiter(_this, void 0, void 0, function () {
    var applicationId, applicationExecutionId, executionWorkflowId, _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                applicationId = ctx.params.applicationId;
                applicationExecutionId = ctx.params.applicationExecutionId;
                executionWorkflowId = ctx.params.applicationExecutionWorkflowId;
                _a = ctx.state;
                return [4 /*yield*/, applicationExecutionService.publishApplicationExecutionWorkflow(applicationId, applicationExecutionId, executionWorkflowId)];
            case 1:
                _a.data = _b.sent();
                return [4 /*yield*/, next()];
            case 2:
                _b.sent();
                return [2 /*return*/];
        }
    });
}); };
exports.deleteApplication = function (ctx, next) { return __awaiter(_this, void 0, void 0, function () {
    var id, userId, _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                id = ctx.params.id;
                userId = ctx.state.user.userId;
                _a = ctx.state;
                return [4 /*yield*/, applicationService.deleteApplication(id, userId)];
            case 1:
                _a.data = _b.sent();
                return [4 /*yield*/, next()];
            case 2:
                _b.sent();
                return [2 /*return*/];
        }
    });
}); };
exports.deleteApplicationExecution = function (ctx, next) { return __awaiter(_this, void 0, void 0, function () {
    var executionId, userId, _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                executionId = ctx.params.executionId;
                userId = ctx.state.user.userId;
                _a = ctx.state;
                return [4 /*yield*/, applicationExecutionService.deleteApplicationExecution(executionId, userId)];
            case 1:
                _a.data = _b.sent();
                return [4 /*yield*/, next()];
            case 2:
                _b.sent();
                return [2 /*return*/];
        }
    });
}); };
exports.deleteApplicationExecutionByApplication = function (ctx, next) { return __awaiter(_this, void 0, void 0, function () {
    var payload, _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                payload = {
                    applicationId: ctx.params.applicationId,
                    loggedInUserId: ctx.state.user.userId,
                    startDate: ctx.request.body.startDate,
                    endDate: ctx.request.body.endDate,
                    status: ctx.request.body.status
                };
                _a = ctx.state;
                return [4 /*yield*/, applicationExecutionService.deleteExecutionByApplicationId(payload)];
            case 1:
                _a.data = _b.sent();
                return [4 /*yield*/, next()];
            case 2:
                _b.sent();
                return [2 /*return*/];
        }
    });
}); };
exports.reassignWorkflow = function (ctx, next) { return __awaiter(_this, void 0, void 0, function () {
    var payload, _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                payload = {
                    executionId: ctx.params.executionId,
                    userId: ctx.request.body.userId,
                    applicationId: ctx.request.body.appId,
                    workflowId: ctx.request.body.workflowId
                };
                _a = ctx.state;
                return [4 /*yield*/, applicationExecutionService.reassignWorkflow(payload)];
            case 1:
                _a.data = _b.sent();
                return [4 /*yield*/, next()];
            case 2:
                _b.sent();
                return [2 /*return*/];
        }
    });
}); };
exports.withdraw = function (ctx, next) { return __awaiter(_this, void 0, void 0, function () {
    var executionId, executionWorkflowId, userId, _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                executionId = ctx.params.executionId;
                executionWorkflowId = ctx.params.executionWorkflowId;
                userId = ctx.state.user.userId;
                _a = ctx.state;
                return [4 /*yield*/, applicationExecutionService.withdraw(userId, executionId, executionWorkflowId)];
            case 1:
                _a.data = _b.sent();
                return [4 /*yield*/, next()];
            case 2:
                _b.sent();
                return [2 /*return*/];
        }
    });
}); };
