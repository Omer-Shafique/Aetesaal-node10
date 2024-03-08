"use strict";
exports.__esModule = true;
var Joi = require("joi");
exports.saveOfficeLocation = {
    name: Joi.string().required(),
    userId: Joi.string().uuid().allow([null, ''])
};
exports.deleteOfficeLocation = {
    id: Joi.number().required()
};
