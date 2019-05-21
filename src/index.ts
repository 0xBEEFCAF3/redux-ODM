// interface SchemaInterface{
//     schema: object;
//     updateItem: (itemName:string): void;



// }


class Schema{
    schema : object;
    state  : object;

    constructor(schema : object){
        this.schema = schema;
    }

    updateItem = (itemName :string) =>{}

    updateState = (state : object) =>{}

    getState = () : object =>{
        return this.state;
    }
}

export default Schema;