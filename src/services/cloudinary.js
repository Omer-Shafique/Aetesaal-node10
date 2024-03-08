"use strict";
exports.__esModule = true;
var config_1 = require("../config");
var cloudinary = require('cloudinary');
cloudinary.config({
    cloud_name: config_1["default"].cloudinary.name,
    api_key: config_1["default"].cloudinary.apiKey,
    api_secret: config_1["default"].cloudinary.apiSecret
});
exports.uploadProfileImage = function (name, file) {
    return new Promise(function (resolve, reject) {
        cloudinary.v2.uploader.upload(file.path, {
            public_id: name
        }, function (error, result) {
            if (error) {
                reject(error);
            }
            resolve(result);
        });
    });
};
