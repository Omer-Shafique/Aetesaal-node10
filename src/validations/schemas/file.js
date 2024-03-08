"use strict";
exports.__esModule = true;
var _a;
var Joi = require("joi");
var file_1 = require("../../constants/file");
exports.uploadUserProfileImage = {
    file: Joi.object()
        .keys({
        size: Joi.number()
            .required()
            .less(file_1.FILE_MAX_SIZE)
            .greater(file_1.FILE_MIN_SIZE)
            .error(new Error('File Size must be less than 5mb')),
        path: Joi.string().required(),
        name: Joi.string().required(),
        type: (_a = Joi.string()
            .required()).valid.apply(_a, file_1.SUPPORTED_PICTURE_TYPES)
    })
        .required()
};
exports.uploadExecutionFile = {
    file: Joi.object()
        .keys({
        size: Joi.number()
            .required()
            .less(file_1.FILE_MAX_SIZE)
            .greater(file_1.FILE_MIN_SIZE)
            .error(new Error('File Size must be less than 5mb')),
        path: Joi.string().required(),
        name: Joi.string().required(),
        type: Joi.string()
    })
        .required()
};
