"use strict";
exports.__esModule = true;
var Router = require("koa-router");
var ctrl = require("../controller/role");
var authentication_1 = require("../middleware/authentication");
var authorization_1 = require("../middleware/authorization");
var role_1 = require("../enum/role");
var router = new Router({
    prefix: "/api/role"
});
router.use(authentication_1["default"]);
router.get('/', ctrl.getAll);
router.post('/', authorization_1["default"](false, [role_1.Role.SUPER_ADMIN]), ctrl.saveRole);
router["delete"]('/:id', authorization_1["default"](false, [role_1.Role.SUPER_ADMIN]), ctrl.deleteRole);
exports["default"] = router.routes();
