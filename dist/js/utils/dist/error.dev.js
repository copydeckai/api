"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createError = void 0;

var createError = function createError(status, message) {
  var err = new Error();
  console.log("Error", err.message);
  err.status = status;
  err.message = message;
  return err;
};

exports.createError = createError;