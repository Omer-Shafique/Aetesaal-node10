"use strict";
exports.__esModule = true;
var compose = require("koa-compose");
var Router = require("koa-router");
var boom_1 = require("boom");
var ping_1 = require("./ping");
var auth_1 = require("./auth");
var file_1 = require("./file");
var list_of_value_1 = require("./list-of-value");
var user_1 = require("./user");
var department_1 = require("./department");
var office_location_1 = require("./office-location");
var group_1 = require("./group");
var role_1 = require("./role");
var dashboard_1 = require("./dashboard");
var application_1 = require("./application");
var application_execution_1 = require("./application-execution");
var lookup_1 = require("./lookup");
var report_1 = require("./report");
var user_location_trail_1 = require("./user-location-trail");
var config_1 = require("./config");
var router = new Router({
    prefix: '/api/v1'
});
var routes = router.routes();
var allowedMethods = router.allowedMethods({
    "throw": true,
    methodNotAllowed: function () { return boom_1.methodNotAllowed(); },
    notImplemented: function () { return boom_1.notImplemented(); }
});
var routesToExport = [
    routes,
    // allowedMethods,
    ping_1["default"],
    auth_1["default"],
    file_1["default"],
    list_of_value_1["default"],
    user_1["default"],
    department_1["default"],
    office_location_1["default"],
    group_1["default"],
    role_1["default"],
    dashboard_1["default"],
    application_1["default"],
    application_execution_1["default"],
    lookup_1["default"],
    report_1["default"],
    user_location_trail_1["default"],
    config_1["default"]
];
exports["default"] = (function () { return compose(routesToExport); });
