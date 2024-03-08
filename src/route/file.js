"use strict";
exports.__esModule = true;
var Router = require("koa-router");
var authentication_1 = require("../middleware/authentication");
var ctrl = require("../controller/file");
var router = new Router({
    prefix: "/api/file"
});
router.use(authentication_1["default"]);
router.post('/picture', ctrl.saveProfilePicture);
router.post('/execution', ctrl.saveExecutionFile);
exports["default"] = router.routes();
