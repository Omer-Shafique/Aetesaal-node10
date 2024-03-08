"use strict";
exports.__esModule = true;
var Joi = require("joi");
exports.saveGroup = {
    id: Joi.number(),
    name: Joi.string().required(),
    userIds: Joi.array().items(Joi.string().uuid())
};
exports.deleteGroup = {
    id: Joi.number().required()
};
