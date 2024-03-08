"use strict";
exports.__esModule = true;
var Joi = require("joi");
exports.saveLookup = {
    name: Joi.string().required()
};
exports.saveLookupData = {
    lookupId: Joi.number().required(),
    display: Joi.string().required(),
    value: Joi.string().required()
};
exports.deleteLookup = {
    id: Joi.number().required()
};
