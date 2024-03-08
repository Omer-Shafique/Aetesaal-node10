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
var Boom = require("boom");
var joiSchema = require("../validations/schemas/email");
var mustache = require("mustache");
var nodemailer = require("nodemailer");
var index_1 = require("../validations/index");
var config = require("../config");
var constants = require("../constants/email");
var transporter = nodemailer.createTransport({
    host: config["default"].email.host,
    port: config["default"].email.port,
    secure: config["default"].email.secure,
    auth: {
        user: config["default"].email.user,
        pass: config["default"].email.password
    }
});
var sendEmail = function (emailConfiguration) { return __awaiter(_this, void 0, void 0, function () {
    var emailBody;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, index_1.validate(emailConfiguration, __assign({}, joiSchema.basicEmailConfiguration, joiSchema.emailConfiguration))];
            case 1:
                _a.sent();
                if (!constants.TEMPLATE_FILE[emailConfiguration.template]) {
                    throw Boom.notFound('error.email.not_found');
                }
                emailBody = mustache.render(constants.TEMPLATE_FILE[emailConfiguration.template], emailConfiguration.dataMap, {
                    footer: constants.TEMPLATE_FILE['footer']
                });
                emailConfiguration.subject = mustache.render(emailConfiguration.subject, emailConfiguration.dataMap);
                return [4 /*yield*/, transporter.sendMail({
                        to: emailConfiguration.to,
                        bcc: emailConfiguration.bcc,
                        from: emailConfiguration.from,
                        html: emailBody,
                        subject: emailConfiguration.subject
                    })];
            case 2:
                _a.sent();
                return [2 /*return*/, { success: true }];
        }
    });
}); };
exports.sendWelcomeEmail = function (payload) { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        // const hash = await generateAndCacheUnsubscribeHash(payload.email);
        return [2 /*return*/, sendEmail({
                dataMap: {
                    firstName: payload.firstName,
                    lastName: payload.lastName,
                    link: config["default"].server.frontendURL + "/verify-email?email=" + payload.email + "&hash=" + payload.hash
                },
                from: "\"TutorsWebHub\" <" + config["default"].email.user + ">",
                to: [payload.email],
                subject: constants.EMAIL_TEMPLATES.welcome.subject,
                template: constants.EMAIL_TEMPLATES.welcome.template
            })];
    });
}); };
exports.sendAccountActivationEmail = function (payload) { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        // const hash = await generateAndCacheUnsubscribeHash(payload.email);
        return [2 /*return*/, sendEmail({
                dataMap: {
                    firstName: payload.firstName,
                    lastName: payload.lastName,
                    link: payload.link
                },
                from: "\"TutorsWebHub\" <" + config["default"].email.user + ">",
                to: [payload.email],
                subject: constants.EMAIL_TEMPLATES.accountActivation.subject,
                template: constants.EMAIL_TEMPLATES.accountActivation.template
            })];
    });
}); };
exports.sendForgotPasswordEmail = function (payload) { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, sendEmail({
                dataMap: {
                    action: config["default"].server.frontendURL + "/reset-password?email=" + payload.email + "&hash=" + payload.hash
                },
                from: "\"TutorsWebHub\" <" + config["default"].email.user + ">",
                to: [payload.email],
                subject: constants.EMAIL_TEMPLATES.forgotPassword.subject,
                template: constants.EMAIL_TEMPLATES.forgotPassword.template
            })];
    });
}); };
exports.sendNewPasswordCreationEmail = function (payload) { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        // const hash = await generateAndCacheUnsubscribeHash(payload.email);
        return [2 /*return*/, sendEmail({
                dataMap: {
                    firstName: payload.firstName,
                    lastName: payload.lastName,
                    link: payload.link
                },
                from: config["default"].email.user,
                to: [payload.email],
                subject: constants.EMAIL_TEMPLATES.newPasswordCreation.subject,
                template: constants.EMAIL_TEMPLATES.newPasswordCreation.template
            })];
    });
}); };
exports.sendTeacherScheduleEmail = function (payload) { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, sendEmail({
                dataMap: {
                    student: payload.student,
                    time: payload.time
                },
                from: "\"TutorsWebHub\" <" + config["default"].email.user + ">",
                to: [payload.email],
                subject: constants.EMAIL_TEMPLATES.teacherSchedule.subject,
                template: constants.EMAIL_TEMPLATES.teacherSchedule.template
            })];
    });
}); };
exports.sendScheduleConfirmationEmail = function (payload) { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, sendEmail({
                dataMap: {
                    tutor: payload.tutor,
                    time: payload.time
                },
                from: "\"TutorsWebHub\" <" + config["default"].email.user + ">",
                to: [payload.email],
                bcc: ['mok.developer@gmail.com'],
                subject: constants.EMAIL_TEMPLATES.studentScheduleConfirmation.subject,
                template: constants.EMAIL_TEMPLATES.studentScheduleConfirmation.template
            })];
    });
}); };
exports.sendScheduleCancellationEmail = function (payload) { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, sendEmail({
                dataMap: {
                    student: payload.student,
                    time: payload.time
                },
                from: "\"TutorsWebHub\" <" + config["default"].email.user + ">",
                to: [payload.email],
                bcc: ['mok.developer@gmail.com'],
                subject: constants.EMAIL_TEMPLATES.studentScheduleCancellation.subject,
                template: constants.EMAIL_TEMPLATES.studentScheduleConfirmation.template
            })];
    });
}); };
