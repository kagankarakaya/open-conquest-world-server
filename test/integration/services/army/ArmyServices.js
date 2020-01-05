const log     = require('../../../../src/utils/log');
const chai    = require('chai');
const should  = chai.should();
const expect  = chai.expect;
const assert  = chai.assert;

// run all of the test on map services
// ensure that messages are dispatched properly
const ArmyServices    = require('../../../../src/services/army/ArmyServices');
const Request         = require('../../../../src/Request');
let armyServices      = new ArmyServices();

describe('ArmyServices', function() {
  it('should get expected test armies', function() {
    let request = new Request('army', 'get', {});
    return armyServices.handle(request).then(res => {

      let army_data = res.data;
      assert(army_data.length > 0);
      // assertions for map data
      for (let i = 0; i < army_data.length; i++) {
        army_data[i].army_id.should.equal(i+1);
        army_data[i].user_id.should.equal(i+1);
      }

    }).catch(err => {
      log(err);
      throw err;
    });
  });
});