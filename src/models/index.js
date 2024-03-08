"use strict";
exports.__esModule = true;
var database_1 = require("./../bootstrap/database");
// Import model specification from its own definition file.
var Role = require("./role");
var User = require("./user");
var Department = require("./department");
var OfficeLocation = require("./office-location");
var Group = require("./group");
var UserGroup = require("./user-group");
var ListOfValue = require("./list-of-value");
var UserRole = require("./user-role");
var Application = require("./application");
var ApplicationWorkflow = require("./application-workflow");
var ApplicationFormSection = require("./application-form-section");
var ApplicationFormField = require("./application-form-field");
var ApplicationWorkflowPermission = require("./application-workflow-permission");
var ApplicationWorkflowFieldPermission = require("./application-workflow-field-permission");
var ApplicationExecution = require("./application-execution");
var ApplicationExecutionForm = require("./application-execution-form");
var ApplicationExecutionWorkflow = require("./application-execution-workflow");
var Lookup = require("./lookup");
var LookupData = require("./lookup-data");
var Notification = require("./notification");
var UserLocationTrail = require("./user-location-trail");
var models = {
    Role: Role.define(database_1.Database),
    User: User.define(database_1.Database),
    Department: Department.define(database_1.Database),
    OfficeLocation: OfficeLocation.define(database_1.Database),
    Group: Group.define(database_1.Database),
    UserGroup: UserGroup.define(database_1.Database),
    ListOfValue: ListOfValue.define(database_1.Database),
    UserRole: UserRole.define(database_1.Database),
    Application: Application.define(database_1.Database),
    ApplicationWorkflow: ApplicationWorkflow.define(database_1.Database),
    ApplicationFormSection: ApplicationFormSection.define(database_1.Database),
    ApplicationFormField: ApplicationFormField.define(database_1.Database),
    ApplicationWorkflowPermission: ApplicationWorkflowPermission.define(database_1.Database),
    ApplicationWorkflowFieldPermission: ApplicationWorkflowFieldPermission.define(database_1.Database),
    ApplicationExecution: ApplicationExecution.define(database_1.Database),
    ApplicationExecutionForm: ApplicationExecutionForm.define(database_1.Database),
    ApplicationExecutionWorkflow: ApplicationExecutionWorkflow.define(database_1.Database),
    Lookup: Lookup.define(database_1.Database),
    LookupData: LookupData.define(database_1.Database),
    Notification: Notification.define(database_1.Database),
    UserLocationTrail: UserLocationTrail.define(database_1.Database)
};
// Execute the associations where defined
Object.keys(models).map(function (key) {
    var model = models[key];
    if (model.associate) {
        model.associate(models);
    }
});
exports.Models = models;
