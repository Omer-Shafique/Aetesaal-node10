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
var Joi = require("joi");
var index_1 = require("../validations/index");
var pagination_1 = require("../constants/pagination");
exports["default"] = (function (ctx, next) { return __awaiter(_this, void 0, void 0, function () {
    var pagination, schema, _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                pagination = {
                    limit: ctx.query.limit,
                    offset: ctx.query.offset,
                    sortBy: ctx.query.sortBy,
                    sortOrder: ctx.query.sortOrder
                };
                schema = {
                    // Notes for pageSize and offset:
                    // Check for number, if it isn't, mark the rest as empty (Try).
                    // Then if in any case the value is not set, set it to default (Default).
                    limit: Joi.alternatives()["try"]([Joi.number().integer(), Joi.empty(Joi.any())])["default"](pagination_1["default"].limit),
                    offset: Joi.alternatives()["try"]([Joi.number().integer(), Joi.empty(Joi.any())])["default"](pagination_1["default"].offset),
                    sortBy: Joi.string()
                        .trim()
                        .empty('')["default"](pagination_1["default"].sortBy),
                    sortOrder: Joi.string()
                        .trim()
                        .empty('')["default"](pagination_1["default"].sortOrder)
                };
                _a = ctx;
                return [4 /*yield*/, index_1.validate(pagination, schema)];
            case 1:
                _a.pagination = _b.sent();
                // On some APIs, we allow pageSize to be ignored. It can be done by setting
                // pageSize to a negative value.
                ctx.pagination.all = ctx.pagination.limit < 0;
                // If sort order from payload has value other than [asc, desc]
                // Replace it with asc
                if (ctx.pagination.sortOrder &&
                    ctx.pagination.sortOrder !== 'asc' &&
                    ctx.pagination.sortOrder !== 'desc') {
                    ctx.pagination.sortOrder = 'asc';
                }
                // If pageSize is to be ignored, always set pageSize to -1 for consistency.
                if (ctx.pagination.all) {
                    ctx.pagination.limit = -1;
                    ctx.pagination.offset = 0;
                }
                // We haven't added .positive() validation because we don't want it to cause
                // any error
                if (ctx.pagination.offset < 0) {
                    ctx.pagination.offset = 0;
                }
                return [4 /*yield*/, next()];
            case 2:
                _b.sent();
                return [2 /*return*/];
        }
    });
}); });
