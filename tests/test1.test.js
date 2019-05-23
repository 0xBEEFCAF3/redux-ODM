import Schema from '../build/index.js';
jest.mock('../build/index.js'); 

beforeEach(() => {
  // Clear all instances and calls to constructor and all methods:
  Schema.mockClear();
});

test('Schema Constructor will be called', () =>{
    const schema = new Schema();
    expect(Schema).toHaveBeenCalledTimes(1);
})

test('Schema can accept basic schema', () => {
  const schema = new Schema({
        "Name" : {type:String},
        "Addr" : {type:String}
     });

  console.log(schema);
  expect(Schema).toHaveBeenCalledTimes(1);
});


// test('Schema will not accept error schema', () =>{
//   const schema = new Schema({
//         "Name" : {},
//         "Addr" : {type:String}
//      });
//   expect(Schema).toHaveBeenCalledTimes(1);
// })