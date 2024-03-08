"use strict";
exports.__esModule = true;
// tslint:disable:max-classes-per-file
var index_1 = require("../config/index");
/**
 * BulkOpsResponse is used when a bulk operation is performed and total number
 * of successful and failed operation count has to be returned only
 */
var BulkOpsResponse = /** @class */ (function () {
    function BulkOpsResponse(success, failure) {
        this.success = success;
        this.failure = failure;
    }
    BulkOpsResponse.prototype.body = function (status) {
        return {
            meta: {
                status: status,
                success: this.success,
                faulure: this.failure
            },
            data: {}
        };
    };
    return BulkOpsResponse;
}());
exports.BulkOpsResponse = BulkOpsResponse;
/**
 * ErrorResponse is used for responding requests with errors
 * This class is mainly used in response middleware
 */
var ErrorResponse = /** @class */ (function () {
    function ErrorResponse(error) {
        this.error = error;
    }
    ErrorResponse.prototype.body = function (status) {
        var message = this.error.message;
        // Hide the message in case of 500
        if (status === 500) {
            message = 'An internal server error occurred.';
        }
        var stack;
        if (index_1["default"].env !== 'production') {
            stack = this.error.stack;
        }
        return {
            meta: {
                status: status,
                error: this.error.name,
                message: message,
                stack: stack
            },
            data: {}
        };
    };
    return ErrorResponse;
}());
exports.ErrorResponse = ErrorResponse;
/**
 * ObjectResponse is used when a single entity is requested
 */
var ObjectResponse = /** @class */ (function () {
    function ObjectResponse(data) {
        this.data = data;
    }
    ObjectResponse.prototype.body = function (status) {
        return {
            meta: {
                status: status
            },
            data: this.data
        };
    };
    return ObjectResponse;
}());
exports.ObjectResponse = ObjectResponse;
/**
 * PaginatedResponse is used along with IPaginatedRequest
 * This specifically renders the rows inside data as a key, this is to
 * support mobile/web clients to easily write parsers based on key name.
 */
var PaginatedResponse = /** @class */ (function () {
    function PaginatedResponse(key, rows, total, pageSize, offset) {
        this.key = key;
        this.rows = rows;
        this.total = total;
        this.pageSize = pageSize;
        this.offset = offset;
    }
    PaginatedResponse.prototype.body = function (status) {
        var _a;
        return {
            meta: {
                status: status,
                total: this.total,
                pageSize: this.pageSize,
                offset: this.offset
            },
            data: (_a = {},
                _a[this.key] = this.rows,
                _a)
        };
    };
    return PaginatedResponse;
}());
exports.PaginatedResponse = PaginatedResponse;
