"use strict";
exports.__esModule = true;
var Router = require("koa-router");
var authentication_1 = require("../middleware/authentication");
var ctrl = require("../controller/list-of-value");
var router = new Router({
    prefix: "/api/list-of-value"
});
router.use(authentication_1["default"]);
router.get('/', ctrl.findByKeys);
exports["default"] = router.routes();
