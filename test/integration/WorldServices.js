const log     = require('../../src/utils/log');
const chai    = require('chai');
const should  = chai.should();
const expect  = chai.expect;
const assert  = chai.assert;

// run all of the test on world services
// ensure that messages are dispatched properly
const WorldServices   = require('../../src/WorldServices');
const UserServices    = require('../../src/services/UserServices');
const MapServices     = require('../../src/services/MapServices');
const Request         = require('../../src/Request');
let userServices      = new UserServices();
let mapServices       = new MapServices();
let worldServices     = new WorldServices(userServices, mapServices);

describe('WorldServices', function() {
  it('should dispatch service requests to the correct service', function() {
    let userRequest = new Request('user', 'get', {});
    let mapRequest = new Request('map', 'get', {});

    return worldServices.dispatchRequest(userRequest)
    .then(userResponse => {
      log(userResponse);
      worldServices.dispatchRequest(mapRequest);
    })
    .then(mapResponse => {
      log(mapResponse);
    })
    .catch(err => {
      throw new Error(err);
    });
  });
});