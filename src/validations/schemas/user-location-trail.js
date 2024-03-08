"use strict";
exports.__esModule = true;
var Joi = require("joi");
exports.getAll = {
    userId: Joi.string().uuid().required(),
    startDate: Joi.date(),
    endDate: Joi.date()
};
exports.saveUserLocationTrail = {
    userId: Joi.string().uuid().required(),
    latitude: Joi.number().required(),
    longitude: Joi.number().required()
};
