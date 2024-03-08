"use strict";
exports.__esModule = true;
var Router = require("koa-router");
var ctrl = require("../controller/auth");
var userCtrl = require("../controller/user");
var authentication_1 = require("../middleware/authentication");
var authorization_1 = require("../middleware/authorization");
var role_1 = require("../enum/role");
var router = new Router({
    prefix: "/api/user"
});
router.use(authentication_1["default"]);
router.get('/', authorization_1["default"](false, [role_1.Role.SUPER_ADMIN, role_1.Role.USER]), userCtrl.getAll);
router.get('/me', userCtrl.getUser);
router.get('/:userId', authorization_1["default"](false, [role_1.Role.SUPER_ADMIN, role_1.Role.USER]), userCtrl.getUserById);
router.get('/department/:departmentId', authorization_1["default"](false, [role_1.Role.SUPER_ADMIN, role_1.Role.USER]), userCtrl.getUserByDepartmentId);
router.post('/', authorization_1["default"](false, [role_1.Role.SUPER_ADMIN]), userCtrl.saveUser);
router.put('/change-password', ctrl.changePassword);
router["delete"]('/:userId/delete', authorization_1["default"](false, [role_1.Role.SUPER_ADMIN]), userCtrl.deleteUser);
exports["default"] = router.routes();
