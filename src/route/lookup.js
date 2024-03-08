"use strict";
exports.__esModule = true;
var Router = require("koa-router");
var ctrl = require("../controller/lookup");
var authentication_1 = require("../middleware/authentication");
var authorization_1 = require("../middleware/authorization");
var role_1 = require("../enum/role");
var router = new Router({
    prefix: "/api/lookup"
});
router.use(authentication_1["default"]);
router.get('/', ctrl.getAll);
router.get('/:lookupId/data', ctrl.findByLookupId);
router.get('/lookup-data/:lookupDataId', ctrl.findLookupDataById);
router.post('/', authorization_1["default"](false, [role_1.Role.SUPER_ADMIN]), ctrl.saveLookup);
router.post('/:lookupId/data', authorization_1["default"](false, [role_1.Role.SUPER_ADMIN]), ctrl.saveLookupData);
router["delete"]('/:id', authorization_1["default"](false, [role_1.Role.SUPER_ADMIN]), ctrl.deleteLookup);
router["delete"]('/:lookupId/data/:id', authorization_1["default"](false, [role_1.Role.SUPER_ADMIN]), ctrl.deleteLookupData);
exports["default"] = router.routes();
