"use strict";
exports.__esModule = true;
var Types;
(function (Types) {
    Types[Types["Function"] = 0] = "Function";
    Types[Types["String"] = 1] = "String";
    Types[Types["Number"] = 2] = "Number";
    Types[Types["Null"] = 3] = "Null";
    Types[Types["Date"] = 4] = "Date";
    Types[Types["Boolean"] = 5] = "Boolean";
    Types[Types["Array"] = 6] = "Array";
    Types[Types["Object"] = 7] = "Object";
    Types[Types["Symbol"] = 8] = "Symbol";
})(Types || (Types = {}));
var SchemaItem = /** @class */ (function () {
    function SchemaItem(type, of, kvps) {
        this.type = this.validateAndAssignType(type);
        if (this.type === Types.Object) {
            //Create a new Schema object
            if (!kvps)
                throw "Expecting kvps property to be set if type is 'Object' ";
            this.internalSchema = new Schema(kvps);
        }
        else if (this.type === Types.Array) {
            //Create a new Schemaitem 
            try {
                if (!of["type"])
                    throw "Expecting a schema item with the structure: {type:..., of:...}";
                this.of = new SchemaItem(of["type"], of["of"] || null, null); //Add another item to the chain   
            }
            catch (_a) {
                throw "Expecting a schema item with the structure: {type:..., of:...}";
            }
            this.internalSchema = null;
        }
        else {
            //Can
            this.of = null;
            this.internalSchema = null;
        }
    }
    SchemaItem.prototype.validateAndAssignType = function (type) {
        switch (type) {
            case String:
                return Types.String;
            case Number:
                return Types.Number;
            case Function:
                return Types.Function;
            case null:
                return Types.Function;
            case Date:
                return Types.Date;
            case Array:
                return Types.Array;
            case Object:
                return Types.Object;
            case Boolean:
                return Types.Boolean;
            case Symbol:
                return Types.Symbol;
            default:
                throw "Unrecognized type : " + type;
        }
    };
    return SchemaItem;
}());
var Schema = /** @class */ (function () {
    function Schema(schema) {
        var _this = this;
        this.validSchema = function (schema) {
            /**
             * @param: Schema Object
             */
            return true;
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
        /**
         * Examples of valid schemas
         * {
         *    "Name" : {type:String}
         *    "Addr" : {type:String}
         * }
         * {
         *    "Names" : {type:Array, of{type:Array, of:{type:String}}} => [[String]]
         *    "Addr" : {type:String}
         * }
         *
         */
        this.validSchema(schema);
        this.schema = schema;
    }
    Schema.prototype.inString = function (str, item) {
        return str.indexOf(item) >= 1;
    };
    return Schema;
}());
exports["default"] = Schema;
