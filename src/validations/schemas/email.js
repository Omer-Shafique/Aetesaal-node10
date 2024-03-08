"use strict";
exports.__esModule = true;
var Joi = require("joi");
exports.basicEmailConfiguration = {
    to: Joi.array()
        .items(Joi.string()
        .required()
        .email())
        .min(1)
        .required()
        .label('to'),
    from: Joi.string()
        .required()
        .label('from')
};
exports.sesEmailConfiguration = {
    subject: Joi.string()
        .required()
        .label('subject'),
    body: Joi.string()
        .required()
        .label('body')
};
exports.emailConfiguration = {
    subject: Joi.string()
        .required()
        .label('subject'),
    template: Joi.string()
        .required()
        .label('template'),
    dataMap: Joi.any()
};
