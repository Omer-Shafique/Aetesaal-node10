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
var boom = require("boom");
var _ = require('lodash');
var index_1 = require("../validations/index");
var helper = require("../utils/helper");
var joiSchema = require("../validations/schemas/application");
var applicationRepo = require("../repositories/application");
var applicationWorkflowRepo = require("../repositories/application-workflow");
var applicationWorkflowPermissionRepo = require("../repositories/application-workflow-permission");
var userRepo = require("../repositories/user");
var groupRepo = require("../repositories/group");
var application_1 = require("../enum/application");
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
                return [2 /*return*/, applicationWorkflowRepo.getByApplicationId(applicationId)];
        }
    });
}); };
exports.saveApplicationWorkflow = function (applicationId, loggedInUserId, applicationWorkflows) { return __awaiter(_this, void 0, void 0, function () {
    var savedApp, ids, applicationSections, userIds, users, workflowIndex, _i, applicationWorkflows_1, workflow, group, savedWorkflow, _a, _b, userId, newPermission;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0: return [4 /*yield*/, index_1.validate({ payload: applicationWorkflows }, joiSchema.saveApplicationWorkflowArray)];
            case 1:
                _c.sent();
                return [4 /*yield*/, applicationRepo.findById(applicationId)];
            case 2:
                savedApp = _c.sent();
                if (!savedApp) {
                    throw boom.badRequest('Invalid application id');
                }
                ids = _.reject(applicationWorkflows.map(function (form) { return form.id; }), helper.rejectUndefinedOrNull);
                return [4 /*yield*/, applicationWorkflowRepo.findByIds(ids)];
            case 3:
                applicationSections = _c.sent();
                if (applicationSections.length !== ids.length) {
                    throw boom.badRequest('Invalid application workflow id');
                }
                userIds = _.reject(applicationWorkflows.map(function (form) { return form.userIds; }), _.isUndefined);
                userIds = _.flatMap(userIds);
                if (!(userIds && userIds.length)) return [3 /*break*/, 5];
                return [4 /*yield*/, userRepo.findByIds(userIds)];
            case 4:
                users = _c.sent();
                if (users.length !== _.uniq(userIds).length) {
                    throw boom.badRequest('Invalid user ids');
                }
                _c.label = 5;
            case 5:
                workflowIndex = 1;
                _i = 0, applicationWorkflows_1 = applicationWorkflows;
                _c.label = 6;
            case 6:
                if (!(_i < applicationWorkflows_1.length)) return [3 /*break*/, 18];
                workflow = applicationWorkflows_1[_i];
                workflow.applicationId = applicationId;
                workflow.order = workflowIndex;
                if (!workflow.id) return [3 /*break*/, 8];
                return [4 /*yield*/, applicationWorkflowPermissionRepo.hardDeleteWorkflowPermissionByWorkflowId(workflow.id)];
            case 7:
                _c.sent();
                workflow.updatedBy = loggedInUserId;
                if (workflow.assignTo !== application_1.ApplicationWorkflowAssignTo.GROUP) {
                    workflow.groupId = null;
                }
                return [3 /*break*/, 9];
            case 8:
                workflow.createdBy = loggedInUserId;
                _c.label = 9;
            case 9:
                if (!workflow.groupId) return [3 /*break*/, 11];
                return [4 /*yield*/, groupRepo.findById(workflow.groupId)];
            case 10:
                group = _c.sent();
                if (!group) {
                    throw boom.badRequest('Invalid group id');
                }
                _c.label = 11;
            case 11: return [4 /*yield*/, applicationWorkflowRepo.saveApplicationWorkflow(workflow)];
            case 12:
                savedWorkflow = _c.sent();
                if (!workflow.userIds) {
                    workflow.userIds = [];
                }
                _a = 0, _b = workflow.userIds;
                _c.label = 13;
            case 13:
                if (!(_a < _b.length)) return [3 /*break*/, 16];
                userId = _b[_a];
                newPermission = {
                    applicationWorkflowId: savedWorkflow.id,
                    userId: userId
                };
                return [4 /*yield*/, applicationWorkflowPermissionRepo.saveApplicationWorkflowPermission(newPermission)];
            case 14:
                _c.sent();
                _c.label = 15;
            case 15:
                _a++;
                return [3 /*break*/, 13];
            case 16:
                workflowIndex += 1;
                _c.label = 17;
            case 17:
                _i++;
                return [3 /*break*/, 6];
            case 18: return [2 /*return*/, exports.getByApplicationId(applicationId)];
        }
    });
}); };
