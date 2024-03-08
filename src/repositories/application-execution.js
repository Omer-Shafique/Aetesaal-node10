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
var Sequelize = require("sequelize");
var database_1 = require("./../bootstrap/database");
var index_1 = require("../models/index");
var application_1 = require("./../enum/application");
exports.getAll = function (userId, applyCreatedBy) {
    if (applyCreatedBy === void 0) { applyCreatedBy = false; }
    return __awaiter(_this, void 0, void 0, function () {
        var where;
        return __generator(this, function (_a) {
            where = {
                isActive: true
            };
            if (applyCreatedBy) {
                where.createdBy = userId;
            }
            return [2 /*return*/, index_1.Models.ApplicationExecution.findAll({
                    attributes: ['id', 'applicationId', 'startedAt', 'status', 'createdAt', 'updatedAt'],
                    where: where,
                    include: [{
                            model: index_1.Models.ApplicationExecutionForm,
                            attributes: ['id', 'applicationExecutionId', 'applicationFormFieldId', 'value', 'isActive'],
                            where: {
                                isActive: true
                            },
                            include: [{
                                    model: index_1.Models.ApplicationFormField
                                }]
                        }, {
                            model: index_1.Models.Application,
                            where: {
                                isActive: true
                            }
                        }, {
                            model: index_1.Models.ApplicationExecutionWorkflow,
                            include: [{
                                    model: index_1.Models.ApplicationWorkflow
                                }]
                        }]
                })];
        });
    });
};
exports.getAllForParticipatedReport = function (userId, applyCreatedBy) {
    if (applyCreatedBy === void 0) { applyCreatedBy = false; }
    return __awaiter(_this, void 0, void 0, function () {
        var where;
        return __generator(this, function (_a) {
            where = {
                isActive: true
            };
            if (applyCreatedBy) {
                where.createdBy = userId;
            }
            return [2 /*return*/, index_1.Models.ApplicationExecution.findAll({
                    attributes: ['id', 'applicationId', 'startedAt', 'status', 'createdAt', 'updatedAt'],
                    where: where,
                    include: [{
                            model: index_1.Models.Application,
                            where: {
                                isActive: true
                            }
                        }]
                })];
        });
    });
};
exports.getByApplicationId = function (applicationId) { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, index_1.Models.ApplicationExecution.findAll({
                attributes: ['id', 'applicationId', 'startedAt', 'status', 'createdAt', 'updatedAt'],
                where: {
                    isActive: true,
                    applicationId: applicationId
                },
                include: [{
                        model: index_1.Models.ApplicationExecutionForm,
                        attributes: ['id', 'applicationExecutionId', 'applicationFormFieldId', 'value', 'isActive'],
                        where: {
                            isActive: true
                        },
                        include: [{
                                model: index_1.Models.ApplicationFormField
                            }]
                    }, {
                        model: index_1.Models.Application
                    }]
            })];
    });
}); };
exports.findByIdForValidation = function (id) { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, index_1.Models.ApplicationExecution.findOne({
                attributes: ['id', 'applicationId', 'startedAt', 'status',
                    'createdAt', 'createdBy', 'updatedAt', 'latitude', 'longitude'],
                where: {
                    isActive: true,
                    id: id
                }
            })];
    });
}); };
exports.findById = function (id) { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, index_1.Models.ApplicationExecution.findOne({
                attributes: ['id', 'applicationId', 'startedAt', 'status',
                    'createdAt', 'createdBy', 'updatedAt', 'latitude', 'longitude'],
                where: {
                    isActive: true,
                    id: id
                },
                include: [{
                        model: index_1.Models.User,
                        as: 'createdByUser'
                    }, {
                        model: index_1.Models.Application,
                        where: {
                            isActive: true
                        }
                    }, {
                        model: index_1.Models.ApplicationExecutionForm,
                        include: [{
                                model: index_1.Models.ApplicationFormField
                            }],
                        where: {
                            isActive: true
                        }
                    }, {
                        model: index_1.Models.ApplicationExecutionWorkflow,
                        include: [{
                                model: index_1.Models.ApplicationWorkflow,
                                include: [{
                                        model: index_1.Models.ApplicationWorkflowPermission
                                    }]
                            }]
                    }]
            })];
    });
}); };
exports.getApplicationExecutionsForApproval = function (type) { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, index_1.Models.ApplicationExecution.findAll({
                attributes: ['id', 'applicationId', 'title', 'startedAt', 'status', 'createdAt', 'updatedAt', 'createdBy'],
                where: {
                    isActive: true
                },
                include: [{
                        model: index_1.Models.User,
                        as: 'createdByUser'
                    }, {
                        model: index_1.Models.Application,
                        where: {
                            isActive: true
                        }
                    }, {
                        model: index_1.Models.ApplicationExecutionForm,
                        include: [{
                                model: index_1.Models.ApplicationFormField
                            }],
                        where: {
                            isActive: true
                        }
                    }, {
                        model: index_1.Models.ApplicationExecutionWorkflow,
                        where: {
                            status: application_1.ApplicationExecutionStatus.DRAFT
                        },
                        include: [{
                                model: index_1.Models.ApplicationWorkflow,
                                where: {
                                    type: type
                                },
                                include: [{
                                        model: index_1.Models.ApplicationWorkflowPermission
                                    }]
                            }]
                    }]
            })];
    });
}); };
exports.getApplicationExecutionsForApprovalCount = function (userId, type) { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, index_1.Models.ApplicationExecution.count({
                where: {
                    isActive: true
                },
                include: [{
                        model: index_1.Models.User,
                        as: 'createdByUser'
                    }, {
                        model: index_1.Models.ApplicationExecutionWorkflow,
                        where: {
                            status: application_1.ApplicationExecutionStatus.DRAFT
                        },
                        include: [{
                                model: index_1.Models.ApplicationWorkflow,
                                where: {
                                    type: type
                                },
                                include: [{
                                        model: index_1.Models.ApplicationWorkflowPermission,
                                        where: {
                                            userId: userId
                                        }
                                    }]
                            }]
                    }]
            })];
    });
}); };
exports.getDraftApplicationExecutions = function (userId) { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, index_1.Models.ApplicationExecution.findAll({
                attributes: ['id', 'applicationId', 'title', 'startedAt', 'status', 'createdAt', 'updatedAt', 'createdBy'],
                where: {
                    isActive: true,
                    createdBy: userId,
                    status: application_1.ApplicationExecutionStatus.DRAFT
                },
                include: [{
                        model: index_1.Models.Application,
                        where: {
                            isActive: true
                        }
                    }, {
                        model: index_1.Models.ApplicationExecutionForm,
                        include: [{
                                model: index_1.Models.ApplicationFormField
                            }],
                        where: {
                            isActive: true
                        }
                    }, {
                        model: index_1.Models.ApplicationExecutionWorkflow,
                        include: [{
                                model: index_1.Models.ApplicationWorkflow
                            }]
                    }]
            })];
    });
}); };
exports.getApprovedApplicationExecutions = function (userId) { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, index_1.Models.ApplicationExecution.findAll({
                attributes: ['id', 'applicationId', 'title', 'startedAt', 'status', 'createdAt', 'updatedAt', 'createdBy'],
                where: {
                    isActive: true,
                    updatedBy: userId,
                    status: application_1.ApplicationExecutionStatus.APPROVED
                },
                include: [{
                        model: index_1.Models.Application,
                        where: {
                            isActive: true
                        }
                    }, {
                        model: index_1.Models.ApplicationExecutionForm,
                        include: [{
                                model: index_1.Models.ApplicationFormField
                            }],
                        where: {
                            isActive: true
                        }
                    }, {
                        model: index_1.Models.ApplicationExecutionWorkflow,
                        where: {
                            status: application_1.ApplicationExecutionStatus.APPROVED
                        },
                        include: [{
                                model: index_1.Models.ApplicationWorkflow
                            }]
                    }]
            })];
    });
}); };
exports.getDraftApplicationExecutionsCount = function (userId) { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, index_1.Models.ApplicationExecution.count({
                where: {
                    isActive: true,
                    createdBy: userId,
                    status: application_1.ApplicationExecutionStatus.DRAFT
                },
                include: [{
                        model: index_1.Models.Application,
                        where: {
                            isActive: true
                        }
                    }, {
                        model: index_1.Models.ApplicationExecutionForm,
                        where: {
                            isActive: true
                        }
                    }]
            })];
    });
}); };
exports.getApplicationExecutionInProcess = function (userId, status) { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, index_1.Models.ApplicationExecution.findAll({
                attributes: ['id', 'applicationId', 'title', 'startedAt', 'status', 'createdAt', 'updatedAt', 'createdBy'],
                where: {
                    isActive: true,
                    createdBy: userId
                },
                include: [{
                        model: index_1.Models.Application,
                        attributes: ['id', 'subject'],
                        where: {
                            isActive: true
                        }
                    }, {
                        model: index_1.Models.ApplicationExecutionForm,
                        attributes: ['id', 'applicationFormFieldId'],
                        include: [{
                                model: index_1.Models.ApplicationFormField
                            }],
                        where: {
                            isActive: true
                        }
                    }, {
                        model: index_1.Models.ApplicationExecutionWorkflow,
                        attributes: ['id', 'applicationWorkflowId'],
                        where: {
                            status: status
                        },
                        include: [{
                                model: index_1.Models.ApplicationWorkflow
                            }]
                    }]
            })];
    });
}); };
exports.getApplicationExecutionInProcessCount = function (userId, status) { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, index_1.Models.ApplicationExecution.count({
                where: {
                    isActive: true,
                    createdBy: userId
                },
                include: [{
                        model: index_1.Models.ApplicationExecutionWorkflow,
                        where: {
                            status: status
                        },
                        include: [{
                                model: index_1.Models.ApplicationWorkflow
                            }]
                    }]
            })];
    });
}); };
exports.getApplicationExecutionParticipatedIds = function (userId) { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, database_1.Database.query("\n        WITH\n        A AS (\n            SELECT\n            \"applicationExecutionId\", jsonb_array_elements(\"comments\") AS comments\n            FROM \"applicationExecutionWorkflow\"\n        )\n        SELECT distinct(\"applicationExecutionId\") as id\n        FROM A\n        WHERE (comments->>'userId') = '" + userId + "';\n    ")];
    });
}); };
exports.getApplicationExecutionsByIds = function (ids) { return __awaiter(_this, void 0, void 0, function () {
    var _a;
    return __generator(this, function (_b) {
        return [2 /*return*/, index_1.Models.ApplicationExecution.findAll({
                attributes: ['id', 'applicationId', 'title', 'startedAt', 'status', 'createdAt', 'updatedAt', 'createdBy'],
                where: {
                    isActive: true,
                    id: (_a = {},
                        _a[Sequelize.Op["in"]] = ids,
                        _a)
                },
                include: [{
                        model: index_1.Models.Application,
                        where: {
                            isActive: true
                        }
                    }, {
                        model: index_1.Models.ApplicationExecutionForm,
                        include: [{
                                model: index_1.Models.ApplicationFormField
                            }],
                        where: {
                            isActive: true
                        }
                    }, {
                        model: index_1.Models.ApplicationExecutionWorkflow,
                        include: [{
                                model: index_1.Models.ApplicationWorkflow
                            }]
                    }]
            })];
    });
}); };
exports.getApplicationExecutionsForTimeReport = function (applicationId, startDate, endDate) { return __awaiter(_this, void 0, void 0, function () {
    var result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, database_1.Database.query("\n        select distinct execution.id, execution.latitude, execution.longitude, execution.\"createdAt\",\n        execution.\"createdBy\", app.\"name\", execution.\"applicationId\",\n        (\n            select REPLACE(app.subject, concat('{', ef.\"fieldId\", '}'), ef.value) from \"applicationExecutionForm\" ef\n            where ef.\"applicationExecutionId\" = execution.id and\n            app.subject ilike concat('%', ef.\"fieldId\", '%') limit 1\n        ) as title\n        from \"applicationExecution\" execution\n        inner join application app on execution.\"applicationId\" = app.id and app.\"isActive\" = true\n        inner join \"user\" u on u.id = execution.\"createdBy\"\n        where execution.\"applicationId\" = '" + applicationId + "' and execution.\"isActive\" = true\n        and execution.\"createdAt\" >= '" + startDate + "' and execution.\"createdAt\" < '" + endDate + "'\n    ").then(function (res) { return res[0]; })];
            case 1:
                result = _a.sent();
                return [2 /*return*/, result];
        }
    });
}); };
// Raw query
exports.getDraftApplicationExecutionQuery = function (userId, status, applicationId, startDate, endDate) { return __awaiter(_this, void 0, void 0, function () {
    var query, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                query = "select distinct execution.id, execution.\"createdAt\", execution.\"createdBy\", app.\"name\",\n        u.\"managerId\", u.\"departmentId\", u.\"officeLocationId\", execution.\"applicationId\", execution.\"updatedAt\",\n        u.\"firstName\" as \"createdByName\", workflow.\"canWithdraw\", ew.\"userPermissionId\",\n        workflow.\"assignTo\", workflow.\"groupId\",\n        (\n            select REPLACE(app.subject, concat('{', ef.\"fieldId\", '}'), ef.value) from \"applicationExecutionForm\" ef\n            where ef.\"applicationExecutionId\" = execution.id and\n            app.subject ilike concat('%', ef.\"fieldId\", '%') limit 1\n        ) as title\n        from \"applicationExecution\" execution\n        inner join application app on execution.\"applicationId\" = app.id and app.\"isActive\" = true\n        inner join \"user\" u on u.id = execution.\"createdBy\"\n        left join \"applicationExecutionWorkflow\" ew on ew.\"applicationExecutionId\" = execution.id\n        and ew.status = 'draft'\n        left join \"applicationWorkflow\" workflow on ew.\"applicationWorkflowId\" = workflow.id\n        and ew.\"isActive\" = true\n        where execution.\"createdBy\" = '" + userId + "' and execution.status = '" + status + "'\n        and execution.\"isActive\" = true";
                if (applicationId) {
                    query += " and execution.\"applicationId\" = '" + applicationId + "'";
                }
                if (startDate) {
                    query += " and execution.\"createdAt\" >= '" + startDate + "'";
                }
                if (endDate) {
                    query += " and execution.\"createdAt\" < '" + endDate + "'";
                }
                query += " order by execution.\"updatedAt\" desc";
                return [4 /*yield*/, database_1.Database.query(query).then(function (res) { return res[0]; })];
            case 1:
                result = _a.sent();
                return [2 /*return*/, result];
        }
    });
}); };
exports.getApplicationExecutionInProcessQuery = function (payload) { return __awaiter(_this, void 0, void 0, function () {
    var query, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                query = "select distinct execution.id, execution.\"createdAt\", execution.\"createdBy\", app.\"name\",\n        u.\"managerId\", u.\"departmentId\", u.\"officeLocationId\", execution.\"applicationId\", execution.\"updatedAt\",\n        ew.\"applicationWorkflowId\", workflow.\"showMap\", workflow.\"canWithdraw\", workflow.\"assignTo\", workflow.\"groupId\",\n        u.\"firstName\" as \"createdByName\", workflow.\"name\" as \"applicationWorkflowName\", ew.\"userPermissionId\",\n        (\n            select REPLACE(app.subject, concat('{', ef.\"fieldId\", '}'), ef.value) from \"applicationExecutionForm\" ef\n            where ef.\"applicationExecutionId\" = execution.id and\n            app.subject ilike concat('%', ef.\"fieldId\", '%') limit 1\n        ) as title,\n        row_number() over (partition\n            by\n                \"ew\".\"applicationExecutionId\"\n            order by\n                \"ew\".\"createdAt\" desc) as rank\n        from \"applicationExecution\" execution\n        inner join application app on execution.\"applicationId\" = app.id and app.\"isActive\" = true\n        inner join \"user\" u on u.id = execution.\"createdBy\"\n        left join \"applicationExecutionWorkflow\" ew on ew.\"applicationExecutionId\" = execution.id\n        and ew.status = '" + payload.status + "'\n        inner join \"applicationWorkflow\" workflow on ew.\"applicationWorkflowId\" = workflow.id\n        and ew.\"isActive\" = true\n        where execution.\"isActive\" = true and execution.\"status\" = '" + payload.status + "'";
                if (!payload.isAdmin) {
                    if (payload.isClarity) {
                        query += " and ew.\"clarificationUserId\" = '" + payload.userId + "'";
                    }
                    else {
                        query += " and execution.\"createdBy\" = '" + payload.userId + "'";
                    }
                }
                if (payload.applicationId) {
                    query += " and execution.\"applicationId\" = '" + payload.applicationId + "'";
                }
                if (payload.startDate) {
                    query += " and execution.\"createdAt\" >= '" + payload.startDate + "'";
                }
                if (payload.endDate) {
                    query += " and execution.\"createdAt\" < '" + payload.endDate + "'";
                }
                query += " order by execution.\"createdAt\" desc";
                query = "select * from (" + query + ") x where x.rank = 1";
                return [4 /*yield*/, database_1.Database.query(query).then(function (res) { return res[0]; })];
            case 1:
                result = _a.sent();
                return [2 /*return*/, result];
        }
    });
}); };
exports.getApplicationExecutionByWorkflowTypeAndStatusQuery = function (status, type, applicationId, startDate, endDate) { return __awaiter(_this, void 0, void 0, function () {
    var query, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                query = "select distinct execution.id, execution.\"createdAt\", execution.\"createdBy\", app.\"name\",\n        u.\"managerId\", u.\"departmentId\", u.\"officeLocationId\", execution.\"applicationId\", execution.\"updatedAt\",\n        ew.\"applicationWorkflowId\", workflow.\"showMap\", workflow.\"canWithdraw\", workflow.\"assignTo\", workflow.\"groupId\",\n        u.\"firstName\" as \"createdByName\", workflow.\"name\" as \"applicationWorkflowName\", ew.\"userPermissionId\",\n        (\n            select REPLACE(app.subject, concat('{', ef.\"fieldId\", '}'), ef.value) from \"applicationExecutionForm\" ef\n            where ef.\"applicationExecutionId\" = execution.id and\n            app.subject ilike concat('%', ef.\"fieldId\", '%') limit 1\n        ) as title\n        from \"applicationExecution\" execution\n        inner join application app on execution.\"applicationId\" = app.id and app.\"isActive\" = true\n        inner join \"user\" u on u.id = execution.\"createdBy\"\n        inner join \"applicationExecutionWorkflow\" ew on ew.\"applicationExecutionId\" = execution.id\n        and ew.status = '" + status + "' and ew.\"isActive\" = true\n        inner join \"applicationWorkflow\" workflow on ew.\"applicationWorkflowId\" = workflow.id\n        and workflow.type = '" + type + "' and workflow.\"isActive\" = true\n        where execution.\"isActive\" = true";
                if (applicationId) {
                    query += " and execution.\"applicationId\" = '" + applicationId + "'";
                }
                if (startDate) {
                    query += " and execution.\"createdAt\" >= '" + startDate + "'";
                }
                if (endDate) {
                    query += " and execution.\"createdAt\" < '" + endDate + "'";
                }
                query += " order by execution.\"createdAt\" desc";
                return [4 /*yield*/, database_1.Database.query(query).then(function (res) { return res[0]; })];
            case 1:
                result = _a.sent();
                return [2 /*return*/, result];
        }
    });
}); };
exports.getParticipatedApplicationExecutionQuery = function (userId, searchText, startDate, endDate) { return __awaiter(_this, void 0, void 0, function () {
    var query, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                query = "select * from ex where excount > 0 and ex.\"createdBy\" != '" + userId + "'";
                if (startDate) {
                    query += " and ex.\"createdAt\" >= '" + startDate + "'";
                }
                if (endDate) {
                    query += " and ex.\"createdAt\" < '" + endDate + "'";
                }
                if (searchText) {
                    query += " and title ilike '%" + searchText + "%'";
                }
                return [4 /*yield*/, database_1.Database.query("\n        WITH ex AS (\n            select distinct execution.id, execution.\"createdAt\", execution.\"createdBy\", execution.\"applicationId\",\n            app.\"name\",\n            (select count(id) from \"applicationExecutionWorkflow\" aew where aew.\"applicationExecutionId\" = execution.id\n            and (aew.\"createdBy\" = '" + userId + "' OR aew.\"updatedBy\" = '" + userId + "')) as excount,\n            (\n                select REPLACE(app.subject, concat('{', ef.\"fieldId\", '}'), ef.value) from \"applicationExecutionForm\" ef\n                where ef.\"applicationExecutionId\" = execution.id and\n                app.subject ilike concat('%', ef.\"fieldId\", '%') limit 1\n            ) as title,\n            \"outWorkflow\".\"canWithdraw\",\n            u.\"firstName\" as \"createdByName\"\n            from \"applicationExecution\" execution\n            inner join application app on execution.\"applicationId\" = app.id and app.\"isActive\" = true\n            inner join \"user\" u on u.id = execution.\"createdBy\"\n            LEFT JOIN LATERAL\n                (SELECT \"executionWorkflow\".\"applicationWorkflowId\", workflow.\"canWithdraw\"\n                FROM \"applicationExecutionWorkflow\" \"executionWorkflow\"\n                inner join \"applicationWorkflow\" workflow on workflow.id = \"executionWorkflow\".\"applicationWorkflowId\"\n                WHERE \"executionWorkflow\".\"applicationExecutionId\" = execution.id\n                ORDER BY \"executionWorkflow\".\"createdAt\" DESC LIMIT 1)\n                \"outWorkflow\" ON true\n        )\n        " + query + " order by \"createdAt\" desc;\n    ").then(function (res) { return res[0]; })];
            case 1:
                result = _a.sent();
                return [2 /*return*/, result];
        }
    });
}); };
exports.getTotalApplicationExecutionQuery = function (applicationId, startDate, endDate) { return __awaiter(_this, void 0, void 0, function () {
    var result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, database_1.Database.query("\n        select distinct execution.id, execution.\"createdAt\", execution.status, u.\"firstName\" as \"createdByName\",\n        (\n            select REPLACE(app.subject, concat('{', ef.\"fieldId\", '}'), ef.value) from \"applicationExecutionForm\" ef\n            where ef.\"applicationExecutionId\" = execution.id and\n            app.subject ilike concat('%', ef.\"fieldId\", '%') limit 1\n        ) as title\n        from \"applicationExecution\" execution\n        inner join application app on execution.\"applicationId\" = app.id and app.\"isActive\" = true\n        inner join \"user\" u on u.id = execution.\"createdBy\"\n        inner join \"applicationExecutionWorkflow\" aew on aew.\"applicationExecutionId\" = execution.id\n        where execution.\"applicationId\" = '" + applicationId + "' and execution.\"isActive\" = true\n        and execution.\"createdAt\" >= '" + startDate + "' and execution.\"createdAt\" < '" + endDate + "'\n    ").then(function (res) { return res[0]; })];
            case 1:
                result = _a.sent();
                return [2 /*return*/, result];
        }
    });
}); };
exports.getAllExecutionsByStatus = function (userId, status, applicationId, forAdmin, startDate, endDate) {
    if (forAdmin === void 0) { forAdmin = false; }
    return __awaiter(_this, void 0, void 0, function () {
        var query, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    query = "select distinct execution.id, execution.\"createdAt\", execution.\"createdBy\", app.\"name\",\n        u.\"managerId\", u.\"departmentId\", u.\"officeLocationId\", execution.\"applicationId\", execution.\"updatedAt\",\n        u.\"firstName\" as \"createdByName\", workflow.\"name\" as \"applicationWorkflowName\",\n        (\n            select REPLACE(app.subject, concat('{', ef.\"fieldId\", '}'), ef.value) from \"applicationExecutionForm\" ef\n            where ef.\"applicationExecutionId\" = execution.id and\n            app.subject ilike concat('%', ef.\"fieldId\", '%') limit 1\n        ) as title\n        from \"applicationExecution\" execution\n        inner join application app on execution.\"applicationId\" = app.id and app.\"isActive\" = true\n        inner join \"user\" u on u.id = execution.\"createdBy\"\n        inner join \"applicationExecutionWorkflow\" ew on ew.\"applicationExecutionId\" = execution.id\n        and ew.status = 'draft' and ew.\"isActive\" = true\n        inner join \"applicationWorkflow\" workflow on ew.\"applicationWorkflowId\" = workflow.id\n        and workflow.\"isActive\" = true\n        where execution.status in (" + status.map(function (s) { return "'" + s + "'"; }).join(',') + ")\n        and execution.\"isActive\" = true";
                    if (applicationId) {
                        query += " and execution.\"applicationId\" = '" + applicationId + "'";
                    }
                    if (!forAdmin) {
                        query += " and execution.\"createdBy\" = '" + userId + "'";
                    }
                    if (startDate) {
                        query += " and execution.\"createdAt\" >= '" + startDate + "'";
                    }
                    if (endDate) {
                        query += " and execution.\"createdAt\" < '" + endDate + "'";
                    }
                    return [4 /*yield*/, database_1.Database.query(query).then(function (res) { return res[0]; })];
                case 1:
                    result = _a.sent();
                    return [2 /*return*/, result];
            }
        });
    });
};
exports.getParticipatedUsersByExecutionId = function (executionId) { return __awaiter(_this, void 0, void 0, function () {
    var result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, database_1.Database.query("\n        select distinct \"createdByUser\".id as \"createdBy\", \"updatedByUser\".id as \"updatedBy\"\n        from \"applicationExecution\" execution\n        inner join \"applicationExecutionWorkflow\" aew on aew.\"applicationExecutionId\" = execution.id\n        inner join \"user\" \"createdByUser\" on aew.\"createdBy\" = \"createdByUser\".id\n        left join \"user\" \"updatedByUser\" on aew.\"updatedBy\" = \"updatedByUser\".id\n        where execution.\"id\" = '" + executionId + "' and execution.\"isActive\" = true\n    ").then(function (res) { return res[0]; })];
            case 1:
                result = _a.sent();
                return [2 /*return*/, result];
        }
    });
}); };
exports.getExecutionIdsByStartEndDate = function (applicationId, startDate, endDate, status) { return __awaiter(_this, void 0, void 0, function () {
    var query, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                query = "select distinct execution.id\n        from \"applicationExecution\" execution\n        where execution.\"applicationId\" = '" + applicationId + "'\n        and execution.\"createdAt\" >= '" + startDate + "' and execution.\"createdAt\" < '" + endDate + "'";
                if (status && status !== 'all') {
                    query += " and execution.status = '" + status + "'";
                }
                return [4 /*yield*/, database_1.Database.query(query).then(function (res) { return res[0]; })];
            case 1:
                result = _a.sent();
                return [2 /*return*/, result];
        }
    });
}); };
exports.findByIds = function (ids) { return __awaiter(_this, void 0, void 0, function () {
    var _a;
    return __generator(this, function (_b) {
        return [2 /*return*/, index_1.Models.ApplicationExecution.findAll({ where: { id: (_a = {}, _a[Sequelize.Op["in"]] = ids, _a) } })];
    });
}); };
exports.saveApplicationExecution = function (applicationExecution) { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, index_1.Models.ApplicationExecution.upsert(applicationExecution, { returning: true })
                .then(function (res) { return res[0]; })];
    });
}); };
exports.deleteApplicationExecution = function (id, updatedBy) { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, index_1.Models.ApplicationExecution.update({ isActive: false, updatedBy: updatedBy }, { where: { id: id } })];
    });
}); };
