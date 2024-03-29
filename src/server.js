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
exports.__esModule = true;
var Koa = require("koa");
var koaBody = require("koa-body");
var helmet = require("koa-helmet");
var mount = require("koa-mount");
var serve = require("koa-static");
var cors = require("koa2-cors");
var index_1 = require("./config/index");
var pagination_1 = require("./middleware/pagination");
var error_1 = require("./middleware/error");
var response_1 = require("./middleware/response");
var index_2 = require("./route/index");
var logger_1 = require("./utils/logger");
var whitelist = [
    'http://localhost:4200',
    'http://localhost:3000',
    'http://localhost',
    'http://localhost:8100',
    'http://54.146.103.85:3000',
    'http://54.146.103.85:3000/upload',
    'http://54.146.103.85:3000/api',
    'http://54.146.103.85',
    'https://workable.aetasaal.com'
];
function checkOriginAgainstWhitelist(ctx) {
    var requestOrigin = ctx.request.headers.origin || ctx.request.origin;
    if (!whitelist.includes(requestOrigin)) {
        return ctx["throw"](requestOrigin + " is not a valid origin");
    }
    return requestOrigin;
}
function startServer(log) {
    return __awaiter(this, void 0, void 0, function () {
        var app, uploads;
        return __generator(this, function (_a) {
            app = new Koa();
            app.use(logger_1.Logger.koa(log));
            // Register middlewares
            // Note: It is important to have response middleware first so that it can
            // catch errors and respond accordingly.
            app.use(helmet.noCache());
            app.use(cors({ origin: checkOriginAgainstWhitelist }));
            app.use(koaBody({ jsonLimit: '10mb', formLimit: '50mb', multipart: true, json: true }));
            app.use(pagination_1["default"]);
            uploads = new Koa();
            uploads.use(serve(__dirname + '/../upload/'));
            app.use(mount('/', uploads));
            app.use(error_1["default"]());
            // Registers routes
            app.use(index_2["default"]());
            app.use(response_1["default"]());
            return [2 /*return*/, new Promise(function (resolve, reject) {
                    var p = process.env.PORT || index_1["default"].server.port;
                    app.listen(p, function () {
                        log.info('server started on port %d with env=%s', p, index_1["default"].env);
                        resolve();
                    });
                    app.on('error', function (err) {
                        reject(err);
                    });
                })];
        });
    });
}
exports.startServer = startServer;
