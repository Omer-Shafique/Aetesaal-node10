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
var index_1 = require("../models/index");
exports.authenticate = function (email, password) { return __awaiter(_this, void 0, void 0, function () {
    var where;
    return __generator(this, function (_a) {
        where = {
            email: email,
            deletedAt: null
        };
        if (password) {
            where.password = password;
        }
        return [2 /*return*/, index_1.Models.User.findOne({
                where: where,
                include: [{
                        model: index_1.Models.UserRole,
                        include: [{
                                model: index_1.Models.Role,
                                attributes: ['id', 'name']
                            }],
                        attributes: ['id', 'userId', 'roleId']
                    }]
            })];
    });
}); };
exports.getActiveUserCount = function () { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, index_1.Models.User.count({
                where: {
                    isActive: true
                }
            })];
    });
}); };
exports.getInActiveUserCount = function () { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, index_1.Models.User.count({
                where: {
                    isActive: false
                }
            })];
    });
}); };
exports.getAll = function () { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, index_1.Models.User.findAll({
                attributes: ['id', 'firstName', 'lastName', 'email', 'contactNo', 'gender', 'pictureUrl',
                    'managerId', 'departmentId', 'officeLocationId', 'isActive', 'createdAt', 'updatedAt'],
                include: [{
                        model: index_1.Models.UserRole,
                        include: [index_1.Models.Role]
                    }],
                where: {
                    deletedAt: null
                }
            })];
    });
}); };
exports.getByDepartmentId = function (departmentId, loggedInUserId) { return __awaiter(_this, void 0, void 0, function () {
    var _a;
    return __generator(this, function (_b) {
        return [2 /*return*/, index_1.Models.User.findAll({
                attributes: ['id', 'firstName', 'lastName', 'email', 'contactNo', 'gender', 'pictureUrl',
                    'managerId', 'departmentId', 'officeLocationId', 'isActive', 'createdAt', 'updatedAt'],
                where: (_a = {
                        deletedAt: null
                    },
                    _a[Sequelize.Op.or] = {
                        departmentId: departmentId,
                        id: loggedInUserId
                    },
                    _a)
            })];
    });
}); };
exports.findById = function (id) { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, index_1.Models.User.findOne({
                attributes: ['id', 'firstName', 'lastName', 'email', 'contactNo', 'gender', 'pictureUrl',
                    'managerId', 'departmentId', 'officeLocationId', 'isActive', 'createdAt', 'updatedAt'],
                include: [{
                        model: index_1.Models.UserRole,
                        include: [index_1.Models.Role]
                    }],
                where: {
                    id: id,
                    deletedAt: null
                }
            })];
    });
}); };
exports.findByIds = function (id) { return __awaiter(_this, void 0, void 0, function () {
    var _a;
    return __generator(this, function (_b) {
        return [2 /*return*/, index_1.Models.User.findAll({
                where: {
                    id: (_a = {},
                        _a[Sequelize.Op["in"]] = id,
                        _a)
                }
            })];
    });
}); };
exports.findByEmail = function (email) { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, index_1.Models.User.findOne({
                where: {
                    email: email
                }
            })];
    });
}); };
exports.saveUser = function (user) { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, index_1.Models.User.create(user)];
    });
}); };
exports.upsertUser = function (user) { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, index_1.Models.User.insertOrUpdate(user, { returning: true })];
    });
}); };
exports.saveUserRoles = function (userRoles) { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, index_1.Models.UserRole.bulkCreate(userRoles)];
    });
}); };
exports.updateUser = function (id, user) { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, index_1.Models.User.update(user, { where: { id: id } })];
    });
}); };
exports.deleteUserRoles = function (userId) { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, index_1.Models.UserRole.destroy({ where: { userId: userId } })];
    });
}); };
exports.deleteUser = function (loggedInUserId, userId) { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, index_1.Models.User.update({ deletedAt: new Date(), deletedBy: loggedInUserId }, { where: { id: userId } })];
    });
}); };
