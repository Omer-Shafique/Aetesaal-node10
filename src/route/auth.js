"use strict";
exports.__esModule = true;
var Router = require("koa-router");
var ctrl = require("../controller/auth");
var router = new Router({
    prefix: "/api/auth"
});
router.post('/login', ctrl.login);
router.post('/sign-up', ctrl.signUp);
// router.post('/social-login', ctrl.socialLoginOrSignUp);
router.post('/forgot-password', ctrl.forgotPassword);
router.post('/verify-hash', ctrl.verifyHash);
router.post('/reset-password', ctrl.resetPassword);
exports["default"] = router.routes();
