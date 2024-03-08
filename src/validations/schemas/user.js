"use strict";
exports.__esModule = true;
var Joi = require("joi");
exports.getUserById = {
    userId: Joi.string().uuid().required()
};
exports.getUserByDepartmentId = {
    departmentId: Joi.number().required()
};
exports.userRequest = {
    id: Joi.string().uuid(),
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    contactNo: Joi.string().required(),
    email: Joi.string().required(),
    password: Joi.string().allow(['', null]),
    pictureUrl: Joi.string().allow(['', null]),
    gender: Joi.string(),
    country: Joi.string(),
    city: Joi.string(),
    timezone: Joi.string(),
    roleIds: Joi.array().items(Joi.number().required()).required().min(1),
    managerId: Joi.string().uuid().allow([null, '']),
    departmentId: Joi.number().allow([null, '']),
    officeLocationId: Joi.number().allow([null, ''])
};
