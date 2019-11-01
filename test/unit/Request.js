let chai    = require('chai');
let should  = chai.should();
let expect  = chai.expect;
let assert  = chai.assert;

// run tests to ensure that requests are built properly
let Request       = require('../../src/request');

describe('Request', function() {
  it('should serialize to json as expected', function() {
    let service = 'user';
    let operation = 'get';
    let data = {
      'username': 'someone',
      'user_id': '123456'
    };
    
    let request = new Request(service, operation, data);

    let actualJSON = request.toJson();
    let expectedJSON = {
      'service': 'user',
      'operation': 'get',
      'data': {
        'username': 'someone',
        'user_id': '123456'
      }
    };

    expect(actualJSON).to.deep.equal(expectedJSON);

    // should.jsonEqual(expectedJSON);
  });
  it('should be able to be constructed from a WS message', function() {

    let message = {
      service: "map",
      operation: "get",
      data: {}
    };
    let messageString = JSON.stringify(message); 

    var request = Request.fromRequest(messageString);
  });
});