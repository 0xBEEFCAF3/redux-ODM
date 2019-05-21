import Schema from '../build/index.js';
jest.mock('../build/index.js'); 

beforeEach(() => {
  // Clear all instances and calls to constructor and all methods:
  Schema.mockClear();
});

test('Schema will accept simple objects', () =>{
    const schema = new Schema();
    expect(Schema).toHaveBeenCalledTimes(1);
})