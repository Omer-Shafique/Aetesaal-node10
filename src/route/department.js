"use strict";
exports.__esModule = true;
var Router = require("koa-router");
var ctrl = require("../controller/department");
var authentication_1 = require("../middleware/authentication");
var router = new Router({
    prefix: "/api/department"
});
router.use(authentication_1["default"]);
router.get('/', ctrl.getAll);
router.post('/', ctrl.saveDepartment);
router["delete"]('/:id', ctrl.deleteDepartment);
exports["default"] = router.routes();
