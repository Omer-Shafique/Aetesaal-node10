"use strict";
exports.__esModule = true;
var Router = require("koa-router");
var ctrl = require("../controller/ping");
var router = new Router({
    prefix: "/api"
});
router.get('/ping', ctrl.ping);
router.get('/generate-password', ctrl.generatePassword);
exports["default"] = router.routes();
