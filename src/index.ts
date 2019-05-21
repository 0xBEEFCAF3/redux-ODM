

class Schema{
    schema : object;
    state  : object;

    constructor(schema : object){
        this.schema = schema;
    }

    private validSchema = (schema: object) : boolean => {
        /**
         * @param: Schema Object
         */

        for (var property in schema) {
            if (schema.hasOwnProperty(property)) {
                let currItem : any = schema[property];
                let currType : any = typeof currItem;
                if(currType === Object || currType == Array){
                    return this.validSchema(currItem);
                }else if(currType !== String || 
                   currType !== Number ||
                   currType !== Boolean||
                   currType !== Function 
                   ){
                       throw "Invalid type included in schema";
                   }
            }
        }

        return true;
    }

    private getSchemRepOfItem = (item: any) : object =>{
        return{}
    }

    updateItem = (itemName :string, data: any) : void=>{
        /**
         * @param: state and schema key
         * @param: data being added to state
         */

    }

    updateState = (state : object) : void =>{}

    getState = () : object =>{
        return this.state;
    }

    getSchema = () : object =>{
        return this.schema;
    }
}






export default Schema;