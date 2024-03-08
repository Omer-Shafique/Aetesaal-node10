"use strict";
exports.__esModule = true;
var fcmUtils = require("../utils/fcm");
var logger = require("../utils/logger");
var fcm = fcmUtils.getFCM();
var log = logger.getLoggerInstance();
/**
 * Send push notification to the user
 *
 * @param {string} token Registered token of user's device
 * @param {Object} _data An data you want to send with the notification
 * @param {string} _title Title of notification
 * @param {string} _body Description/body of notification
 *
 * @return none
 */
exports.sendPushNotification = function (token, data, title, body) {
    data.title = title;
    data.body = body;
    data.id = data._id;
    var message = {
        to: token,
        data: data,
        content_available: true,
        notification: {
            title: title,
            body: body,
            sound: 'default',
            click_action: 'FCM_PLUGIN_ACTIVITY',
            icon: 'fcm_push_icon'
        }
    };
    fcm.send(message)
        .then(function (response) {
        log.info('Successfully sent with response: ', response);
    })["catch"](function (err) {
        log.info('Something has gone wrong!', err);
    });
};
