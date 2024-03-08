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
var encryption = require("../utils/encryption");
var userRepo = require("../repositories/user");
var departmentRepo = require("../repositories/department");
var officeLocationRepo = require("../repositories/office-location");
var joiSchema = require("../validations/schemas/user");
var index_1 = require("./../validations/index");
exports.findById = function (userId) { return __awaiter(_this, void 0, void 0, function () {
    var user, roleIds;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, index_1.validate({ userId: userId }, joiSchema.getUserById)];
            case 1:
                _a.sent();
                return [4 /*yield*/, userRepo.findById(userId)];
            case 2:
                user = _a.sent();
                if (!user) {
                    throw boom.badRequest('Invalid user id');
                }
                user = user.get({ plain: true });
                roleIds = _.reject(user.userRoles.map(function (userRole) { return userRole.role && userRole.role.id; }), _.isUndefined);
                user.roleIds = roleIds;
                delete user.userRoles;
                return [2 /*return*/, user];
        }
    });
}); };
exports.getAll = function (loggedInUser) { return __awaiter(_this, void 0, void 0, function () {
    var users, returnUsers, _i, users_1, user, roles;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, userRepo.getAll()];
            case 1:
                users = _a.sent();
                returnUsers = [];
                for (_i = 0, users_1 = users; _i < users_1.length; _i++) {
                    user = users_1[_i];
                    user = user.get({ plain: true });
                    if (user.id === loggedInUser.userId) {
                        user.firstName = 'Self';
                        user.lastName = '';
                    }
                    roles = _.reject(user.userRoles.map(function (userRole) { return userRole.role && userRole.role.name; }), _.isUndefined);
                    user.role = roles;
                    delete user.userRoles;
                    returnUsers.push(user);
                }
                return [2 /*return*/, returnUsers];
        }
    });
}); };
exports.getByDepartmentId = function (departmentId, loggedInUserId) { return __awaiter(_this, void 0, void 0, function () {
    var users, indexOfCurrentUser;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, index_1.validate({ departmentId: departmentId }, joiSchema.getUserByDepartmentId)];
            case 1:
                _a.sent();
                return [4 /*yield*/, userRepo.getByDepartmentId(departmentId, loggedInUserId)];
            case 2:
                users = _a.sent();
                indexOfCurrentUser = users.findIndex(function (user) { return user.id === loggedInUserId; });
                if (indexOfCurrentUser >= 0) {
                    users[indexOfCurrentUser].firstName = 'Self';
                    users[indexOfCurrentUser].lastName = '';
                }
                return [2 /*return*/, users];
        }
    });
}); };
exports.saveUser = function (payload) { return __awaiter(_this, void 0, void 0, function () {
    var existingUser, editUser, user_1, department, officeLocation, user, encryptedPassword, savedUser, userRoles;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, index_1.validate(payload, joiSchema.userRequest)];
            case 1:
                _a.sent();
                return [4 /*yield*/, userRepo.findByEmail(payload.email)];
            case 2:
                existingUser = _a.sent();
                if (existingUser && existingUser.id !== payload.id) {
                    throw boom.badRequest('User already exist with same email');
                }
                if (!payload.id) return [3 /*break*/, 4];
                return [4 /*yield*/, userRepo.findById(payload.id)];
            case 3:
                editUser = _a.sent();
                if (!editUser) {
                    throw boom.badRequest('Invalid user id');
                }
                _a.label = 4;
            case 4:
                if (!payload.managerId) return [3 /*break*/, 6];
                return [4 /*yield*/, userRepo.findById(payload.managerId)];
            case 5:
                user_1 = _a.sent();
                if (!user_1) {
                    throw boom.badRequest('Invalid manager id');
                }
                _a.label = 6;
            case 6:
                if (!payload.departmentId) return [3 /*break*/, 8];
                return [4 /*yield*/, departmentRepo.findById(payload.departmentId)];
            case 7:
                department = _a.sent();
                if (!department) {
                    throw boom.badRequest('Invalid department id');
                }
                _a.label = 8;
            case 8:
                if (!payload.officeLocationId) return [3 /*break*/, 10];
                return [4 /*yield*/, officeLocationRepo.findById(payload.officeLocationId)];
            case 9:
                officeLocation = _a.sent();
                if (!officeLocation) {
                    throw boom.badRequest('Invalid office location id');
                }
                _a.label = 10;
            case 10:
                user = {
                    id: payload.id,
                    firstName: payload.firstName,
                    lastName: payload.lastName,
                    country: payload.country,
                    city: payload.city,
                    contactNo: payload.contactNo,
                    email: payload.email,
                    pictureUrl: payload.pictureUrl || undefined,
                    gender: payload.gender,
                    timezone: payload.timezone || undefined,
                    managerId: payload.managerId,
                    departmentId: payload.departmentId,
                    officeLocationId: payload.officeLocationId
                };
                if (payload.password) {
                    encryptedPassword = encryption.saltHashPassword(payload.password);
                    user.password = encryptedPassword;
                }
                console.log("User---", user);
                return [4 /*yield*/, userRepo.upsertUser(user)];
            case 11:
                savedUser = _a.sent();
                userRoles = [];
                payload.roleIds.forEach(function (roleId) {
                    userRoles.push({
                        userId: savedUser[0].id,
                        roleId: roleId,
                        isActive: true
                    });
                });
                return [4 /*yield*/, userRepo.deleteUserRoles(savedUser[0].id)];
            case 12:
                _a.sent();
                return [4 /*yield*/, userRepo.saveUserRoles(userRoles)];
            case 13:
                _a.sent();
                return [2 /*return*/, { success: true }];
        }
    });
}); };
exports.deleteUser = function (loggedInUserId, userId) { return __awaiter(_this, void 0, void 0, function () {
    var user;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, index_1.validate({ userId: userId }, joiSchema.getUserById)];
            case 1:
                _a.sent();
                if (loggedInUserId === userId) {
                    throw boom.badRequest('You are not authorize to delete this user');
                }
                return [4 /*yield*/, userRepo.findById(userId)];
            case 2:
                user = _a.sent();
                if (!user) {
                    throw boom.badRequest('Invalid user id');
                }
                return [4 /*yield*/, userRepo.deleteUser(loggedInUserId, userId)];
            case 3:
                _a.sent();
                return [2 /*return*/, { success: true }];
        }
    });
}); };
