"use strict";
exports.__esModule = true;
var FCM = require("fcm-push");
var config_1 = require("../config");
var globalFcm;
var getFCMInstance = function () {
    if (globalFcm) {
        return globalFcm;
    }
    globalFcm = new FCM(config_1["default"].fcm.serverKey);
    return globalFcm;
};
exports.getFCM = function () { return getFCMInstance(); };
