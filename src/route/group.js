"use strict";
exports.__esModule = true;
var Router = require("koa-router");
var ctrl = require("../controller/group");
var authentication_1 = require("../middleware/authentication");
var authorization_1 = require("../middleware/authorization");
var role_1 = require("../enum/role");
var router = new Router({
    prefix: "/api/group"
});
router.use(authentication_1["default"]);
router.get('/', authorization_1["default"](false, [role_1.Role.SUPER_ADMIN, role_1.Role.USER, role_1.Role.APP_CREATOR]), ctrl.getAll);
router.post('/', authorization_1["default"](false, [role_1.Role.SUPER_ADMIN]), ctrl.saveGroup);
router["delete"]('/:id', authorization_1["default"](false, [role_1.Role.SUPER_ADMIN]), ctrl.deleteGroup);
exports["default"] = router.routes();
