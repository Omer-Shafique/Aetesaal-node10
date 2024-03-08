"use strict";
exports.__esModule = true;
var Router = require("koa-router");
var ctrl = require("../controller/report");
var authentication_1 = require("../middleware/authentication");
var authorization_1 = require("../middleware/authorization");
var role_1 = require("../enum/role");
var router = new Router({
    prefix: "/api/report"
});
router.use(authentication_1["default"]);
router.use(authorization_1["default"](false, [role_1.Role.SUPER_ADMIN]));
router.get('/my-item', ctrl.getMyItemReport);
router.get('/workload/:userId', ctrl.getUserWorkloadReport);
router.get('/application/:applicationId/time', ctrl.getApplicationExecutionTimeReport);
router.get('/application/:applicationId/metrics', ctrl.getTotalExecutionsCountReport);
router.get('/application/:applicationId/metrics/graph', ctrl.getTotalExecutionsCountGraph);
router.get('/application/:applicationId/location', ctrl.getApplicationExecutionLocationReport);
exports["default"] = router.routes();
