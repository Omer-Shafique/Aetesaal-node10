"use strict";
exports.__esModule = true;
var ApplicationExecutionStatus;
(function (ApplicationExecutionStatus) {
    ApplicationExecutionStatus["DRAFT"] = "draft";
    ApplicationExecutionStatus["CLARITY"] = "clarity";
    ApplicationExecutionStatus["REJECT"] = "reject";
    ApplicationExecutionStatus["APPROVED"] = "approved";
    ApplicationExecutionStatus["IN_PROGRESS"] = "inProgress";
    ApplicationExecutionStatus["WITHDRAW"] = "withdraw";
})(ApplicationExecutionStatus = exports.ApplicationExecutionStatus || (exports.ApplicationExecutionStatus = {}));
var ApplicationWorkflowType;
(function (ApplicationWorkflowType) {
    ApplicationWorkflowType["APPROVAL"] = "approval";
    ApplicationWorkflowType["INPUT"] = "input";
})(ApplicationWorkflowType = exports.ApplicationWorkflowType || (exports.ApplicationWorkflowType = {}));
var ApplicationWorkflowFieldPermission;
(function (ApplicationWorkflowFieldPermission) {
    ApplicationWorkflowFieldPermission["VISIBLE"] = "visible";
    ApplicationWorkflowFieldPermission["EDITABLE"] = "editable";
    ApplicationWorkflowFieldPermission["READONLY"] = "readonly";
    ApplicationWorkflowFieldPermission["HIDDEN"] = "hidden";
    ApplicationWorkflowFieldPermission["CONDITIONAL"] = "conditional";
})(ApplicationWorkflowFieldPermission = exports.ApplicationWorkflowFieldPermission || (exports.ApplicationWorkflowFieldPermission = {}));
var ApplicationWorkflowPermissionType;
(function (ApplicationWorkflowPermissionType) {
    ApplicationWorkflowPermissionType["NEW"] = "new";
    ApplicationWorkflowPermissionType["INITIATOR_SUMMARY"] = "initiator_summary";
    ApplicationWorkflowPermissionType["ALL_TASK"] = "all_task";
    ApplicationWorkflowPermissionType["WORKFLOW"] = "workflow";
})(ApplicationWorkflowPermissionType = exports.ApplicationWorkflowPermissionType || (exports.ApplicationWorkflowPermissionType = {}));
var ApplicationWorkflowAssignTo;
(function (ApplicationWorkflowAssignTo) {
    ApplicationWorkflowAssignTo["INITIATOR"] = "initiator";
    ApplicationWorkflowAssignTo["MANAGER"] = "manager";
    ApplicationWorkflowAssignTo["DEPARTMENT_HEAD"] = "department_head";
    ApplicationWorkflowAssignTo["LOCATION_HEAD"] = "location_head";
    ApplicationWorkflowAssignTo["FIELD"] = "field";
    ApplicationWorkflowAssignTo["GROUP"] = "group";
})(ApplicationWorkflowAssignTo = exports.ApplicationWorkflowAssignTo || (exports.ApplicationWorkflowAssignTo = {}));
