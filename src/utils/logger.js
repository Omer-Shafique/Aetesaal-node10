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
exports.__esModule = true;
var compose = require("koa-compose");
var Bunyan = require("bunyan");
var KoaBunyan = require("koa-bunyan-logger");
var fs_1 = require("fs");
var path_1 = require("path");
var util = require("util");
var globalLogger;
var Logger = /** @class */ (function () {
    function Logger(name, dir) {
        this.name = name || 'App';
        this.logDir = path_1.join(dir || __dirname + '/../../logs');
        this.serializers = Bunyan.stdSerializers;
        this.streams = [{
                level: 'debug',
                stream: process.stdout
            }, {
                level: 'debug',
                type: 'rotating-file',
                period: '1d',
                path: path_1.join(this.logDir, 'debug.json')
            }, {
                level: 'error',
                type: 'rotating-file',
                period: '1d',
                path: path_1.join(this.logDir, 'error.json')
            }];
    }
    Logger.koa = function (logger) {
        return compose([
            // Attach logger to ctx
            KoaBunyan(logger),
            // Use child logger for request ctx
            KoaBunyan.requestIdContext(),
            // Log requests and responses (with custom messages)
            KoaBunyan.requestLogger({
                // Request GET /apidoc
                formatRequestMessage: function () {
                    return util.format('Request %s %s', this.request.method, this.request.originalUrl);
                },
                // Response (200) GET /apidoc in 30ms
                formatResponseMessage: function (data) {
                    return util.format('Response (%d) %s %s in %sms', this.status, this.request.method, this.request.originalUrl, data.duration);
                }
            }),
        ]);
    };
    Logger.prototype.createLogger = function (fields) {
        if (globalLogger) {
            return globalLogger;
        }
        this.ensureDirectory();
        globalLogger = new Bunyan(__assign({ name: this.name, serializers: this.serializers, streams: this.streams }, fields));
        globalLogger.addSerializers({
            // Add boom status code to the existing stdSerializer
            err: function (err) {
                var data = Bunyan.stdSerializers.err(err);
                if (err.isBoom) {
                    data.status = err.output.statusCode;
                }
                return data;
            }
        });
        return globalLogger;
    };
    Logger.prototype.ensureDirectory = function () {
        if (!fs_1.existsSync(this.logDir)) {
            fs_1.mkdirSync(this.logDir);
        }
    };
    return Logger;
}());
exports.Logger = Logger;
exports.getLoggerInstance = function () { return new Logger('betts-connect-api').createLogger(); };
