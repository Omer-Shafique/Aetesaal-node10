"use strict";
exports.__esModule = true;
var Router = require("koa-router");
var ctrl = require("../controller/config");
var router = new Router({
    prefix: "/api/config"
});
router.get('/', ctrl.getConfig);
exports["default"] = router.routes();
