"use strict";
exports.__esModule = true;
var Router = require("koa-router");
var ctrl = require("../controller/user-location-trail");
var authentication_1 = require("../middleware/authentication");
var authorization_1 = require("../middleware/authorization");
var role_1 = require("../enum/role");
var router = new Router({
    prefix: "/api/user-location-trail"
});
router.use(authentication_1["default"]);
router.get('/', authorization_1["default"](false, [role_1.Role.SUPER_ADMIN]), ctrl.getAll);
router.post('/', ctrl.saveUserLocationTrail);
exports["default"] = router.routes();
