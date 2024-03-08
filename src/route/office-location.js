"use strict";
exports.__esModule = true;
var Router = require("koa-router");
var ctrl = require("../controller/office-location");
var authentication_1 = require("../middleware/authentication");
var authorization_1 = require("../middleware/authorization");
var role_1 = require("../enum/role");
var router = new Router({
    prefix: "/api/office-location"
});
router.use(authentication_1["default"]);
router.use(authorization_1["default"](false, [role_1.Role.SUPER_ADMIN]));
router.get('/', ctrl.getAll);
router.post('/', ctrl.saveOfficeLocation);
router["delete"]('/:id', ctrl.deleteOfficeLocation);
exports["default"] = router.routes();
