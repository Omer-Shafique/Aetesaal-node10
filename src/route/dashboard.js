"use strict";
exports.__esModule = true;
var Router = require("koa-router");
var ctrl = require("../controller/dashboard");
var authentication_1 = require("../middleware/authentication");
var authorization_1 = require("../middleware/authorization");
var role_1 = require("../enum/role");
var router = new Router({
    prefix: "/api/dashboard"
});
router.use(authentication_1["default"]);
router.use(authorization_1["default"](false, [role_1.Role.SUPER_ADMIN]));
router.get('/admin/statistics', ctrl.getAdminDashboardStatistics);
exports["default"] = router.routes();
