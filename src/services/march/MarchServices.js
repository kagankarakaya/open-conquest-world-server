const log           = require('../../utils/log');
const logError      = require('../../utils/log').logError;
const BaseServices  = require('../BaseServices');
const models        = require('../../models');

class MarchServices extends BaseServices {
  constructor() {
    super();
    this.service = 'march';
    this.handlers = {
      'get': this.getMarch,
      'create': this.createMarch
    };
  }

  getMarch(request) {
    return new Promise( function(resolve, reject) {
      models.march.findAll()
        .then(marches => {
          resolve(marches);
        })
        .catch(err => {
          reject(err);
        })
      });
  }

  createMarch(request) {
    return new Promise( function(resolve, reject) {
      
      let marchData = request.data;

      models.march.create({
        army_id: marchData.army_id,
        start_tile_id: marchData.start_tile_id,
        end_tile_id: marchData.end_tile_id
      })
      .then(res => {
        let march = res.dataValues;
        resolve(march);
      })
      .catch(err => {
        reject(err);
      });

    });
  }
}

module.exports = MarchServices