"use strict";
exports.__esModule = true;
var Joi = require("joi");
exports.saveDepartment = {
    name: Joi.string().required(),
    userId: Joi.string().uuid().allow([null, ''])
};
exports.deleteDepartment = {
    id: Joi.number().required()
};
