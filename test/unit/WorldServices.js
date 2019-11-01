const chai    = require('chai');
const should  = chai.should();
const expect  = chai.expect;
const assert  = chai.assert;

// run all of the test on world services
// ensure that messages are dispatched properly
const WorldServices   = require('../../src/WorldServices');
const UserServices    = require('../../src/services/UserServices');
const Request         = require('../../src/Request');
let worldServices     = new WorldServices();

describe('WorldServices', function() {
  beforeEach(function(done) {
    worldServices = new WorldServices();
  });

  it('should dispatch messages to the correct service', function() {
    let request = new Request();
    worldServices.dispatchRequest('');
  });
});