"use strict";
exports.__esModule = true;
var _ = require('lodash');
exports.rejectUndefinedOrNull = function (id) { return _.isUndefined(id) || _.isNull(id) || _.isEmpty(id); };
