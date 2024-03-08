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
var lookupService = require("../services/lookup");
var lookupDataService = require("../services/lookup-data");
exports.getAll = function (ctx, next) { return __awaiter(_this, void 0, void 0, function () {
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = ctx.state;
                return [4 /*yield*/, lookupService.getAll()];
            case 1:
                _a.data = _b.sent();
                return [4 /*yield*/, next()];
            case 2:
                _b.sent();
                return [2 /*return*/];
        }
    });
}); };
exports.saveLookup = function (ctx, next) { return __awaiter(_this, void 0, void 0, function () {
    var userId, payload, _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                userId = ctx.state.user.userId;
                payload = ctx.request.body;
                _a = ctx.state;
                return [4 /*yield*/, lookupService.saveLookup(userId, payload)];
            case 1:
                _a.data = _b.sent();
                return [4 /*yield*/, next()];
            case 2:
                _b.sent();
                return [2 /*return*/];
        }
    });
}); };
exports.deleteLookup = function (ctx, next) { return __awaiter(_this, void 0, void 0, function () {
    var id, _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                id = +ctx.params.id;
                _a = ctx.state;
                return [4 /*yield*/, lookupService.deleteLookup(id)];
            case 1:
                _a.data = _b.sent();
                return [4 /*yield*/, next()];
            case 2:
                _b.sent();
                return [2 /*return*/];
        }
    });
}); };
exports.findByLookupId = function (ctx, next) { return __awaiter(_this, void 0, void 0, function () {
    var lookupId, _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                lookupId = +ctx.params.lookupId;
                _a = ctx.state;
                return [4 /*yield*/, lookupDataService.findByLookupId(lookupId)];
            case 1:
                _a.data = _b.sent();
                return [4 /*yield*/, next()];
            case 2:
                _b.sent();
                return [2 /*return*/];
        }
    });
}); };
exports.findLookupDataById = function (ctx, next) { return __awaiter(_this, void 0, void 0, function () {
    var lookupDataId, _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                lookupDataId = +ctx.params.lookupDataId;
                _a = ctx.state;
                return [4 /*yield*/, lookupDataService.findLookupDataById(lookupDataId)];
            case 1:
                _a.data = _b.sent();
                return [4 /*yield*/, next()];
            case 2:
                _b.sent();
                return [2 /*return*/];
        }
    });
}); };
exports.saveLookupData = function (ctx, next) { return __awaiter(_this, void 0, void 0, function () {
    var userId, lookupId, payload, _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                userId = ctx.state.user.userId;
                lookupId = +ctx.params.lookupId;
                payload = ctx.request.body;
                _a = ctx.state;
                return [4 /*yield*/, lookupDataService.saveLookupData(userId, lookupId, payload)];
            case 1:
                _a.data = _b.sent();
                return [4 /*yield*/, next()];
            case 2:
                _b.sent();
                return [2 /*return*/];
        }
    });
}); };
exports.deleteLookupData = function (ctx, next) { return __awaiter(_this, void 0, void 0, function () {
    var lookupId, id, _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                lookupId = +ctx.params.lookupId;
                id = +ctx.params.id;
                _a = ctx.state;
                return [4 /*yield*/, lookupDataService.deleteLookupData(lookupId, id)];
            case 1:
                _a.data = _b.sent();
                return [4 /*yield*/, next()];
            case 2:
                _b.sent();
                return [2 /*return*/];
        }
    });
}); };