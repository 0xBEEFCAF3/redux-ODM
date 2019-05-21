"use strict";
exports.__esModule = true;
var Schema = /** @class */ (function () {
    function Schema(schema) {
        var _this = this;
        this.validSchema = function (schema) {
            /**
             * @param: Schema Object
             */
            for (var property in schema) {
                if (schema.hasOwnProperty(property)) {
                    var currItem = schema[property];
                    var currType = typeof currItem;
                    if (currType === Object || currType == Array) {
                        return _this.validSchema(currItem);
                    }
                    else if (currType !== String ||
                        currType !== Number ||
                        currType !== Boolean ||
                        currType !== Function) {
                        throw "Invalid type included in schema";
                    }
                }
            }
            return false;
        };
        this.getSchemRepOfItem = function (item) {
            return {};
        };
        this.updateItem = function (itemName, data) {
            /**
             * @param: state and schema key
             * @param: data being added to state
             */
        };
        this.updateState = function (state) { };
        this.getState = function () {
            return _this.state;
        };
        this.getSchema = function () {
            return _this.schema;
        };
        this.schema = schema;
    }
    return Schema;
}());
exports["default"] = Schema;
