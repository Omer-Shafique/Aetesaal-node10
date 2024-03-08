"use strict";
exports.__esModule = true;
var Joi = require("joi");
var role_1 = require("../../enum/role");
exports.loginSchema = {
    email: Joi.string().email().required(),
    password: Joi.string().required()
};
exports.signUpSchema = {
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    role: Joi.string().required().valid([role_1.Role.SUPER_ADMIN, role_1.Role.USER, role_1.Role.BILLING, role_1.Role.APP_CREATOR]),
    timezone: Joi.string().required()
};
exports.socialLoginSchema = {
    email: Joi.string().email().required(),
    accessToken: Joi.string().required(),
    phoneNo: Joi.string(),
    socialProvider: Joi.string(),
    pictureUrl: Joi.string(),
    timezone: Joi.string(),
    role: Joi.when('isSignUp', {
        is: true,
        then: Joi.string().required().valid([role_1.Role.SUPER_ADMIN, role_1.Role.USER, role_1.Role.BILLING, role_1.Role.APP_CREATOR])
    })
};
exports.forgotSchema = {
    email: Joi.string().email().required()
};
exports.verifyEmailSchema = {
    email: Joi.string().email().required(),
    hash: Joi.string().required()
};
exports.resetPassword = {
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    hash: Joi.string().required()
};
exports.changePassword = {
    oldPassword: Joi.string().required(),
    newPassword: Joi.string().required()
};
