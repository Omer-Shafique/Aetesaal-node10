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
var applicationFormSectionRepo = require("../repositories/application-form-section");
var applicationFormFieldRepo = require("../repositories/application-form-field");
var applicationWorkflowFieldPermissionRepo = require("../repositories/application-workflow-field-permission");
var application_1 = require("../enum/application");
exports.getByApplicationId = function (applicationId, forExecution) {
    if (forExecution === void 0) { forExecution = false; }
    return __awaiter(_this, void 0, void 0, function () {
        var application, sections;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, applicationRepo.findById(applicationId)];
                case 1:
                    application = _a.sent();
                    if (!application) {
                        throw boom.badRequest('Invalid application id');
                    }
                    return [4 /*yield*/, applicationFormSectionRepo.getByApplicationId(applicationId)];
                case 2:
                    sections = _a.sent();
                    if (!forExecution) {
                        return [2 /*return*/, sections];
                    }
                    else {
                        return [2 /*return*/, transformExecutionData(applicationId, sections)];
                    }
                    return [2 /*return*/];
            }
        });
    });
};
exports.getByApplicationIdForExecution = function (applicationId) { return __awaiter(_this, void 0, void 0, function () {
    var application, sections;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, applicationRepo.findById(applicationId)];
            case 1:
                application = _a.sent();
                if (!application) {
                    throw boom.badRequest('Invalid application id');
                }
                return [4 /*yield*/, applicationFormSectionRepo.getByApplicationId(applicationId)];
            case 2:
                sections = _a.sent();
                return [2 /*return*/, transformExecutionData(applicationId, sections)];
        }
    });
}); };
var transformExecutionData = function (applicationId, sections) { return __awaiter(_this, void 0, void 0, function () {
    var sectionsAttr, fieldPermissions, latestWorkflowId, _loop_1, _i, sections_1, sectionInstance;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                sectionsAttr = [];
                return [4 /*yield*/, applicationWorkflowFieldPermissionRepo.
                        getByApplicationId(applicationId)];
            case 1:
                fieldPermissions = _a.sent();
                latestWorkflowId = null;
                _loop_1 = function (sectionInstance) {
                    var section = sectionInstance.get({ plain: true });
                    var type = application_1.ApplicationWorkflowPermissionType.NEW;
                    if (!fieldPermissions || !fieldPermissions.length) {
                        return "continue";
                    }
                    var workflowPermission = fieldPermissions.find(function (per) { return per.type === type && per.applicationFormSectionId === section.id &&
                        per.applicationFormFieldId === null &&
                        per.applicationWorkflowId === null; });
                    if (workflowPermission && workflowPermission.permission === application_1.ApplicationWorkflowFieldPermission.HIDDEN) {
                        return "continue";
                    }
                    if (section.applicationFormFields && section.applicationFormFields.length) {
                        section.applicationFormFields = section.applicationFormFields.filter(function (field) {
                            if (!fieldPermissions || !fieldPermissions.length) {
                                return true;
                            }
                            var workflowPermission = fieldPermissions.find(function (per) { return per.type === type && per.applicationFormFieldId === field.id &&
                                per.applicationWorkflowId === null; });
                            if (workflowPermission &&
                                workflowPermission.permission === application_1.ApplicationWorkflowFieldPermission.HIDDEN) {
                                return false;
                            }
                            field.permission = workflowPermission ? workflowPermission.permission : undefined;
                            return true;
                        });
                    }
                    sectionsAttr.push(section);
                };
                for (_i = 0, sections_1 = sections; _i < sections_1.length; _i++) {
                    sectionInstance = sections_1[_i];
                    _loop_1(sectionInstance);
                }
                return [2 /*return*/, sectionsAttr];
        }
    });
}); };
exports.getApplicationSectionById = function (applicationId, sectionId) { return __awaiter(_this, void 0, void 0, function () {
    var application, formSection;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, applicationRepo.findById(applicationId)];
            case 1:
                application = _a.sent();
                if (!application) {
                    throw boom.badRequest('Invalid application id');
                }
                return [4 /*yield*/, applicationFormSectionRepo.findById(sectionId)];
            case 2:
                formSection = _a.sent();
                if (!formSection) {
                    throw boom.badRequest('Invalid application section id');
                }
                return [2 /*return*/, formSection];
        }
    });
}); };
exports.getApplicationFormFieldById = function (applicationId, fieldId) { return __awaiter(_this, void 0, void 0, function () {
    var application, formFeild;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, applicationRepo.findById(applicationId)];
            case 1:
                application = _a.sent();
                if (!application) {
                    throw boom.badRequest('Invalid application id');
                }
                return [4 /*yield*/, applicationFormFieldRepo.findById(fieldId)];
            case 2:
                formFeild = _a.sent();
                if (!formFeild) {
                    throw boom.badRequest('Invalid application form field id');
                }
                return [2 /*return*/, formFeild];
        }
    });
}); };
exports.getApplicationFieldTitles = function (applicationId) { return __awaiter(_this, void 0, void 0, function () {
    var application, sections, fields, flatfields, fieldHashMap, fieldIdsAndName;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, applicationRepo.findById(applicationId)];
            case 1:
                application = _a.sent();
                if (!application) {
                    throw boom.badRequest('Invalid application id');
                }
                return [4 /*yield*/, applicationFormSectionRepo.getByApplicationId(applicationId)];
            case 2:
                sections = _a.sent();
                fields = sections.map(function (section) { return section.applicationFormFields; });
                flatfields = _.flatten(fields.map(function (field) { return _.flatten(field); }));
                fieldHashMap = {};
                fieldIdsAndName = flatfields.map(function (field) {
                    fieldHashMap[field.key] = field.name;
                    return {
                        id: field.key,
                        name: field.name
                    };
                });
                return [2 /*return*/, { fieldHashMap: fieldHashMap, fieldIdsAndName: fieldIdsAndName }];
        }
    });
}); };
exports.saveApplicationForm = function (applicationId, applicationForms) { return __awaiter(_this, void 0, void 0, function () {
    var savedApp, ids, applicationSections, formIds, savedApplicationForms, formSectionIndex, formFieldIndex, _i, applicationForms_1, form, section, _a, _b, field;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0: return [4 /*yield*/, index_1.validate({ payload: applicationForms }, joiSchema.saveApplicationFormArray)];
            case 1:
                _c.sent();
                return [4 /*yield*/, applicationRepo.findById(applicationId)];
            case 2:
                savedApp = _c.sent();
                if (!savedApp) {
                    throw boom.badRequest('Invalid application id');
                }
                ids = _.reject(applicationForms.map(function (form) { return form.id; }), helper.rejectUndefinedOrNull);
                return [4 /*yield*/, applicationFormSectionRepo.findByIds(ids)];
            case 3:
                applicationSections = _c.sent();
                if (applicationSections.length !== ids.length) {
                    throw boom.badRequest('Invalid application section id');
                }
                formIds = _.pick(applicationForms.map(function (form) { return form.applicationFormFields; }), 'id');
                formIds = _.reject(formIds, _.isUndefined);
                return [4 /*yield*/, applicationFormFieldRepo.findByIds(formIds)];
            case 4:
                savedApplicationForms = _c.sent();
                if (savedApplicationForms.length !== formIds.length) {
                    throw boom.badRequest('Invalid application form id');
                }
                formSectionIndex = 1;
                formFieldIndex = 1;
                _i = 0, applicationForms_1 = applicationForms;
                _c.label = 5;
            case 5:
                if (!(_i < applicationForms_1.length)) return [3 /*break*/, 12];
                form = applicationForms_1[_i];
                form.applicationId = applicationId;
                form.order = formSectionIndex;
                return [4 /*yield*/, applicationFormSectionRepo.saveApplicationFormSection(form)];
            case 6:
                section = _c.sent();
                if (!form.applicationFormFields) {
                    return [3 /*break*/, 11];
                }
                _a = 0, _b = form.applicationFormFields;
                _c.label = 7;
            case 7:
                if (!(_a < _b.length)) return [3 /*break*/, 10];
                field = _b[_a];
                field.applicationFormSectionId = section.id;
                field.order = formFieldIndex;
                return [4 /*yield*/, applicationFormFieldRepo.saveApplicationFormField(field)];
            case 8:
                _c.sent();
                formFieldIndex += 1;
                _c.label = 9;
            case 9:
                _a++;
                return [3 /*break*/, 7];
            case 10:
                formSectionIndex += 1;
                _c.label = 11;
            case 11:
                _i++;
                return [3 /*break*/, 5];
            case 12: return [2 /*return*/, exports.getByApplicationId(applicationId)];
        }
    });
}); };
