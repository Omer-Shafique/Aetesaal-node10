"use strict";
exports.__esModule = true;
var Router = require("koa-router");
var ctrl = require("../controller/application");
var authentication_1 = require("../middleware/authentication");
var authorization_1 = require("../middleware/authorization");
var role_1 = require("../enum/role");
var router = new Router({
    prefix: "/api/application"
});
router.use(authentication_1["default"]);
router.get('/', ctrl.getCurrentLoggedInUserApplications);
router.get('/:applicationId', ctrl.getApplicationById);
router.put('/:applicationId/publish', authorization_1["default"](false, [role_1.Role.SUPER_ADMIN, role_1.Role.APP_CREATOR]), ctrl.publishApplication);
router.get('/:applicationId/section/:sectionId', authorization_1["default"](false, [role_1.Role.SUPER_ADMIN, role_1.Role.APP_CREATOR]), ctrl.getApplicationFormSectionById);
router.get('/:applicationId/field/:fieldId', authorization_1["default"](false, [role_1.Role.SUPER_ADMIN, role_1.Role.APP_CREATOR]), ctrl.getApplicationFormFieldById);
router.get('/:applicationId/form', ctrl.getApplicationForm);
router.get('/:applicationId/workflow', authorization_1["default"](false, [role_1.Role.SUPER_ADMIN, role_1.Role.APP_CREATOR]), ctrl.getApplicationWorkflow);
router.get('/:applicationId/field-permission', authorization_1["default"](false, [role_1.Role.SUPER_ADMIN, role_1.Role.APP_CREATOR]), ctrl.getApplicationWorkflowFieldPermission);
router.get('/:applicationId/form-field-titles', ctrl.getApplicationFieldTitles);
router.post('/', authorization_1["default"](false, [role_1.Role.SUPER_ADMIN, role_1.Role.APP_CREATOR]), ctrl.saveApplication);
router.post('/:applicationId/form', authorization_1["default"](false, [role_1.Role.SUPER_ADMIN, role_1.Role.APP_CREATOR]), ctrl.saveApplicationForm);
router.post('/:applicationId/workflow', authorization_1["default"](false, [role_1.Role.SUPER_ADMIN, role_1.Role.APP_CREATOR]), ctrl.saveApplicationWorkflow);
router.post('/:applicationId/field-permission', authorization_1["default"](false, [role_1.Role.SUPER_ADMIN, role_1.Role.APP_CREATOR]), ctrl.saveApplicationWorkflowFieldPermission);
router["delete"]('/:id', ctrl.deleteApplication);
exports["default"] = router.routes();
