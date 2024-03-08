"use strict";
exports.__esModule = true;
var Router = require("koa-router");
var ctrl = require("../controller/application");
var authentication_1 = require("../middleware/authentication");
var authorization_1 = require("../middleware/authorization");
var role_1 = require("../enum/role");
var router = new Router({
    prefix: "/api/application-execution"
});
router.use(authentication_1["default"]);
router.get('/all', authorization_1["default"](false, [role_1.Role.SUPER_ADMIN]), ctrl.getAllExecution);
router.get('/:applicationId/execution', ctrl.getApplicationExecution);
// for approvals, input request
router.get('/workflow', ctrl.getExecutionByLoggedInUserId);
// for draft, reject, clarity
router.get('/workflow/action', ctrl.getExecutionInProcessLoggedInUserId);
router.get('/workflow/action/query', ctrl.getExecutionInProcessLoggedInUserIdByQuery);
router.get('/workflow/action/count', ctrl.getExecutionWorkflowsCount);
router.get('/:executionId/detail', ctrl.getExecutionById);
router.get('/:executionId/transformed', ctrl.getDetailExecutionById);
router.get('/participated', ctrl.getExecutionParticipatedLoggedInUserId);
router.get('/participated/query', ctrl.getExecutionParticipatedQuery);
router.get('/:applicationId/in-progress', ctrl.getInProgressExecutions);
router.get('/withdraw', ctrl.getWithdrawExecutions);
router.get('/:executionId/users', ctrl.getExecutionParticipatedUsers);
router.post('/:applicationId/execution', ctrl.saveApplicationExecution);
router.put('/:applicationId/execution/form', ctrl.saveApplicationExecutionForm);
router.put('/:applicationId/execution/:applicationExecutionId/publish', ctrl.publishApplicationExecution);
// tslint:disable-next-line:max-line-length
router.put('/:applicationId/execution/:applicationExecutionId/workflow/:applicationExecutionWorkflowId', ctrl.saveApplicationExecutionWorkflow);
router.put('/:executionId/reassign', ctrl.reassignWorkflow);
router.put('/:executionId/withdraw/:executionWorkflowId', ctrl.withdraw);
router["delete"]('/execution/:executionId', ctrl.deleteApplicationExecution);
router.post('/:applicationId', authorization_1["default"](false, [role_1.Role.SUPER_ADMIN]), ctrl.deleteApplicationExecutionByApplication);
exports["default"] = router.routes();
