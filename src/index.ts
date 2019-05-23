enum Types {
    Function,
    String,
    Number,
    Null,
    Date,
    Boolean,
    Array,
    Object,
    Symbol
}

class SchemaItem{
    type : Types; //Could be string or an actual type (String, Number, Symbol...)
    of : SchemaItem; //This field will be used for structures that encompass another type such as, Array or Object

    internalSchema : any;

    constructor(type : any, of ?: any, kvps ?: object){
        this.type = this.validateAndAssignType(type);

        if(this.type === Types.Object){
            //Create a new Schema object
            if(!kvps) throw "Expecting kvps property to be set if type is 'Object' ";
            this.internalSchema = new Schema(kvps);            

        }else if(this.type === Types.Array){
            //Create a new Schemaitem 
            try{
                if(!of["type"]) throw "Expecting a schema item with the structure: {type:..., of:...}"
                this.of = new SchemaItem(of["type"], of["of"] || null, null); //Add another item to the chain   
            }catch{
                throw "Expecting a schema item with the structure: {type:..., of:...}"
            }
            this.internalSchema = null;
        }else{
            //Can
            this.of = null;
            this.internalSchema = null;
        }
    }

    private validateAndAssignType ( type : any) : Types{
        switch(type){
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
    }

}

class Schema{
    private schema : {[k: string]: any}
    private state  : {[k: string]: any};

    constructor(schema : object){
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
         * {
         *    "Names" : undefined //Can enter any types 
         * }
         * 
         */
        this.schema = this.validateAndCreateSchema(schema);
        this.state  = this.createEmptyState(schema);
    }

    private inString(str:string, item: string){
        return str.indexOf(item) >= 1;
    }

    private validateAndCreateSchema = (schema : {[k: string]: any} = {} ) : object => {
        /**
         * @param: Schema Object
         * @return: Valid schema object with schemaitem nodes
         */

        let tempSchema : {[k: string]: any} = {}

         for (const key in schema) {
            if(schema[key] === undefined){
                tempSchema[key] = undefined;
            }
            else if (schema.hasOwnProperty(key)) {
                tempSchema[key] = new SchemaItem(schema[key]["type"], schema[key]["of"], schema[key]["kvps"]);
            }
        }

        return tempSchema;
    }

    private createEmptyState = (schema : {[k: string]: any} = {} ) : object =>{
        let tempState : {[k: string]: any} = {}

        for (const key in schema) {
            if (schema.hasOwnProperty(key)) {
                tempState[key] = undefined;                
            }
        }

        return tempState;
    }

    public updateItem = (itemName :string, data: any) : void=>{
        /**
         * @param: state and schema key
         * @param: data being added to state
         */

    }

    public updateState = (state : object) : void =>{}

    public getState = () : object =>{
        return this.state;
    }

    public getSchema = () : object =>{
        return this.schema;
    }
}






export default Schema;