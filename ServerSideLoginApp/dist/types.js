"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Result {
    constructor(success, data, error) {
        this.success = success;
        this.data = data;
        this.error = error;
    }
}
exports.Result = Result;
var ErrorCodes;
(function (ErrorCodes) {
    ErrorCodes["BadRequest"] = "400 Bad request";
    ErrorCodes["NotFound"] = "404 Not Found";
    ErrorCodes["IternalServerError"] = "500 Internal Server Error";
})(ErrorCodes = exports.ErrorCodes || (exports.ErrorCodes = {}));
//# sourceMappingURL=types.js.map