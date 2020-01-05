const log     = require('../../../../src/utils/log');
const chai    = require('chai');
const should  = chai.should();
const expect  = chai.expect;
const assert  = chai.assert;

// run all of the test on march services
// ensure that messages are dispatched properly
const MarchServices   = require('../../../../src/services/march/MarchServices');
const Request         = require('../../../../src/Request');
let marchServices     = new MarchServices();

describe('MarchServices', function() {
  it('should get expected test march', function() {
    let request = new Request('march', 'get', {});
    return marchServices.handle(request).then(res => {

      let march_data = res.data;
      assert(march_data.length > 0);

    }).catch(err => {
      throw err;
    });
  });

  it('should create a march for an existing army', function() {
    let request_data = {
      army_id: 5,
      start_tile_id: 1,
      end_tile_id: 100
    };
    let request = new Request('march', 'create', request_data);
    return marchServices.handle(request).then(res => {
      
      let service = res.service;
      let operation = res.operation;
      let data = res.data;

      let expectedData = {
        'army_id': 5,
        'start_tile_id': 1,
        'end_tile_id': 100
      };

      // expected service and result
      assert(service === 'march');
      assert(operation === 'create');
      assert(data.army_id.should.deep.equal(expectedData.army_id));
      assert(data.start_tile_id.should.deep.equal(expectedData.start_tile_id));
      assert(data.end_tile_id.should.deep.equal(expectedData.end_tile_id));
    })
    .catch(err => {
      throw err;
    })
  });

  it('should fail to create a march for a duplicate army', function() {
    let request_data = {
      army_id: 5,
      start_tile_id: 1,
      end_tile_id: 100
    };
    let request = new Request('march', 'create', request_data);
    return marchServices.handle(request).then(res => {
      assert.fail('Did not throw expected duplicate error');
    })
    .catch(err => {
      assert(err.name === 'SequelizeUniqueConstraintError');
    })
  });
});